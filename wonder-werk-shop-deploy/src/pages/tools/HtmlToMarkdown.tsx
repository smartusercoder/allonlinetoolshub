import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function HtmlToMarkdown() {
  const [html, setHtml] = useState("");
  const [markdown, setMarkdown] = useState("");
  const { toast } = useToast();

  const convertToMarkdown = () => {
    try {
      let md = html
        // Headers
        .replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n')
        .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n')
        .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n')
        // Bold and italic
        .replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**')
        .replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**')
        .replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*')
        .replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*')
        // Links
        .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)')
        // Images
        .replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*>/gi, '![$2]($1)')
        // Code
        .replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`')
        // Lists
        .replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n')
        // Paragraphs
        .replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n')
        // Line breaks
        .replace(/<br\s*\/?>/gi, '\n')
        // Remove remaining tags
        .replace(/<[^>]+>/g, '')
        // Clean up
        .trim();

      setMarkdown(md);
      toast({
        title: "Success",
        description: "HTML converted to Markdown",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to convert HTML",
        variant: "destructive",
      });
    }
  };

  const copyMarkdown = () => {
    navigator.clipboard.writeText(markdown);
    toast({
      title: "Copied!",
      description: "Markdown copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="HTML to Markdown"
      description="Convert HTML to Markdown format"
    >
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium">HTML Input</label>
            <Textarea
              value={html}
              onChange={(e) => setHtml(e.target.value)}
              placeholder="Paste HTML here..."
              rows={10}
              className="font-mono text-sm"
            />
          </div>

          <Button onClick={convertToMarkdown} className="w-full">
            Convert to Markdown
          </Button>

          {markdown && (
            <div className="space-y-2">
              <label className="block text-sm font-medium">Markdown Output</label>
              <Textarea
                value={markdown}
                readOnly
                rows={10}
                className="bg-muted font-mono text-sm"
              />
              <Button onClick={copyMarkdown} variant="outline" className="w-full">
                <Copy className="w-4 h-4 mr-2" />
                Copy Markdown
              </Button>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
}
