import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UsageGuide } from "@/components/UsageGuide";

export default function WordFrequency() {
  const [text, setText] = useState("");
  const [frequencies, setFrequencies] = useState<[string, number][]>([]);

  const analyzeFrequency = () => {
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const freq: Record<string, number> = {};
    
    words.forEach(word => {
      freq[word] = (freq[word] || 0) + 1;
    });

    const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
    setFrequencies(sorted.slice(0, 50)); // Top 50 words
  };

  return (
    <ToolLayout
      title="Word Frequency Counter"
      description="Count word frequency in text"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Paste or type your text",
            "Click \"Analyze Frequency\"",
            "View top 50 most frequent words",
            "See word counts sorted from most to least common"
          ]}
          tips={[
            "Great for text analysis and SEO",
            "Identifies overused words in writing",
            "Useful for content optimization",
            "Perfect for finding keyword density",
            "Case-insensitive counting"
          ]}
        />
      </div>
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium">Text</label>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter or paste text..."
              rows={10}
            />
          </div>

          <Button onClick={analyzeFrequency} className="w-full">
            Analyze Frequency
          </Button>

          {frequencies.length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-3">Top Words</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {frequencies.map(([word, count], index) => (
                  <div key={word} className="flex items-center justify-between p-2 bg-muted rounded">
                    <span className="font-medium">
                      {index + 1}. {word}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {count} {count === 1 ? 'time' : 'times'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
}
