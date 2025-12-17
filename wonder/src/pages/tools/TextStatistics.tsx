import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { BarChart } from "lucide-react";
import { UsageGuide } from "@/components/UsageGuide";

const TextStatistics = () => {
  const [text, setText] = useState("");

  const calculateStats = () => {
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, '').length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const lines = text.split('\n').length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length;
    const paragraphs = text.split(/\n\n+/).filter(p => p.trim()).length;
    const avgWordLength = words > 0 ? (charsNoSpaces / words).toFixed(2) : 0;
    const readingTime = Math.ceil(words / 200); // 200 words per minute

    return { chars, charsNoSpaces, words, lines, sentences, paragraphs, avgWordLength, readingTime };
  };

  const stats = calculateStats();

  return (
    <ToolLayout
      title="Text Statistics"
      description="Get detailed statistics about your text"
    >
      <UsageGuide
        steps={[
          "Type or paste your text",
          "View comprehensive statistics instantly",
          "See counts for characters, words, lines, sentences, and more"
        ]}
        tips={[
          "Shows character count with and without spaces",
          "Calculates average word length",
          "Estimates reading time at 200 words/min",
          "Perfect for content analysis and optimization"
        ]}
      />
      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="text">Text</Label>
          <Textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter or paste your text here..."
            rows={10}
          />
        </div>

        <div className="space-y-3 pt-4 border-t">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <BarChart className="h-5 w-5" />
            Statistics
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3 bg-muted rounded-md">
              <p className="text-sm text-muted-foreground">Characters</p>
              <p className="text-2xl font-bold">{stats.chars}</p>
            </div>
            <div className="p-3 bg-muted rounded-md">
              <p className="text-sm text-muted-foreground">No Spaces</p>
              <p className="text-2xl font-bold">{stats.charsNoSpaces}</p>
            </div>
            <div className="p-3 bg-muted rounded-md">
              <p className="text-sm text-muted-foreground">Words</p>
              <p className="text-2xl font-bold">{stats.words}</p>
            </div>
            <div className="p-3 bg-muted rounded-md">
              <p className="text-sm text-muted-foreground">Lines</p>
              <p className="text-2xl font-bold">{stats.lines}</p>
            </div>
            <div className="p-3 bg-muted rounded-md">
              <p className="text-sm text-muted-foreground">Sentences</p>
              <p className="text-2xl font-bold">{stats.sentences}</p>
            </div>
            <div className="p-3 bg-muted rounded-md">
              <p className="text-sm text-muted-foreground">Paragraphs</p>
              <p className="text-2xl font-bold">{stats.paragraphs}</p>
            </div>
            <div className="p-3 bg-muted rounded-md">
              <p className="text-sm text-muted-foreground">Avg Word Length</p>
              <p className="text-2xl font-bold">{stats.avgWordLength}</p>
            </div>
            <div className="p-3 bg-muted rounded-md">
              <p className="text-sm text-muted-foreground">Reading Time</p>
              <p className="text-2xl font-bold">{stats.readingTime}m</p>
            </div>
          </div>
        </div>
      </Card>
    </ToolLayout>
  );
};

export default TextStatistics;
