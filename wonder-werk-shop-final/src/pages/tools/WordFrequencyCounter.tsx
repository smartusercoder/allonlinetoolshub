import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { BarChart } from "lucide-react";

const WordFrequencyCounter = () => {
  const [text, setText] = useState("");

  const getWordFrequency = (text: string) => {
    if (!text.trim()) return [];
    
    const words = text.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 0);

    const frequency: { [key: string]: number } = {};
    words.forEach(word => {
      frequency[word] = (frequency[word] || 0) + 1;
    });

    return Object.entries(frequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 50);
  };

  const wordFreq = getWordFrequency(text);

  return (
    <ToolLayout
      title="Word Frequency Counter"
      description="Analyze word frequency in text"
    >
      <Card>
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-2">
            <Label>Text</Label>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter or paste your text here"
              rows={10}
            />
          </div>

          {wordFreq.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Word Frequency (Top 50)</h3>
              <div className="max-h-96 overflow-y-auto border rounded-lg">
                <table className="w-full">
                  <thead className="bg-muted sticky top-0">
                    <tr>
                      <th className="text-left p-3 font-semibold">Rank</th>
                      <th className="text-left p-3 font-semibold">Word</th>
                      <th className="text-right p-3 font-semibold">Count</th>
                      <th className="text-right p-3 font-semibold">Frequency</th>
                    </tr>
                  </thead>
                  <tbody>
                    {wordFreq.map(([word, count], index) => {
                      const total = text.split(/\s+/).filter(w => w.length > 0).length;
                      const percentage = ((count / total) * 100).toFixed(2);
                      return (
                        <tr key={word} className="border-t">
                          <td className="p-3 text-muted-foreground">{index + 1}</td>
                          <td className="p-3 font-mono">{word}</td>
                          <td className="p-3 text-right font-semibold">{count}</td>
                          <td className="p-3 text-right text-muted-foreground">{percentage}%</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </ToolLayout>
  );
};

export default WordFrequencyCounter;
