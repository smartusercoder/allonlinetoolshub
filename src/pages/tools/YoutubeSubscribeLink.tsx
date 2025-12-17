import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const YoutubeSubscribeLink = () => {
  const [channelId, setChannelId] = useState("");
  const [subscribeLink, setSubscribeLink] = useState("");
  const { toast } = useToast();

  const generateLink = () => {
    if (!channelId.trim()) {
      toast({
        title: "Error",
        description: "Please enter a channel ID or username",
        variant: "destructive",
      });
      return;
    }

    // Check if it's a channel ID (starts with UC) or username
    const link = channelId.startsWith('UC') 
      ? `https://www.youtube.com/channel/${channelId}?sub_confirmation=1`
      : `https://www.youtube.com/c/${channelId}?sub_confirmation=1`;
    
    setSubscribeLink(link);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(subscribeLink);
    toast({
      title: "Copied!",
      description: "Subscribe link copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="YouTube Subscribe Link Generator"
      description="Generate a subscribe link for your YouTube channel"
    >
      <div className="space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Channel ID or Username
              </label>
              <Input
                value={channelId}
                onChange={(e) => setChannelId(e.target.value)}
                placeholder="e.g., UCxyz... or @channelname"
                className="w-full"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Enter your channel ID (starts with UC) or channel username
              </p>
            </div>

            <Button onClick={generateLink} className="w-full">
              Generate Subscribe Link
            </Button>

            {subscribeLink && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">Subscribe Link</label>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm break-all font-mono">{subscribeLink}</p>
                </div>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6 bg-muted/50">
          <h3 className="font-semibold mb-3">How It Works</h3>
          <p className="text-sm text-muted-foreground">
            This tool generates a special subscribe link that automatically prompts visitors 
            to confirm their subscription when they click it. Perfect for sharing in video 
            descriptions, social media, or your website.
          </p>
        </Card>
      </div>
    </ToolLayout>
  );
};

export default YoutubeSubscribeLink;
