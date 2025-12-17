import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Shuffle } from "lucide-react";
import { UsageGuide } from "@/components/UsageGuide";

const TextScrambler = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const scrambleText = () => {
    if (!input.trim()) return;

    const words = input.split(' ');
    const scrambledWords = words.map(word => {
      if (word.length <= 3) return word;
      
      const chars = word.split('');
      const first = chars.shift();
      const last = chars.pop();
      
      // Shuffle middle characters
      for (let i = chars.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [chars[i], chars[j]] = [chars[j], chars[i]];
      }
      
      return first + chars.join('') + last;
    });

    setOutput(scrambledWords.join(' '));
  };

  const shuffleCompletely = () => {
    if (!input.trim()) return;
    
    const chars = input.split('');
    for (let i = chars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    
    setOutput(chars.join(''));
  };

  return (
    <ToolLayout
      title="Text Scrambler"
      description="Scramble and shuffle text in various ways"
    >
      <UsageGuide
        steps={[
          "Enter your text",
          "Choose 'Scramble Words' to shuffle middle letters while keeping first and last",
          "Or choose 'Shuffle All' to completely randomize all characters",
          "The scrambled result appears below"
        ]}
        tips={[
          "Scramble Words keeps words recognizable (first/last letters stay)",
          "Research shows scrambled text is often still readable",
          "Shuffle All completely randomizes everything",
          "Fun fact: 'Aoccdrnig to rseearch' is still readable!"
        ]}
      />
      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="input">Input Text</Label>
          <Textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to scramble..."
            rows={6}
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={scrambleText}>
            <Shuffle className="mr-2 h-4 w-4" />
            Scramble Words
          </Button>
          <Button onClick={shuffleCompletely} variant="outline">
            <Shuffle className="mr-2 h-4 w-4" />
            Shuffle All
          </Button>
        </div>

        {output && (
          <div className="space-y-2">
            <Label htmlFor="output">Scrambled Text</Label>
            <Textarea
              id="output"
              value={output}
              readOnly
              rows={6}
            />
          </div>
        )}
      </Card>
    </ToolLayout>
  );
};

export default TextScrambler;
