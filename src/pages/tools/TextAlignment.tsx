import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { UsageGuide } from "@/components/UsageGuide";

export default function TextAlignment() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [alignment, setAlignment] = useState<"left" | "right" | "center">("left");

  const alignText = () => {
    const lines = input.split('\n');
    const maxLength = Math.max(...lines.map(l => l.length));
    
    const aligned = lines.map(line => {
      if (alignment === "left") {
        return line;
      } else if (alignment === "right") {
        return line.padStart(maxLength, ' ');
      } else {
        const spaces = Math.floor((maxLength - line.length) / 2);
        return ' '.repeat(spaces) + line;
      }
    });
    
    setOutput(aligned.join('\n'));
  };

  return (
    <ToolLayout
      title="Text Alignment"
      description="Align text left, center, or right"
    >
      <UsageGuide
        steps={[
          "Choose alignment: Left, Center, or Right",
          "Enter your multi-line text",
          "Click 'Align Text' to apply",
          "View aligned result with proper spacing"
        ]}
        tips={[
          "Uses spaces for alignment (monospace fonts work best)",
          "Center alignment adds leading spaces",
          "Right alignment pads to longest line",
          "Great for ASCII art or text formatting"
        ]}
      />
      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <Label>Alignment</Label>
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant={alignment === "left" ? "default" : "outline"}
              onClick={() => setAlignment("left")}
            >
              Left
            </Button>
            <Button
              variant={alignment === "center" ? "default" : "outline"}
              onClick={() => setAlignment("center")}
            >
              Center
            </Button>
            <Button
              variant={alignment === "right" ? "default" : "outline"}
              onClick={() => setAlignment("right")}
            >
              Right
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Input Text</Label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={8}
            placeholder="Enter text..."
            className="font-mono"
          />
        </div>
        
        <Button onClick={alignText} className="w-full">
          Align Text
        </Button>
        
        {output && (
          <div className="space-y-2">
            <Label>Output</Label>
            <Textarea value={output} readOnly rows={8} className="font-mono" />
          </div>
        )}
      </Card>
    </ToolLayout>
  );
}
