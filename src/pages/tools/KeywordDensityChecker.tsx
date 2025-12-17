import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function KeywordDensityChecker() {
  const [text, setText] = useState("");
  const [results, setResults] = useState<Array<{word: string; count: number; density: string}>>([]);

  const analyzeText = (input: string) => {
    if (!input.trim()) {
      setResults([]);
      return;
    }

    const words = input.toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length > 2);

    const totalWords = words.length;
    const wordCount: Record<string, number> = {};

    words.forEach(word => {
      wordCount[word] = (wordCount[word] || 0) + 1;
    });

    const sorted = Object.entries(wordCount)
      .map(([word, count]) => ({
        word,
        count,
        density: ((count / totalWords) * 100).toFixed(2)
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20);

    setResults(sorted);
  };

  const handleTextChange = (value: string) => {
    setText(value);
    analyzeText(value);
  };

  const wordCount = text.trim().split(/\s+/).filter(w => w.length > 0).length;

  return (
    <ToolLayout
      title="Keyword Density Checker"
      description="Analyze keyword density in your content"
    >
      <div className="space-y-4">
        <Card className="p-6 space-y-4">
          <div className="space-y-2">
            <Label>Enter Text</Label>
            <Textarea
              value={text}
              onChange={(e) => handleTextChange(e.target.value)}
              rows={10}
              placeholder="Paste your content here..."
            />
            <p className="text-sm text-muted-foreground">
              Total words: {wordCount}
            </p>
          </div>
        </Card>

        {results.length > 0 && (
          <Card className="p-6">
            <Label className="mb-4 block">Top Keywords</Label>
            <div className="space-y-2">
              {results.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-muted rounded">
                  <span className="font-medium">{item.word}</span>
                  <div className="text-sm">
                    <span className="mr-4 text-muted-foreground">{item.count} times</span>
                    <span className="font-semibold">{item.density}%</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}
