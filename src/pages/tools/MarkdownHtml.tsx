import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UsageGuide } from "@/components/UsageGuide";
import { sanitizeHtml } from "@/utils/security";

const MarkdownHtml = () => {
  const [markdown, setMarkdown] = useState("");
  const [html, setHtml] = useState("");
  const { toast } = useToast();

  const convertToHtml = () => {
    let result = markdown;

    // Headers
    result = result.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    result = result.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    result = result.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Bold
    result = result.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    result = result.replace(/__(.+?)__/g, '<strong>$1</strong>');

    // Italic
    result = result.replace(/\*(.+?)\*/g, '<em>$1</em>');
    result = result.replace(/_(.+?)_/g, '<em>$1</em>');

    // Links
    result = result.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    // Code
    result = result.replace(/`(.+?)`/g, '<code>$1</code>');

    // Lists
    result = result.replace(/^\* (.+)$/gim, '<li>$1</li>');
    result = result.replace(/^- (.+)$/gim, '<li>$1</li>');
    result = result.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

    // Line breaks
    result = result.replace(/\n\n/g, '</p><p>');
    result = '<p>' + result + '</p>';

    setHtml(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(html);
    toast({
      title: "Copied!",
      description: "HTML copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="Markdown to HTML"
      description="Convert Markdown syntax to HTML"
    >
      <UsageGuide
        steps={[
          "Enter Markdown syntax in the input area",
          "Click \"Convert to HTML\" to generate HTML code",
          "View the HTML output and live preview",
          "Copy the HTML for use in your projects"
        ]}
        tips={[
          "Use # for headings, ** for bold, * for italic",
          "Perfect for converting README files to HTML",
          "Great for blog posts and documentation",
          "Preview shows how it will look on a webpage"
        ]}
        example="**bold** → <strong>bold</strong>"
      />
      <div className="space-y-6 mt-6">
        <div className="space-y-2">
          <Label>Markdown Input</Label>
          <Textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="# Heading 1&#10;## Heading 2&#10;**Bold text**&#10;*Italic text*&#10;[Link](https://example.com)&#10;`code`"
            rows={12}
            className="font-mono text-sm"
          />
        </div>

        <Button onClick={convertToHtml} className="w-full">
          Convert to HTML
        </Button>

        {html && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>HTML Output</Label>
              <Button onClick={copyToClipboard} variant="ghost" size="sm">
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
            <Textarea
              value={html}
              readOnly
              rows={12}
              className="font-mono text-sm bg-muted"
            />
          </div>
        )}

        {html && (
          <div className="space-y-2">
            <Label>Preview</Label>
            <div
              className="p-4 border rounded-lg bg-card prose prose-sm max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(html) }}
            />
          </div>
        )}

        <div className="text-sm text-muted-foreground space-y-1">
          <p><strong>Supported syntax:</strong></p>
          <ul className="list-disc list-inside space-y-1">
            <li># H1, ## H2, ### H3</li>
            <li>**bold** or __bold__</li>
            <li>*italic* or _italic_</li>
            <li>[link](url)</li>
            <li>`code`</li>
            <li>* or - for lists</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
};

export default MarkdownHtml;