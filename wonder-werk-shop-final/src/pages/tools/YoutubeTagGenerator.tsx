import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const YoutubeTagGenerator = () => {
  const [topic, setTopic] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const { toast } = useToast();

  const generateTags = () => {
    if (!topic.trim()) {
      toast({
        title: "Error",
        description: "Please enter a topic",
        variant: "destructive",
      });
      return;
    }

    const words = topic.toLowerCase().split(/\s+/).filter(w => w.length > 2);
    const generated = [
      topic,
      ...words,
      ...words.map(w => `${w} tutorial`),
      ...words.map(w => `how to ${w}`),
      `${topic} 2024`,
      `${topic} guide`,
      `${topic} tips`,
      `best ${topic}`,
      `${topic} for beginners`,
    ];

    setTags(Array.from(new Set(generated)).slice(0, 30));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(tags.join(", "));
    toast({
      title: "Copied!",
      description: "Tags copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="YouTube Tag Generator"
      description="Generate relevant tags for your YouTube videos"
    >
      <div className="space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Video Topic</label>
              <Input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., cooking recipe, gaming tips"
                className="w-full"
              />
            </div>

            <Button onClick={generateTags} className="w-full">
              Generate Tags
            </Button>

            {tags.length > 0 && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">
                    Generated Tags ({tags.length})
                  </label>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <Textarea
                  value={tags.join(", ")}
                  readOnly
                  rows={8}
                  className="w-full bg-muted"
                />
              </div>
            )}
          </div>
        </Card>
      </div>
    </ToolLayout>
  );
};

export default YoutubeTagGenerator;
