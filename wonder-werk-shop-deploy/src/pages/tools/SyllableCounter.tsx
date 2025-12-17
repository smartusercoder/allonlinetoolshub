import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { UsageGuide } from "@/components/UsageGuide";

export default function SyllableCounter() {
  const [text, setText] = useState("");

  const countSyllables = (word: string): number => {
    word = word.toLowerCase().trim();
    if (word.length <= 3) return 1;
    
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
    word = word.replace(/^y/, '');
    
    const syllables = word.match(/[aeiouy]{1,2}/g);
    return syllables ? syllables.length : 1;
  };

  const analyze = () => {
    const words = text.split(/\s+/).filter(w => w.length > 0);
    return {
      totalWords: words.length,
      totalSyllables: words.reduce((sum, word) => sum + countSyllables(word), 0),
      avgSyllables: words.length > 0 
        ? (words.reduce((sum, word) => sum + countSyllables(word), 0) / words.length).toFixed(2)
        : "0"
    };
  };

  const result = text ? analyze() : null;

  return (
    <ToolLayout
      title="Syllable Counter"
      description="Count syllables in text"
    >
      <UsageGuide
        steps={[
          "Type or paste your text",
          "Syllables are counted automatically",
          "View total words, syllables, and average per word"
        ]}
        tips={[
          "Uses vowel counting algorithm",
          "Helpful for poetry and lyrics",
          "Average syllables indicates text complexity",
          "Great for checking readability"
        ]}
        example='"Beautiful" has 3 syllables'
      />
      <div className="space-y-6">
        <div>
          <Label>Text</Label>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text..."
            rows={10}
          />
        </div>

        {result && (
          <div className="grid grid-cols-3 gap-4">
            <Card className="p-4 text-center">
              <div className="text-3xl font-bold text-primary">{result.totalWords}</div>
              <div className="text-sm text-muted-foreground">Words</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-3xl font-bold text-primary">{result.totalSyllables}</div>
              <div className="text-sm text-muted-foreground">Syllables</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-3xl font-bold text-primary">{result.avgSyllables}</div>
              <div className="text-sm text-muted-foreground">Avg per Word</div>
            </Card>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
