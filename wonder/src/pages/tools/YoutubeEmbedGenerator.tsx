import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

const YoutubeEmbedGenerator = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [autoplay, setAutoplay] = useState(false);
  const [controls, setControls] = useState(true);
  const [embedCode, setEmbedCode] = useState("");
  const { toast } = useToast();

  const generateEmbed = () => {
    const videoId = extractVideoId(videoUrl);
    if (!videoId) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid YouTube URL",
        variant: "destructive",
      });
      return;
    }

    const params = [];
    if (autoplay) params.push("autoplay=1");
    if (!controls) params.push("controls=0");
    
    const queryString = params.length > 0 ? `?${params.join('&')}` : '';
    const code = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}${queryString}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    
    setEmbedCode(code);
  };

  const extractVideoId = (url: string): string | null => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    return match ? match[1] : null;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCode);
    toast({
      title: "Copied!",
      description: "Embed code copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="YouTube Embed Code Generator"
      description="Generate embed code for YouTube videos"
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

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="autoplay"
                  checked={autoplay}
                  onCheckedChange={(checked) => setAutoplay(checked as boolean)}
                />
                <label htmlFor="autoplay" className="text-sm font-medium">
                  Autoplay
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="controls"
                  checked={controls}
                  onCheckedChange={(checked) => setControls(checked as boolean)}
                />
                <label htmlFor="controls" className="text-sm font-medium">
                  Show Controls
                </label>
              </div>
            </div>

            <Button onClick={generateEmbed} className="w-full">
              Generate Embed Code
            </Button>

            {embedCode && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">Embed Code</label>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <Textarea
                  value={embedCode}
                  readOnly
                  rows={6}
                  className="w-full bg-muted font-mono text-xs"
                />
              </div>
            )}
          </div>
        </Card>
      </div>
    </ToolLayout>
  );
};

export default YoutubeEmbedGenerator;
