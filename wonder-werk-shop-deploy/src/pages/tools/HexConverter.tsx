import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function HexConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const textToHex = () => {
    const hex = Array.from(input)
      .map(char => char.charCodeAt(0).toString(16).padStart(2, '0'))
      .join(' ');
    setOutput(hex);
  };

  const hexToText = () => {
    try {
      const hex = input.replace(/\s/g, '');
      const text = hex.match(/.{1,2}/g)
        ?.map(byte => String.fromCharCode(parseInt(byte, 16)))
        .join('') || '';
      setOutput(text);
    } catch {
      setOutput('Invalid hex input');
    }
  };

  return (
    <ToolLayout
      title="Text to Hex Converter"
      description="Convert between text and hexadecimal"
    >
      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <Label>Input</Label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={6}
            placeholder="Enter text or hex..."
            className="font-mono"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <Button onClick={textToHex}>Text to Hex</Button>
          <Button onClick={hexToText}>Hex to Text</Button>
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
