import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { UsageGuide } from "@/components/UsageGuide";

export default function ReadabilityScore() {
  const [text, setText] = useState("");

  const calculateReadability = () => {
    if (!text) return null;

    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const words = text.split(/\s+/).filter(w => w.length > 0).length;
    const syllables = text.split(/\s+/).reduce((count, word) => {
      return count + Math.max(1, word.toLowerCase().match(/[aeiouy]+/g)?.length || 1);
    }, 0);

    const fleschScore = 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words);
    
    let grade = "N/A";
    if (fleschScore >= 90) grade = "5th Grade";
    else if (fleschScore >= 80) grade = "6th Grade";
    else if (fleschScore >= 70) grade = "7th Grade";
    else if (fleschScore >= 60) grade = "8th-9th Grade";
    else if (fleschScore >= 50) grade = "10th-12th Grade";
    else if (fleschScore >= 30) grade = "College";
    else grade = "College Graduate";

    return {
      score: Math.max(0, Math.min(100, fleschScore)).toFixed(1),
      grade,
      sentences,
      words,
      syllables
    };
  };

  const result = calculateReadability();

  return (
    <ToolLayout
      title="Readability Score"
      description="Calculate Flesch reading ease score"
    >
      <UsageGuide
        steps={[
          "Paste your text to analyze",
          "Get Flesch Reading Ease score (0-100)",
          "See the grade level required to understand it",
          "View detailed word, sentence, and syllable counts"
        ]}
        tips={[
          "Higher scores (90-100) = easier to read",
          "Lower scores (0-30) = difficult, college level",
          "Aim for 60-70 for general audiences",
          "Great for content optimization"
        ]}
        example="Score of 70 = 7th-8th grade level"
      />
      <div className="space-y-6">
        <div>
          <Label>Text to Analyze</Label>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to analyze..."
            rows={10}
          />
        </div>

        {result && (
          <div className="space-y-4">
            <Card className="p-6 bg-primary/10">
              <div className="text-center">
                <div className="text-sm text-muted-foreground mb-2">Flesch Reading Ease Score</div>
                <div className="text-5xl font-bold text-primary">{result.score}</div>
                <div className="text-lg mt-2">{result.grade}</div>
              </div>
            </Card>

            <div className="grid grid-cols-3 gap-4">
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold">{result.sentences}</div>
                <div className="text-sm text-muted-foreground">Sentences</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold">{result.words}</div>
                <div className="text-sm text-muted-foreground">Words</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold">{result.syllables}</div>
                <div className="text-sm text-muted-foreground">Syllables</div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
