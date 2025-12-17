import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function HeadlineAnalyzer() {
  const [headline, setHeadline] = useState("");

  const analyze = () => {
    const words = headline.split(/\s+/).filter(w => w.length > 0);
    const chars = headline.length;
    
    const powerWords = ['amazing', 'secret', 'proven', 'ultimate', 'essential', 'complete', 'free', 'exclusive'];
    const hasPowerWord = powerWords.some(word => headline.toLowerCase().includes(word));
    
    const hasNumber = /\d/.test(headline);
    const hasQuestion = headline.includes('?');
    
    let score = 0;
    if (chars >= 40 && chars <= 65) score += 30;
    else if (chars < 40 || chars > 80) score += 10;
    else score += 20;
    
    if (words.length >= 6 && words.length <= 12) score += 30;
    else score += 15;
    
    if (hasPowerWord) score += 20;
    if (hasNumber) score += 10;
    if (hasQuestion) score += 10;

    return {
      score,
      chars,
      words: words.length,
      hasPowerWord,
      hasNumber,
      hasQuestion,
      rating: score >= 80 ? "Excellent" : score >= 60 ? "Good" : score >= 40 ? "Fair" : "Needs Work"
    };
  };

  const result = headline ? analyze() : null;

  return (
    <ToolLayout
      title="Headline Analyzer"
      description="Analyze and improve your headlines"
    >
      <div className="space-y-6">
        <div>
          <Label>Headline</Label>
          <Textarea
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            placeholder="Enter your headline..."
            rows={3}
          />
        </div>

        {result && (
          <div className="space-y-4">
            <Card className="p-6 bg-primary/10">
              <div className="text-center">
                <div className="text-sm text-muted-foreground mb-2">Overall Score</div>
                <div className="text-5xl font-bold text-primary">{result.score}/100</div>
                <div className="text-lg mt-2">{result.rating}</div>
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4">
                <div className="text-2xl font-bold">{result.chars}</div>
                <div className="text-sm text-muted-foreground">Characters</div>
                <div className="text-xs mt-1">Ideal: 40-65</div>
              </Card>
              <Card className="p-4">
                <div className="text-2xl font-bold">{result.words}</div>
                <div className="text-sm text-muted-foreground">Words</div>
                <div className="text-xs mt-1">Ideal: 6-12</div>
              </Card>
            </div>

            <Card className="p-4">
              <h3 className="font-semibold mb-2">Analysis</h3>
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <span>{result.hasPowerWord ? "✓" : "✗"}</span>
                  <span>Contains power words</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>{result.hasNumber ? "✓" : "✗"}</span>
                  <span>Includes numbers</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>{result.hasQuestion ? "✓" : "✗"}</span>
                  <span>Uses question format</span>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
