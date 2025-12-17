import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function HreflangChecker() {
  const [url, setUrl] = useState("");
  const [hreflangTags, setHreflangTags] = useState<Array<{lang: string; url: string}>>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const { toast } = useToast();

  const checkHreflang = async () => {
    try {
      const response = await fetch(url);
      const html = await response.text();
      
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      const links = doc.querySelectorAll('link[rel="alternate"]');
      const tags: Array<{lang: string; url: string}> = [];
      const validationErrors: string[] = [];
      
      links.forEach((link, index) => {
        const hreflang = link.getAttribute('hreflang');
        const href = link.getAttribute('href');
        
        if (hreflang && href) {
          tags.push({ lang: hreflang, url: href });
          
          if (!href.startsWith('http')) {
            validationErrors.push(`Tag ${index + 1}: URL should be absolute`);
          }
          
          if (hreflang.length > 5 && !hreflang.includes('-')) {
            validationErrors.push(`Tag ${index + 1}: Invalid language code format`);
          }
        }
      });
      
      if (tags.length === 0) {
        validationErrors.push("No hreflang tags found");
      }
      
      const xDefault = tags.find(t => t.lang === 'x-default');
      if (tags.length > 0 && !xDefault) {
        validationErrors.push("Missing x-default hreflang tag");
      }
      
      setHreflangTags(tags);
      setErrors(validationErrors);
      
      toast({
        title: "Analysis Complete",
        description: `Found ${tags.length} hreflang tag(s)`,
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
      title="Hreflang Checker"
      description="Check hreflang tags implementation"
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
            <Button onClick={checkHreflang}>Check</Button>
          </div>
        </div>

        {errors.length > 0 && (
          <Card className="p-4 bg-yellow-50 border-yellow-200">
            <div className="font-semibold mb-2">Issues Found</div>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </Card>
        )}

        {hreflangTags.length > 0 && (
          <div className="space-y-2">
            <Label>Hreflang Tags ({hreflangTags.length})</Label>
            <div className="space-y-2">
              {hreflangTags.map((tag, index) => (
                <Card key={index} className="p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold">{tag.lang}</div>
                      <div className="text-sm text-muted-foreground break-all">{tag.url}</div>
                    </div>
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
