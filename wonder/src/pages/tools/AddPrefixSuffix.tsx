import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UsageGuide } from "@/components/UsageGuide";

export default function AddPrefixSuffix() {
  const [input, setInput] = useState("");
  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState("");
  const [output, setOutput] = useState("");

  const apply = () => {
    const lines = input.split('\n').map(line => {
      if (line.trim() === '') return line;
      return prefix + line + suffix;
    });
    setOutput(lines.join('\n'));
  };

  return (
    <ToolLayout
      title="Add Prefix/Suffix to Lines"
      description="Add prefix and suffix to each line"
    >
      <UsageGuide
        steps={[
          "Enter the prefix to add at the start of each line",
          "Enter the suffix to add at the end of each line",
          "Paste your text in the input area",
          "Click 'Apply Prefix/Suffix' to transform"
        ]}
        tips={[
          "Empty lines are preserved as-is",
          "Use for formatting lists or code",
          "Great for adding quotes or brackets",
          "Combine both prefix and suffix for wrapping"
        ]}
        example='Prefix: "- " → "- item1", "- item2"'
      />
      <Card className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="prefix">Prefix</Label>
            <Input
              id="prefix"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              placeholder="e.g., - "
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="suffix">Suffix</Label>
            <Input
              id="suffix"
              value={suffix}
              onChange={(e) => setSuffix(e.target.value)}
              placeholder="e.g., ;"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Input Text</Label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={8}
            placeholder="Enter text..."
          />
        </div>
        
        <Button onClick={apply} className="w-full">
          Apply Prefix/Suffix
        </Button>
        
        {output && (
          <div className="space-y-2">
            <Label>Output</Label>
            <Textarea value={output} readOnly rows={8} />
          </div>
        )}
      </Card>
    </ToolLayout>
  );
}
