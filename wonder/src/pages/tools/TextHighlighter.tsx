import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export default function TextHighlighter() {
  const [text, setText] = useState("");
  const [keyword, setKeyword] = useState("");

  const highlighted = keyword ? text.replace(
    new RegExp(keyword, 'gi'),
    match => `<mark class="bg-yellow-300 dark:bg-yellow-700">${match}</mark>`
  ) : text;

  return (
    <ToolLayout title="Text Highlighter" description="Highlight keywords in text">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Keyword to Highlight</Label>
          <Input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Enter keyword..." />
        </div>
        <Textarea value={text} onChange={(e) => setText(e.target.value)} rows={8} placeholder="Enter text..." />
        <Card className="p-4">
          <div dangerouslySetInnerHTML={{ __html: highlighted }} className="whitespace-pre-wrap" />
        </Card>
      </div>
    </ToolLayout>
  );
}
