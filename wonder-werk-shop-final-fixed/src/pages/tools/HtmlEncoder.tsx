import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UsageGuide } from "@/components/UsageGuide";

const HtmlEncoder = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const htmlEntities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;'
  };

  const encode = () => {
    const encoded = input.replace(/[&<>"'\/]/g, (char) => htmlEntities[char]);
    setOutput(encoded);
  };

  const decode = () => {
    const decoded = input
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&#x2F;/g, '/');
    setOutput(decoded);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    toast({
      title: "Copied!",
      description: "Output copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="HTML Entity Encoder/Decoder"
      description="Encode and decode HTML special characters"
    >
      <UsageGuide
        steps={[
          "Enter HTML or text in the input area",
          "Click \"Encode\" to convert special characters to entities",
          "Click \"Decode\" to convert entities back to characters",
          "Copy the output using the copy button"
        ]}
        tips={[
          "Encoding prevents HTML injection attacks",
          "Useful for displaying code snippets on web pages",
          "Decode to make entities human-readable",
          "Common in forms and user-generated content"
        ]}
        example="< → &lt; and > → &gt;"
      />
      <div className="space-y-6 mt-6">
        <div className="space-y-2">
          <Label>Input</Label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter HTML or text..."
            rows={8}
          />
        </div>

        <div className="flex gap-3">
          <Button onClick={encode} className="flex-1">
            Encode HTML Entities
          </Button>
          <Button onClick={decode} variant="secondary" className="flex-1">
            Decode HTML Entities
          </Button>
        </div>

        {output && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Output</Label>
              <Button onClick={copyToClipboard} variant="ghost" size="sm">
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
            <Textarea
              value={output}
              readOnly
              rows={8}
              className="font-mono text-sm bg-muted"
            />
          </div>
        )}

        <div className="text-sm text-muted-foreground p-4 bg-muted/30 rounded-lg space-y-1">
          <p><strong>Common HTML Entities:</strong></p>
          <div className="font-mono space-y-1">
            <div>&amp; → &amp;amp;</div>
            <div>&lt; → &amp;lt;</div>
            <div>&gt; → &amp;gt;</div>
            <div>" → &amp;quot;</div>
            <div>' → &amp;#39;</div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default HtmlEncoder;