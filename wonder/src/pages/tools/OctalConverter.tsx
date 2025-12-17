import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function OctalConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const textToOctal = () => {
    const octal = Array.from(input)
      .map(char => char.charCodeAt(0).toString(8).padStart(3, '0'))
      .join(' ');
    setOutput(octal);
  };

  const octalToText = () => {
    try {
      const octal = input.replace(/\s/g, '');
      const text = octal.match(/.{1,3}/g)
        ?.map(oct => String.fromCharCode(parseInt(oct, 8)))
        .join('') || '';
      setOutput(text);
    } catch {
      setOutput('Invalid octal input');
    }
  };

  return (
    <ToolLayout
      title="Octal Converter"
      description="Convert between text and octal"
    >
      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <Label>Input</Label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={6}
            placeholder="Enter text or octal..."
            className="font-mono"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <Button onClick={textToOctal}>Text to Octal</Button>
          <Button onClick={octalToText}>Octal to Text</Button>
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
