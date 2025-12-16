import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { UsageGuide } from "@/components/UsageGuide";

export default function RemoveEmptyLines() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const removeLines = () => {
    const lines = input.split('\n').filter(line => line.trim() !== '');
    setOutput(lines.join('\n'));
  };

  return (
    <ToolLayout
      title="Remove Empty Lines"
      description="Remove all empty lines from text"
    >
      <UsageGuide
        steps={[
          "Paste text with empty lines",
          "Click \"Remove Empty Lines\"",
          "All blank lines are removed",
          "Copy the cleaned output"
        ]}
        tips={[
          "Perfect for cleaning up code or text files",
          "Removes lines with only whitespace",
          "Great for compacting log files",
          "Useful for data cleaning"
        ]}
      />
      <Card className="p-6 space-y-4 mt-6">
        <div className="space-y-2">
          <Label>Input Text</Label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={10}
            placeholder="Enter text with empty lines..."
          />
        </div>
        
        <Button onClick={removeLines} className="w-full">
          Remove Empty Lines
        </Button>
        
        {output && (
          <div className="space-y-2">
            <Label>Output</Label>
            <Textarea value={output} readOnly rows={10} />
          </div>
        )}
      </Card>
    </ToolLayout>
  );
}
