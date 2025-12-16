import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function HeadingAnalyzer() {
  const [url, setUrl] = useState("");
  const [headings, setHeadings] = useState<Array<{level: string; text: string}>>([]);
  const [issues, setIssues] = useState<string[]>([]);
  const { toast } = useToast();

  const analyzeHeadings = async () => {
    try {
      const response = await fetch(url);
      const html = await response.text();
      
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      const headingTags: Array<{level: string; text: string}> = [];
      const validationIssues: string[] = [];
      
      ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].forEach(tag => {
        const elements = doc.querySelectorAll(tag);
        elements.forEach(el => {
          const text = el.textContent?.trim() || '';
          if (text) {
            headingTags.push({ level: tag.toUpperCase(), text });
          }
        });
      });
      
      const h1Count = headingTags.filter(h => h.level === 'H1').length;
      if (h1Count === 0) {
        validationIssues.push("Missing H1 tag");
      } else if (h1Count > 1) {
        validationIssues.push(`Multiple H1 tags found (${h1Count})`);
      }
      
      if (headingTags.length === 0) {
        validationIssues.push("No heading tags found");
      }
      
      let prevLevel = 0;
      headingTags.forEach((heading, index) => {
        const level = parseInt(heading.level.substring(1));
        if (index > 0 && level > prevLevel + 1) {
          validationIssues.push(`Heading hierarchy skip: ${headingTags[index - 1].level} to ${heading.level}`);
        }
        prevLevel = level;
      });
      
      setHeadings(headingTags);
      setIssues(validationIssues);
      
      toast({
        title: "Analysis Complete",
        description: `Found ${headingTags.length} heading(s)`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch URL. CORS restrictions may apply.",
        variant: "destructive",
      });
    }
  };

  return (
    <ToolLayout
      title="Heading Tags Analyzer"
      description="Analyze heading structure and hierarchy"
    >
      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="url">Website URL</Label>
          <div className="flex gap-2">
            <Input
              id="url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="flex-1"
            />
            <Button onClick={analyzeHeadings}>Analyze</Button>
          </div>
        </div>

        {issues.length > 0 && (
          <Card className="p-4 bg-yellow-50 border-yellow-200">
            <div className="font-semibold mb-2">SEO Issues</div>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {issues.map((issue, index) => (
                <li key={index}>{issue}</li>
              ))}
            </ul>
          </Card>
        )}

        {headings.length > 0 && (
          <div className="space-y-2">
            <Label>Heading Structure ({headings.length})</Label>
            <div className="space-y-1">
              {headings.map((heading, index) => (
                <Card key={index} className="p-3">
                  <div className="flex gap-3 items-start">
                    <span className="font-mono font-semibold text-primary min-w-[40px]">{heading.level}</span>
                    <span className="text-sm">{heading.text}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </Card>
    </ToolLayout>
  );
}
