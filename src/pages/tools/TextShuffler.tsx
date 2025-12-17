import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Shuffle } from "lucide-react";
import { UsageGuide } from "@/components/UsageGuide";

const TextShuffler = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const shuffleText = () => {
    const chars = text.split('');
    for (let i = chars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    setResult(chars.join(''));
  };

  return (
    <ToolLayout
      title="Text Shuffler"
      description="Randomly shuffle characters in text"
    >
      <UsageGuide
        steps={[
          "Enter or paste your text",
          "Click 'Shuffle' to randomize all characters",
          "Each click creates a new random arrangement",
          "Characters are completely scrambled"
        ]}
        tips={[
          "Creates random character arrangements",
          "Great for generating random strings",
          "Each shuffle is completely random",
          "Perfect for creating encryption-like effects"
        ]}
        example='"Hello" might become "olHle" or "eHllo"'
      />
      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="text">Input Text</Label>
          <Textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to shuffle..."
            rows={6}
          />
        </div>

        <Button onClick={shuffleText}>
          <Shuffle className="mr-2 h-4 w-4" />
          Shuffle
        </Button>

        {result && (
          <div className="space-y-2">
            <Label>Shuffled Text</Label>
            <Textarea value={result} readOnly rows={6} />
          </div>
        )}
      </Card>
    </ToolLayout>
  );
};

export default TextShuffler;
