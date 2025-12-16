import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function FindAllDuplicates() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<string[]>([]);

  const find = () => {
    const lines = text.split('\n');
    const counts = new Map<string, number>();
    
    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed) {
        counts.set(trimmed, (counts.get(trimmed) || 0) + 1);
      }
    });

    const duplicates = Array.from(counts.entries())
      .filter(([_, count]) => count > 1)
      .map(([line, count]) => `${line} (${count}x)`);

    setResult(duplicates);
  };

  return (
    <ToolLayout title="Find All Duplicates" description="Find all duplicate lines">
      <div className="space-y-4">
        <Textarea value={text} onChange={e => setText(e.target.value)} rows={10} placeholder="Enter text..." />
        <Button onClick={find} className="w-full">Find Duplicates</Button>
        {result.length > 0 && (
          <div className="p-4 bg-muted rounded space-y-1">
            {result.map((line, i) => (
              <div key={i} className="text-sm">{line}</div>
            ))}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
