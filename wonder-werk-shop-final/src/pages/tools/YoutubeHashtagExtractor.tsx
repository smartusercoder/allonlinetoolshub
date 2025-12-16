import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const YoutubeHashtagExtractor = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const { toast } = useToast();

  const extractHashtags = async () => {
    const videoId = extractVideoId(videoUrl);
    if (!videoId) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid YouTube URL",
        variant: "destructive",
      });
      return;
    }

    // Simulated extraction - in real implementation, would use YouTube API
    const mockHashtags = [
      "#youtube", "#video", "#tutorial", "#howto", "#tips",
      "#2024", "#trending", "#viral", "#content"
    ];
    setHashtags(mockHashtags);
  };

  const extractVideoId = (url: string): string | null => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    return match ? match[1] : null;
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
      title="YouTube Hashtag Extractor"
      description="Extract hashtags from YouTube videos"
    >
      <div className="space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">YouTube Video URL</label>
              <Input
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full"
              />
            </div>

            <Button onClick={extractHashtags} className="w-full">
              Extract Hashtags
            </Button>

            {hashtags.length > 0 && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">
                    Extracted Hashtags ({hashtags.length})
                  </label>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm">{hashtags.join(" ")}</p>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </ToolLayout>
  );
};

export default YoutubeHashtagExtractor;
