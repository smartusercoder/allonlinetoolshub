import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function HtmlEntityEncoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const encode = () => {
    const encoded = input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
    setOutput(encoded);
  };

  const decode = () => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = input;
    setOutput(textarea.value);
  };

  return (
    <ToolLayout
      title="HTML Entity Encoder"
      description="Encode and decode HTML entities"
    >
      <Card className="p-6 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="input">Input</Label>
          <Textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={8}
            placeholder="Enter HTML or text..."
            className="font-mono"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button onClick={encode}>Encode</Button>
          <Button onClick={decode} variant="outline">Decode</Button>
        </div>

        {output && (
          <div className="space-y-2">
            <Label htmlFor="output">Output</Label>
            <Textarea
              id="output"
              value={output}
              readOnly
              rows={8}
              className="font-mono"
            />
          </div>
        )}
      </Card>
    </ToolLayout>
  );
}