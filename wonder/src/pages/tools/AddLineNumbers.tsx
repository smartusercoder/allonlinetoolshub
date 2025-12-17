import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UsageGuide } from "@/components/UsageGuide";

export default function AddLineNumbers() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [startFrom, setStartFrom] = useState(1);
  const { toast } = useToast();

  const addLineNumbers = () => {
    const lines = input.split('\n');
    const numbered = lines.map((line, index) => `${index + startFrom}. ${line}`).join('\n');
    setOutput(numbered);
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
      title="Add Line Numbers"
      description="Add line numbers to text"
    >
      <UsageGuide
        steps={[
          "Enter or paste your text in the input area",
          "Set the starting number (default is 1)",
          "Click 'Add Line Numbers' to prefix each line",
          "Copy the numbered output using the Copy button"
        ]}
        tips={[
          "Great for code snippets or documentation",
          "Start from any number, not just 1",
          "Original text remains unchanged",
          "Useful for referencing specific lines"
        ]}
        example="Line 1: Hello\nLine 2: World"
      />
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium">Start From</label>
            <Input
              type="number"
              value={startFrom}
              onChange={(e) => setStartFrom(parseInt(e.target.value) || 1)}
              min="0"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Input Text</label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text..."
              rows={8}
            />
          </div>

          <Button onClick={addLineNumbers} className="w-full">
            Add Line Numbers
          </Button>

          {output && (
            <div className="space-y-2">
              <label className="block text-sm font-medium">Output</label>
              <Textarea
                value={output}
                readOnly
                rows={8}
                className="bg-muted font-mono text-sm"
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
