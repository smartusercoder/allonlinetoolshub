import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const YoutubeHashtagGenerator = () => {
  const [topic, setTopic] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const { toast } = useToast();

  const generateHashtags = () => {
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
      `#${topic.replace(/\s+/g, '')}`,
      ...words.map(w => `#${w}`),
      "#youtube",
      "#viral",
      "#trending",
      "#video",
      "#2024"
    ];

    setHashtags(Array.from(new Set(generated)).slice(0, 15));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(hashtags.join(" "));
    toast({
      title: "Copied!",
      description: "Hashtags copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="YouTube Hashtag Generator"
      description="Generate relevant hashtags for your YouTube videos"
    >
      <div className="space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Video Topic</label>
              <Input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., cooking tutorial"
                className="w-full"
              />
            </div>

            <Button onClick={generateHashtags} className="w-full">
              Generate Hashtags
            </Button>

            {hashtags.length > 0 && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">
                    Generated Hashtags ({hashtags.length})
                  </label>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <Textarea
                  value={hashtags.join(" ")}
                  readOnly
                  rows={4}
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

export default YoutubeHashtagGenerator;
