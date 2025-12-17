import { useState, useMemo } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

export default function SentenceCounter() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
    const lengths = sentences.map(s => s.length);
    const avgLength = sentences.length > 0
      ? Math.round(lengths.reduce((sum: number, len: number) => sum + len, 0) / sentences.length)
      : 0;
    
    return {
      count: sentences.length,
      avgLength,
      shortest: lengths.length > 0 ? Math.min(...lengths) : 0,
      longest: lengths.length > 0 ? Math.max(...lengths) : 0
    };
  }, [text]);

  return (
    <ToolLayout
      title="Sentence Counter"
      description="Count sentences and analyze sentence statistics"
      keywords={["sentence counter", "count sentences", "sentence statistics", "sentence analyzer"]}
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
            <div className="text-sm text-muted-foreground">Sentences</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-3xl font-bold text-primary">{stats.avgLength}</div>
            <div className="text-sm text-muted-foreground">Avg Length</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-3xl font-bold text-primary">{stats.shortest}</div>
            <div className="text-sm text-muted-foreground">Shortest</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-3xl font-bold text-primary">{stats.longest}</div>
            <div className="text-sm text-muted-foreground">Longest</div>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
