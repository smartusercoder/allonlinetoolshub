import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UsageGuide } from "@/components/UsageGuide";

export default function RemoveLineNumbers() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const removeLineNumbers = () => {
    const lines = input.split('\n');
    const cleaned = lines.map(line => line.replace(/^\d+\.\s*/, '')).join('\n');
    setOutput(cleaned);
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    toast({
      title: "Copied!",
      description: "Output copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="Remove Line Numbers"
      description="Remove line numbers from text"
    >
      <UsageGuide
        steps={[
          "Paste text with line numbers (format: 1. Text)",
          "Click 'Remove Line Numbers'",
          "Get clean text without numbering",
          "Use the Copy button to copy the result"
        ]}
        tips={[
          "Removes numbers in format: 1., 2., 3., etc.",
          "Preserves the original text content",
          "Works with any starting number",
          "Great for cleaning up copied content"
        ]}
        example="1. Hello → Hello"
      />
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium">Input Text</label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text with line numbers..."
              rows={8}
            />
          </div>

          <Button onClick={removeLineNumbers} className="w-full">
            Remove Line Numbers
          </Button>

          {output && (
            <div className="space-y-2">
              <label className="block text-sm font-medium">Output</label>
              <Textarea
                value={output}
                readOnly
                rows={8}
                className="bg-muted"
              />
              <Button onClick={copyOutput} variant="outline" className="w-full">
                <Copy className="w-4 h-4 mr-2" />
                Copy Output
              </Button>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
}
