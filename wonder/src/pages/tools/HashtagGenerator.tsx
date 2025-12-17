import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export default function HashtagGenerator() {
  const [text, setText] = useState("");

  const generateHashtags = () => {
    const words = text.toLowerCase().split(/\s+/).filter(w => w.length > 2);
    const hashtags = words.map(word => `#${word.replace(/[^a-z0-9]/g, '')}`);
    const combined = `#${words.join('').replace(/[^a-z0-9]/g, '')}`;
    
    return [...new Set([...hashtags, combined])].filter(h => h.length > 1);
  };

  const hashtags = text ? generateHashtags() : [];

  return (
    <ToolLayout
      title="Hashtag Generator"
      description="Generate hashtags from text"
    >
      <div className="space-y-6">
        <div>
          <Label>Text</Label>
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to convert to hashtags..."
          />
        </div>

        {hashtags.length > 0 && (
          <Card className="p-4">
            <Label className="mb-3 block">Generated Hashtags</Label>
            <div className="flex flex-wrap gap-2">
              {hashtags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}
