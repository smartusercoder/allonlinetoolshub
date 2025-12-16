import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UsageGuide } from "@/components/UsageGuide";

const RemoveLineBreaks = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const removeBreaks = () => {
    const cleaned = input.replace(/\n/g, " ").replace(/\s+/g, " ").trim();
    setOutput(cleaned);
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
      title="Remove Line Breaks"
      description="Remove all line breaks and extra spaces from text"
    >
      <UsageGuide
        steps={[
          "Paste text with line breaks",
          "Click \"Remove Line Breaks\"",
          "All line breaks become single spaces",
          "Extra spaces are collapsed"
        ]}
        tips={[
          "Perfect for cleaning copied text",
          "Great for creating single-line strings",
          "Removes newlines and carriage returns",
          "Collapses multiple spaces into one"
        ]}
      />
      <div className="space-y-6 mt-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Input Text</label>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter text with line breaks..."
                rows={8}
                className="w-full"
              />
            </div>

            <Button onClick={removeBreaks} className="w-full">
              Remove Line Breaks
            </Button>

            {output && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">Output</label>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <Textarea
                  value={output}
                  readOnly
                  rows={8}
                  className="w-full bg-muted"
                />
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6 bg-muted/50">
          <h3 className="font-semibold mb-3">What it does</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>Removes all line breaks</li>
            <li>Replaces multiple spaces with single space</li>
            <li>Trims leading and trailing whitespace</li>
          </ul>
        </Card>
      </div>
    </ToolLayout>
  );
};

export default RemoveLineBreaks;