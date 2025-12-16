import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const YoutubeDescriptionGenerator = () => {
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [description, setDescription] = useState("");
  const { toast } = useToast();

  const generateDescription = () => {
    if (!topic.trim()) {
      toast({
        title: "Error",
        description: "Please enter a topic",
        variant: "destructive",
      });
      return;
    }

    const keywordList = keywords.split(',').map(k => k.trim()).filter(k => k);
    const desc = `In this video, we'll explore ${topic} and show you everything you need to know!

📌 What You'll Learn:
• Understanding ${topic}
• Best practices and tips
• Common mistakes to avoid
• Expert techniques

${keywordList.length > 0 ? `🏷️ Keywords: ${keywordList.join(', ')}\n` : ''}
👍 If you found this helpful, please like and subscribe!

#${topic.replace(/\s+/g, '')} #tutorial #howto #2024`;

    setDescription(desc);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(description);
    toast({
      title: "Copied!",
      description: "Description copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="YouTube Description Generator"
      description="Generate professional descriptions for YouTube videos"
    >
      <div className="space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Video Topic</label>
              <Input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Web Development"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Keywords (comma-separated, optional)
              </label>
              <Input
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="e.g., coding, programming, tutorial"
                className="w-full"
              />
            </div>

            <Button onClick={generateDescription} className="w-full">
              Generate Description
            </Button>

            {description && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">Generated Description</label>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <Textarea
                  value={description}
                  readOnly
                  rows={12}
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

export default YoutubeDescriptionGenerator;
