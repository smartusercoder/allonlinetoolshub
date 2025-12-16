import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import DOMPurify from "dompurify";

export default function HtmlPreview() {
  const [html, setHtml] = useState("<h1>Hello World!</h1>\n<p>Start typing your HTML code here...</p>");

  return (
    <ToolLayout
      title="HTML Live Preview"
      description="Preview your HTML code in real-time"
    >
      <div className="space-y-4">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            Type or paste HTML code to see it rendered live. Perfect for testing HTML snippets quickly.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>HTML Code</Label>
            <Textarea
              value={html}
              onChange={(e) => setHtml(e.target.value)}
              rows={20}
              placeholder="Enter HTML code..."
              className="font-mono text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label>Live Preview</Label>
            <Card className="p-4 min-h-[500px]">
              <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />
            </Card>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
