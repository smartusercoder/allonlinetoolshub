import { useState, useMemo } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

export default function ParagraphCounter() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim());
    const avgWords = paragraphs.length > 0
      ? Math.round(paragraphs.reduce((sum, p) => sum + p.split(/\s+/).filter(Boolean).length, 0) / paragraphs.length)
      : 0;
    
    return {
      count: paragraphs.length,
      avgWords,
      words: text.split(/\s+/).filter(Boolean).length,
      chars: text.length
    };
  }, [text]);

  return (
    <ToolLayout
      title="Paragraph Counter"
      description="Count paragraphs and analyze text structure"
      keywords={["paragraph counter", "count paragraphs", "text analysis", "paragraph statistics"]}
    >
      <div className="space-y-4">
        <Textarea
          value={text}
          onChange={e => setText(e.target.value)}
          rows={10}
          placeholder="Paste your text here..."
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 text-center">
            <div className="text-3xl font-bold text-primary">{stats.count}</div>
            <div className="text-sm text-muted-foreground">Paragraphs</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-3xl font-bold text-primary">{stats.avgWords}</div>
            <div className="text-sm text-muted-foreground">Avg Words</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-3xl font-bold text-primary">{stats.words}</div>
            <div className="text-sm text-muted-foreground">Total Words</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-3xl font-bold text-primary">{stats.chars}</div>
            <div className="text-sm text-muted-foreground">Characters</div>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
