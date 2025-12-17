import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function WordCloud() {
  const [text, setText] = useState("");
  const [words, setWords] = useState<{ word: string; count: number }[]>([]);

  const generateCloud = () => {
    const wordMap = new Map<string, number>();
    const cleanText = text.toLowerCase().replace(/[^\w\s]/g, ' ');
    const wordArray = cleanText.split(/\s+/).filter(w => w.length > 2);
    
    wordArray.forEach(word => {
      wordMap.set(word, (wordMap.get(word) || 0) + 1);
    });

    const sortedWords = Array.from(wordMap.entries())
      .map(([word, count]) => ({ word, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 50);
    
    setWords(sortedWords);
  };

  const getFontSize = (count: number, max: number) => {
    const min = 12;
    const maxSize = 48;
    return min + ((count / max) * (maxSize - min));
  };

  const maxCount = Math.max(...words.map(w => w.count), 1);

  return (
    <ToolLayout
      title="Word Cloud Generator"
      description="Create visual word clouds from text"
    >
      <Card className="p-6 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="text">Enter Text</Label>
          <Textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={10}
            placeholder="Paste your text here to generate a word cloud..."
          />
        </div>

        <Button onClick={generateCloud} className="w-full">
          Generate Word Cloud
        </Button>

        {words.length > 0 && (
          <Card className="p-8 min-h-[400px] bg-muted/50">
            <div className="flex flex-wrap gap-4 justify-center items-center">
              {words.map(({ word, count }, index) => (
                <span
                  key={index}
                  style={{
                    fontSize: `${getFontSize(count, maxCount)}px`,
                    opacity: 0.6 + (count / maxCount) * 0.4,
                  }}
                  className="font-bold text-primary hover:text-accent transition-colors cursor-default"
                  title={`${word}: ${count}`}
                >
                  {word}
                </span>
              ))}
            </div>
          </Card>
        )}
      </Card>
    </ToolLayout>
  );
}