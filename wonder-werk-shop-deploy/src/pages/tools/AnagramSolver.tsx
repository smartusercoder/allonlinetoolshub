import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shuffle } from "lucide-react";
import { UsageGuide } from "@/components/UsageGuide";

const AnagramSolver = () => {
  const [word, setWord] = useState("");
  const [anagrams, setAnagrams] = useState<string[]>([]);

  const generateAnagrams = () => {
    if (!word.trim()) return;

    const permutations = new Set<string>();
    const chars = word.toLowerCase().replace(/\s/g, '').split('');

    const permute = (arr: string[], m: string[] = []) => {
      if (arr.length === 0) {
        permutations.add(m.join(''));
      } else {
        for (let i = 0; i < arr.length; i++) {
          const curr = arr.slice();
          const next = curr.splice(i, 1);
          permute(curr.slice(), m.concat(next));
        }
      }
    };

    permute(chars);
    setAnagrams(Array.from(permutations).slice(0, 100)); // Limit to 100 results
  };

  return (
    <ToolLayout
      title="Anagram Solver"
      description="Find all possible anagrams of a word"
    >
      <UsageGuide
        steps={[
          "Enter a word (up to 10 characters)",
          "Click 'Find Anagrams'",
          "Get all possible letter combinations",
          "Results are limited to first 100 for performance"
        ]}
        tips={[
          "Limited to 10 characters for performance",
          "Great for word games and puzzles",
          "Shows all possible permutations",
          "Note: Most won't be real words"
        ]}
        example='"cat" generates: cat, cta, act, atc, tca, tac'
      />
      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="word">Word or Phrase</Label>
          <Input
            id="word"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder="Enter a word..."
            maxLength={10}
          />
          <p className="text-xs text-muted-foreground">
            Note: Limited to 10 characters for performance
          </p>
        </div>

        <Button onClick={generateAnagrams}>
          <Shuffle className="mr-2 h-4 w-4" />
          Find Anagrams
        </Button>

        {anagrams.length > 0 && (
          <div className="space-y-3 pt-4 border-t">
            <h3 className="font-semibold text-lg">
              Found {anagrams.length} anagrams
            </h3>
            <div className="max-h-96 overflow-y-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {anagrams.map((anagram, index) => (
                  <div key={index} className="p-2 bg-muted rounded-md text-center">
                    {anagram}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Card>
    </ToolLayout>
  );
};

export default AnagramSolver;
