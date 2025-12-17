import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function LineBreakConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const toWindows = () => {
    const converted = input.replace(/\r?\n/g, '\r\n');
    setOutput(converted);
  };

  const toUnix = () => {
    const converted = input.replace(/\r\n/g, '\n');
    setOutput(converted);
  };

  const toMac = () => {
    const converted = input.replace(/\r?\n/g, '\r');
    setOutput(converted);
  };

  return (
    <ToolLayout
      title="Line Break Converter"
      description="Convert between different line break formats"
    >
      <Card className="p-6 space-y-4">
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
        
        <div className="grid grid-cols-3 gap-2">
          <Button onClick={toWindows}>Windows (CRLF)</Button>
          <Button onClick={toUnix}>Unix (LF)</Button>
          <Button onClick={toMac}>Mac (CR)</Button>
        </div>
        
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
