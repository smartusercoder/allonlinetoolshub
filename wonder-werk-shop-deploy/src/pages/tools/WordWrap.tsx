import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { UsageGuide } from "@/components/UsageGuide";

export default function WordWrap() {
  const [input, setInput] = useState("");
  const [width, setWidth] = useState("80");
  const [output, setOutput] = useState("");

  const wrapText = () => {
    const w = parseInt(width);
    const words = input.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    words.forEach(word => {
      if ((currentLine + word).length > w) {
        if (currentLine) lines.push(currentLine.trim());
        currentLine = word + ' ';
      } else {
        currentLine += word + ' ';
      }
    });

    if (currentLine) lines.push(currentLine.trim());
    setOutput(lines.join('\n'));
  };

  return (
    <ToolLayout
      title="Word Wrap"
      description="Wrap text to a specified width"
    >
      <UsageGuide
        steps={[
          "Set the maximum characters per line (10-200)",
          "Paste or type long text",
          "Click 'Wrap Text' to break into lines",
          "Text wraps at word boundaries"
        ]}
        tips={[
          "Default is 80 characters (standard terminal width)",
          "Breaks at spaces, not mid-word",
          "Great for email formatting",
          "Useful for code comments or documentation"
        ]}
        example="80 characters is a common width"
      />
      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="width">Characters per Line</Label>
          <input
            id="width"
            type="number"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            className="w-full p-2 border rounded"
            min="10"
            max="200"
          />
        </div>

        <div className="space-y-2">
          <Label>Input Text</Label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={8}
            placeholder="Enter long text to wrap..."
            className="font-mono"
          />
        </div>
        
        <Button onClick={wrapText} className="w-full">
          Wrap Text
        </Button>
        
        {output && (
          <div className="space-y-2">
            <Label>Output</Label>
            <Textarea value={output} readOnly rows={10} className="font-mono" />
          </div>
        )}
      </Card>
    </ToolLayout>
  );
}
