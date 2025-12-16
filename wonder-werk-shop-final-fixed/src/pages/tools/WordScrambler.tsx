import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function WordScrambler() {
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");

  const scramble = () => {
    const words = text.split(/\s+/);
    const scrambled = words.map(word => {
      const chars = word.split('');
      for (let i = chars.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [chars[i], chars[j]] = [chars[j], chars[i]];
      }
      return chars.join('');
    });
    setOutput(scrambled.join(' '));
  };

  return (
    <ToolLayout title="Word Scrambler" description="Scramble letters in each word">
      <div className="space-y-4">
        <Textarea value={text} onChange={(e) => setText(e.target.value)} rows={8} placeholder="Enter text..." />
        <Button onClick={scramble} className="w-full">Scramble Words</Button>
        {output && <Textarea value={output} readOnly rows={8} />}
      </div>
    </ToolLayout>
  );
}
