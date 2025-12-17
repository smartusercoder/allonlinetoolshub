import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function TextCensor() {
  const [text, setText] = useState("");
  const [words, setWords] = useState("bad,inappropriate");
  const [output, setOutput] = useState("");

  const censor = () => {
    let result = text;
    const wordsToCensor = words.split(',').map(w => w.trim());
    wordsToCensor.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      result = result.replace(regex, '*'.repeat(word.length));
    });
    setOutput(result);
  };

  return (
    <ToolLayout title="Text Censor" description="Censor specific words in text">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Words to Censor (comma-separated)</Label>
          <Input value={words} onChange={(e) => setWords(e.target.value)} placeholder="word1,word2,word3" />
        </div>
        <Textarea value={text} onChange={(e) => setText(e.target.value)} rows={8} placeholder="Enter text..." />
        <Button onClick={censor} className="w-full">Censor Text</Button>
        {output && <Textarea value={output} readOnly rows={8} />}
      </div>
    </ToolLayout>
  );
}
