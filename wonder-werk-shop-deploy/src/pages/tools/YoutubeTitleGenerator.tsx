import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const YoutubeTitleGenerator = () => {
  const [topic, setTopic] = useState("");
  const [titles, setTitles] = useState<string[]>([]);
  const { toast } = useToast();

  const generateTitles = () => {
    if (!topic.trim()) {
      toast({
        title: "Error",
        description: "Please enter a topic",
        variant: "destructive",
      });
      return;
    }

    const templates = [
      `How to ${topic} - Complete Guide`,
      `${topic} Tutorial for Beginners`,
      `Top 10 ${topic} Tips You Need to Know`,
      `${topic}: Everything You Need to Know in 2024`,
      `The Ultimate ${topic} Guide`,
      `${topic} Explained Simply`,
      `Master ${topic} in 10 Minutes`,
      `${topic} - Secrets Revealed!`,
      `Learn ${topic} the Easy Way`,
      `${topic} - Best Practices and Tips`
    ];

    setTitles(templates);
  };

  const copyToClipboard = (title: string) => {
    navigator.clipboard.writeText(title);
    toast({
      title: "Copied!",
      description: "Title copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="YouTube Title Generator"
      description="Generate engaging titles for your YouTube videos"
    >
      <div className="space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Video Topic</label>
              <Input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Python programming"
                className="w-full"
              />
            </div>

            <Button onClick={generateTitles} className="w-full">
              <RefreshCw className="w-4 h-4 mr-2" />
              Generate Titles
            </Button>

            {titles.length > 0 && (
              <div className="space-y-3">
                <label className="block text-sm font-medium">
                  Generated Titles ({titles.length})
                </label>
                {titles.map((title, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <p className="flex-1 text-sm">{title}</p>
                    <Button
                      onClick={() => copyToClipboard(title)}
                      variant="ghost"
                      size="sm"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>
    </ToolLayout>
  );
};

export default YoutubeTitleGenerator;
