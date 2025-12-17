import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export default function TextCompare() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");

  const similarity = text1 === text2 ? 100 : 
    Math.round((1 - (Math.abs(text1.length - text2.length) / Math.max(text1.length, text2.length))) * 100);

  return (
    <ToolLayout title="Text Compare" description="Compare two texts and check similarity">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Text 1</Label>
            <Textarea value={text1} onChange={(e) => setText1(e.target.value)} rows={10} />
          </div>
          <div className="space-y-2">
            <Label>Text 2</Label>
            <Textarea value={text2} onChange={(e) => setText2(e.target.value)} rows={10} />
          </div>
        </div>
        <Card className="p-4 text-center">
          <div className="text-3xl font-bold text-primary">{similarity}%</div>
          <div className="text-sm text-muted-foreground">Similarity</div>
        </Card>
      </div>
    </ToolLayout>
  );
}
