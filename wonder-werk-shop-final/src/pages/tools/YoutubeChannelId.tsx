import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const YoutubeChannelId = () => {
  const [channelUrl, setChannelUrl] = useState("");
  const [channelId, setChannelId] = useState("");
  const { toast } = useToast();

  const extractChannelId = () => {
    // Extract channel ID from various YouTube URL formats
    let id = "";
    
    if (channelUrl.includes("/channel/")) {
      id = channelUrl.split("/channel/")[1]?.split(/[/?#]/)[0] || "";
    } else if (channelUrl.includes("/c/") || channelUrl.includes("/user/")) {
      id = "Custom URL - Channel ID requires API lookup";
    } else if (channelUrl.startsWith("UC") && channelUrl.length === 24) {
      id = channelUrl;
    }

    if (id) {
      setChannelId(id);
    } else {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid YouTube channel URL",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(channelId);
    toast({
      title: "Copied!",
      description: "Channel ID copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="YouTube Channel ID Extractor"
      description="Extract YouTube channel ID from URL"
    >
      <div className="space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                YouTube Channel URL or ID
              </label>
              <Input
                value={channelUrl}
                onChange={(e) => setChannelUrl(e.target.value)}
                placeholder="https://www.youtube.com/channel/UC..."
                className="w-full"
              />
            </div>

            <Button onClick={extractChannelId} className="w-full">
              Extract Channel ID
            </Button>

            {channelId && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">Channel ID</label>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm font-mono break-all">{channelId}</p>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </ToolLayout>
  );
};

export default YoutubeChannelId;
