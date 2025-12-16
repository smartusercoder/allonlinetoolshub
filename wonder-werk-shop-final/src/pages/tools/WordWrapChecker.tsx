import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export default function WordWrapChecker() {
  const [text, setText] = useState("");
  const [width, setWidth] = useState("50");

  const wrapped = text.split('\n').map(line => {
    const words = line.split(' ');
    const lines: string[] = [];
    let currentLine = '';
    
    words.forEach(word => {
      if ((currentLine + word).length <= parseInt(width)) {
        currentLine += (currentLine ? ' ' : '') + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    });
    if (currentLine) lines.push(currentLine);
    return lines.join('\n');
  }).join('\n\n');

  return (
    <ToolLayout title="Word Wrap Checker" description="Check how text wraps at different widths">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Character Width</Label>
          <Input type="number" value={width} onChange={(e) => setWidth(e.target.value)} />
        </div>
        <Textarea value={text} onChange={(e) => setText(e.target.value)} rows={8} placeholder="Enter text..." />
        <Card className="p-4 font-mono text-sm whitespace-pre-wrap">{wrapped}</Card>
      </div>
    </ToolLayout>
  );
}
