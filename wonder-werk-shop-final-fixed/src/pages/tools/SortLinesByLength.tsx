import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { UsageGuide } from "@/components/UsageGuide";
import { ExportResults } from "@/components/ExportResults";

export default function SortLinesByLength() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const sortAscending = () => {
    const lines = input.split('\n');
    const sorted = lines.sort((a, b) => a.length - b.length);
    setOutput(sorted.join('\n'));
  };

  const sortDescending = () => {
    const lines = input.split('\n');
    const sorted = lines.sort((a, b) => b.length - a.length);
    setOutput(sorted.join('\n'));
  };

  return (
    <ToolLayout
      title="Sort Lines by Length"
      description="Sort text lines by their length"
    >
      <UsageGuide
        steps={[
          "Paste your text with multiple lines",
          "Choose 'Shortest First' or 'Longest First'",
          "Lines are sorted by character count",
          "Copy the sorted output"
        ]}
        tips={[
          "Great for organizing content by size",
          "Useful for finding longest/shortest entries",
          "Character count includes spaces",
          "Perfect for data analysis"
        ]}
      />
      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <Label>Input Text</Label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={10}
            placeholder="Enter text lines..."
          />
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <Button onClick={sortAscending}>Shortest First</Button>
          <Button onClick={sortDescending}>Longest First</Button>
        </div>
        
        {output && (
          <div className="space-y-2">
            <Label>Output</Label>
            <Textarea value={output} readOnly rows={10} />
            <ExportResults data={output} filename="sorted-lines" />
          </div>
        )}
      </Card>
    </ToolLayout>
  );
}
