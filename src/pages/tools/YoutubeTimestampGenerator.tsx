import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const YoutubeTimestampGenerator = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [timestampedUrl, setTimestampedUrl] = useState("");
  const { toast } = useToast();

  const generateTimestampUrl = () => {
    const videoId = extractVideoId(videoUrl);
    if (!videoId) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid YouTube URL",
        variant: "destructive",
      });
      return;
    }

    const seconds = parseTimestamp(timestamp);
    if (seconds === null) {
      toast({
        title: "Invalid Timestamp",
        description: "Please enter timestamp as MM:SS or HH:MM:SS",
        variant: "destructive",
      });
      return;
    }

    const url = `https://www.youtube.com/watch?v=${videoId}&t=${seconds}s`;
    setTimestampedUrl(url);
  };

  const extractVideoId = (url: string): string | null => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    return match ? match[1] : null;
  };

  const parseTimestamp = (time: string): number | null => {
    const parts = time.split(':').map(Number);
    if (parts.some(isNaN)) return null;
    
    if (parts.length === 2) {
      return parts[0] * 60 + parts[1];
    } else if (parts.length === 3) {
      return parts[0] * 3600 + parts[1] * 60 + parts[2];
    }
    return null;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(timestampedUrl);
    toast({
      title: "Copied!",
      description: "Timestamped URL copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="YouTube Timestamp Link Generator"
      description="Generate timestamped YouTube links"
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

            <div>
              <label className="block text-sm font-medium mb-2">
                Timestamp (MM:SS or HH:MM:SS)
              </label>
              <Input
                value={timestamp}
                onChange={(e) => setTimestamp(e.target.value)}
                placeholder="e.g., 1:30 or 0:01:30"
                className="w-full"
              />
            </div>

            <Button onClick={generateTimestampUrl} className="w-full">
              Generate Timestamped Link
            </Button>

            {timestampedUrl && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">Timestamped URL</label>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm break-all font-mono">{timestampedUrl}</p>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </ToolLayout>
  );
};

export default YoutubeTimestampGenerator;
