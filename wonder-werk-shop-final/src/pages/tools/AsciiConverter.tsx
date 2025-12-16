import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function AsciiConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const textToAscii = () => {
    const ascii = Array.from(input)
      .map(char => char.charCodeAt(0))
      .join(' ');
    setOutput(ascii);
  };

  const asciiToText = () => {
    try {
      const codes = input.split(/\s+/).filter(c => c.trim());
      const text = codes.map(code => String.fromCharCode(parseInt(code))).join('');
      setOutput(text);
    } catch {
      setOutput('Invalid ASCII input');
    }
  };

  return (
    <ToolLayout
      title="ASCII Converter"
      description="Convert between text and ASCII codes"
    >
      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <Label>Input</Label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={6}
            placeholder="Enter text or ASCII codes..."
            className="font-mono"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <Button onClick={textToAscii}>Text to ASCII</Button>
          <Button onClick={asciiToText}>ASCII to Text</Button>
        </div>
        
        {output && (
          <div className="space-y-2">
            <Label>Output</Label>
            <Textarea value={output} readOnly rows={6} className="font-mono" />
          </div>
        )}
      </Card>
    </ToolLayout>
  );
}
