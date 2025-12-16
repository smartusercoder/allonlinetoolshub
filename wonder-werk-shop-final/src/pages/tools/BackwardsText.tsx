import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UsageGuide } from "@/components/UsageGuide";

const BackwardsText = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const reverseText = () => {
    const reversed = input.split("").reverse().join("");
    setOutput(reversed);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    toast({
      title: "Copied!",
      description: "Text copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="Backwards Text Generator"
      description="Reverse your text backwards character by character"
    >
      <UsageGuide
        steps={[
          "Enter or paste your text",
          "Click 'Reverse Text'",
          "Get reversed text character by character",
          "Copy the result using the Copy button"
        ]}
        tips={[
          "Reverses every character, not just words",
          '"Hello World" becomes "dlroW olleH"',
          "Great for fun text effects",
          "Works with any language or symbols"
        ]}
        example='"Hello" → "olleH"'
      />
      <div className="space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Input Text</label>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter text to reverse..."
                rows={6}
                className="w-full"
              />
            </div>

            <Button onClick={reverseText} className="w-full">
              Reverse Text
            </Button>

            {output && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">Reversed Text</label>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <Textarea
                  value={output}
                  readOnly
                  rows={6}
                  className="w-full bg-muted"
                />
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6 bg-muted/50">
          <h3 className="font-semibold mb-3">How to Use</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
            <li>Enter or paste your text in the input box</li>
            <li>Click "Reverse Text" to generate backwards text</li>
            <li>Copy the reversed text using the Copy button</li>
          </ol>
        </Card>
      </div>
    </ToolLayout>
  );
};

export default BackwardsText;