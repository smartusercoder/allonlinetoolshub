import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { UsageGuide } from "@/components/UsageGuide";
import { ExportResults } from "@/components/ExportResults";

export default function TextWrapper() {
  const [text, setText] = useState("");
  const [width, setWidth] = useState("50");
  const [output, setOutput] = useState("");

  const wrap = () => {
    const w = parseInt(width);
    const words = text.split(' ');
    const lines: string[] = [];
    let line = "";

    words.forEach(word => {
      if ((line + word).length <= w) {
        line += (line ? " " : "") + word;
      } else {
        if (line) lines.push(line);
        line = word;
      }
    });
    if (line) lines.push(line);

    setOutput(lines.join('\n'));
  };

  return (
    <ToolLayout title="Text Wrapper" description="Wrap text at specified width">
      <UsageGuide
        steps={[
          "Enter your long text",
          "Set the character width limit",
          "Click 'Wrap Text'",
          "Text breaks at word boundaries"
        ]}
        tips={[
          "Wraps at spaces, not mid-word",
          "Great for email formatting",
          "Perfect for fixed-width displays",
          "Common widths: 50, 80, 100 characters"
        ]}
      />
      <div className="space-y-4">
        <Textarea value={text} onChange={e => setText(e.target.value)} rows={6} placeholder="Enter text..." />
        <input type="number" value={width} onChange={e => setWidth(e.target.value)} className="w-full p-2 border rounded" placeholder="Width" />
        <Button onClick={wrap} className="w-full">Wrap Text</Button>
        {output && (
          <>
            <Textarea value={output} readOnly rows={8} />
            <ExportResults data={output} filename="wrapped-text" />
          </>
        )}
      </div>
    </ToolLayout>
  );
}
