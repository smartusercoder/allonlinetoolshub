import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UsageGuide } from "@/components/UsageGuide";

export default function WhitespaceRemover() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const removeExtraSpaces = () => {
    const cleaned = input.replace(/\s+/g, ' ').trim();
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
      title="Remove Extra Spaces"
      description="Remove extra whitespace from text"
    >
      <UsageGuide
        steps={[
          "Paste text with extra spaces",
          "Click \"Remove Extra Spaces\"",
          "Multiple spaces become single spaces",
          "Leading and trailing spaces are trimmed"
        ]}
        tips={[
          "Perfect for cleaning messy text",
          "Removes tabs, newlines, and extra spaces",
          "Great for data preparation",
          "Useful for fixing copy-paste errors"
        ]}
      />
      <Card className="p-6 mt-6">
        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium">Input Text</label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text with extra spaces..."
              rows={8}
            />
          </div>

          <Button onClick={removeExtraSpaces} className="w-full">
            Remove Extra Spaces
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
