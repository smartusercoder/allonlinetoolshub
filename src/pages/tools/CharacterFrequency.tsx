import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { BarChart } from "lucide-react";
import { UsageGuide } from "@/components/UsageGuide";

const CharacterFrequency = () => {
  const [text, setText] = useState("");
  const [frequencies, setFrequencies] = useState<Array<{ char: string; count: number; percentage: string }>>([]);

  const analyzeFrequency = () => {
    if (!text.trim()) return;

    const charCount: Record<string, number> = {};
    const chars = text.split('');
    
    chars.forEach(char => {
      if (char !== ' ' && char !== '\n') {
        charCount[char] = (charCount[char] || 0) + 1;
      }
    });

    const totalChars = Object.values(charCount).reduce((a, b) => a + b, 0);
    
    const freqList = Object.entries(charCount)
      .map(([char, count]) => ({
        char,
        count,
        percentage: ((count / totalChars) * 100).toFixed(2) + '%'
      }))
      .sort((a, b) => b.count - a.count);

    setFrequencies(freqList);
  };

  return (
    <ToolLayout
      title="Character Frequency Counter"
      description="Analyze character frequency distribution in text"
    >
      <UsageGuide
        steps={[
          "Enter or paste text to analyze",
          "Click 'Analyze Frequency'",
          "See each character with count and percentage",
          "Results sorted from most to least frequent"
        ]}
        tips={[
          "Spaces and newlines are excluded",
          "Great for cryptanalysis or text analysis",
          "Shows percentage distribution",
          "Useful for understanding text patterns"
        ]}
      />
      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="text">Text</Label>
          <Textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to analyze..."
            rows={10}
          />
        </div>

        <Button onClick={analyzeFrequency}>
          <BarChart className="mr-2 h-4 w-4" />
          Analyze Frequency
        </Button>

        {frequencies.length > 0 && (
          <div className="space-y-3 pt-4 border-t">
            <h3 className="font-semibold text-lg">Character Frequency</h3>
            <div className="max-h-96 overflow-y-auto space-y-2">
              {frequencies.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-md">
                  <div className="flex gap-3">
                    <span className="font-mono font-bold text-lg">{item.char}</span>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <span>Count: {item.count}</span>
                    <span>Frequency: {item.percentage}</span>
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

export default CharacterFrequency;
