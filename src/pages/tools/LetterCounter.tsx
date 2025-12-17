import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

export default function LetterCounter() {
  const [text, setText] = useState("");
  
  const letterCount = text.replace(/[^a-zA-Z]/g, '').length;
  const vowels = text.match(/[aeiouAEIOU]/g)?.length || 0;
  const consonants = letterCount - vowels;

  return (
    <ToolLayout title="Letter Counter" description="Count letters, vowels, and consonants in text">
      <div className="space-y-4">
        <Textarea value={text} onChange={(e) => setText(e.target.value)} rows={10} placeholder="Enter text..." />
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{letterCount}</div>
            <div className="text-sm text-muted-foreground">Total Letters</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{vowels}</div>
            <div className="text-sm text-muted-foreground">Vowels</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{consonants}</div>
            <div className="text-sm text-muted-foreground">Consonants</div>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
