import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FacebookIdFinder = () => {
  const [profileUrl, setProfileUrl] = useState("");
  const [facebookId, setFacebookId] = useState("");
  const { toast } = useToast();

  const findId = () => {
    // Extract ID from URL if present
    const match = profileUrl.match(/facebook\.com\/([^\/\?]+)/);
    if (match) {
      const username = match[1];
      // In real implementation, would use Facebook Graph API
      setFacebookId(`ID for ${username} (requires Facebook API)`);
    } else {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid Facebook profile URL",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(facebookId);
    toast({
      title: "Copied!",
      description: "Facebook ID copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="Facebook ID Finder"
      description="Find Facebook user or page ID"
    >
      <div className="space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Facebook Profile or Page URL
              </label>
              <Input
                value={profileUrl}
                onChange={(e) => setProfileUrl(e.target.value)}
                placeholder="https://www.facebook.com/username"
                className="w-full"
              />
            </div>

            <Button onClick={findId} className="w-full">
              Find Facebook ID
            </Button>

            {facebookId && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">Facebook ID</label>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm font-mono">{facebookId}</p>
                </div>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6 bg-muted/50">
          <h3 className="font-semibold mb-3">Note</h3>
          <p className="text-sm text-muted-foreground">
            Full functionality requires Facebook Graph API access. This tool extracts
            usernames from URLs. For numeric IDs, you'll need to use Facebook's official
            API with an access token.
          </p>
        </Card>
      </div>
    </ToolLayout>
  );
};

export default FacebookIdFinder;
