import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { UsageGuide } from "@/components/UsageGuide";

export default function SentenceGenerator() {
  const [count, setCount] = useState("5");
  const [sentences, setSentences] = useState("");

  const subjects = ["The cat", "A dog", "The bird", "My friend", "The teacher", "A scientist"];
  const verbs = ["runs", "jumps", "flies", "walks", "swims", "studies"];
  const objects = ["quickly", "slowly", "happily", "carefully", "loudly", "quietly"];
  const places = ["in the park", "at home", "in school", "by the river", "on the street", "in the garden"];

  const generateSentences = () => {
    const num = parseInt(count) || 5;
    const result: string[] = [];
    
    for (let i = 0; i < num; i++) {
      const subject = subjects[Math.floor(Math.random() * subjects.length)];
      const verb = verbs[Math.floor(Math.random() * verbs.length)];
      const adverb = objects[Math.floor(Math.random() * objects.length)];
      const place = places[Math.floor(Math.random() * places.length)];
      
      result.push(`${subject} ${verb} ${adverb} ${place}.`);
    }
    
    setSentences(result.join(" "));
  };

  return (
    <ToolLayout
      title="Random Sentence Generator"
      description="Generate random sentences for testing"
    >
      <UsageGuide
        steps={[
          "Set how many sentences you need (1-50)",
          "Click 'Generate' button",
          "Get grammatically correct random sentences",
          "Use for testing or placeholder content"
        ]}
        tips={[
          "Sentences follow basic grammar structure",
          "Perfect for testing layouts and designs",
          "Great for placeholder content",
          "Each sentence is unique and random"
        ]}
      />
      <div className="space-y-6">
        <div>
          <Label>Number of Sentences</Label>
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            className="w-full p-2 border rounded"
            min="1"
            max="50"
          />
        </div>

        <button
          onClick={generateSentences}
          className="w-full px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90"
        >
          Generate
        </button>

        {sentences && (
          <Card className="p-4">
            <Label>Generated Sentences</Label>
            <Textarea value={sentences} readOnly rows={10} className="mt-2" />
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}
