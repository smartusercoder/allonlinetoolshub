import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { BarChart } from "lucide-react";

const KeywordDensity = () => {
  const [text, setText] = useState("");
  const [keywords, setKeywords] = useState<Array<{ word: string; count: number; density: string }>>([]);

  const analyzeKeywords = () => {
    if (!text.trim()) return;

    const words = text.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 3);

    const wordCount: Record<string, number> = {};
    words.forEach(word => {
      wordCount[word] = (wordCount[word] || 0) + 1;
    });

    const totalWords = words.length;
    const keywordList = Object.entries(wordCount)
      .map(([word, count]) => ({
        word,
        count,
        density: ((count / totalWords) * 100).toFixed(2) + '%'
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20);

    setKeywords(keywordList);
  };

  return (
    <ToolLayout
      title="Keyword Density Checker"
      description="Analyze keyword frequency and density in your text for SEO optimization"
    >
      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="text">Text Content</Label>
          <Textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your text to analyze keyword density..."
            rows={10}
          />
        </div>

        <Button onClick={analyzeKeywords}>
          <BarChart className="mr-2 h-4 w-4" />
          Analyze Keywords
        </Button>

        {keywords.length > 0 && (
          <div className="space-y-3 pt-4 border-t">
            <h3 className="font-semibold text-lg">Top Keywords</h3>
            <div className="space-y-2">
              {keywords.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-md">
                  <div className="flex gap-3">
                    <span className="text-sm font-medium">#{index + 1}</span>
                    <span className="font-medium">{item.word}</span>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <span>Count: {item.count}</span>
                    <span>Density: {item.density}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>
    </ToolLayout>
  );
};

export default KeywordDensity;
