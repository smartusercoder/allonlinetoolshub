import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { UsageGuide } from "@/components/UsageGuide";
import { sanitizeHtml } from "@/utils/security";

export default function MarkdownPreview() {
  const [markdown, setMarkdown] = useState("# Hello\n\nThis is **bold** and *italic*");

  const convert = (md: string) => {
    return md
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      .replace(/\n/gim, '<br>');
  };

  return (
    <ToolLayout title="Markdown Preview" description="Preview markdown in real-time">
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Type or paste Markdown syntax in the left editor",
            "See the rendered output instantly in the right preview",
            "Use # for headings, **bold**, *italic*, etc.",
            "Perfect for previewing README files or documentation"
          ]}
          tips={[
            "# creates H1, ## creates H2, ### creates H3",
            "**text** makes text bold, *text* makes it italic",
            "Great for testing Markdown before publishing",
            "Live preview updates as you type"
          ]}
          example="# Heading → renders as <h1>Heading</h1>"
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-6">
        <Textarea value={markdown} onChange={e => setMarkdown(e.target.value)} rows={20} />
        <div className="border rounded p-4 prose" dangerouslySetInnerHTML={{ __html: sanitizeHtml(convert(markdown)) }} />
      </div>
    </ToolLayout>
  );
}
