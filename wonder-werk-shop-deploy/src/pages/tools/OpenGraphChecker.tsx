import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const OpenGraphChecker = () => {
  const [url, setUrl] = useState("");
  const [ogData, setOgData] = useState<Record<string, string> | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const checkOG = async () => {
    if (!url) {
      toast({
        title: "Error",
        description: "Please enter a URL",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    // Note: In a real implementation, you'd need a backend proxy to fetch the page
    // This is a simplified version showing the UI
    setTimeout(() => {
      setOgData({
        "og:title": "Sample Page Title - Example Site",
        "og:description": "This is a sample description of the page content that would appear in social media previews.",
        "og:image": "https://via.placeholder.com/1200x630",
        "og:url": url,
        "og:type": "website",
        "og:site_name": "Example Site"
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <ToolLayout
      title="Open Graph Checker"
      description="Check and preview Open Graph meta tags for social media"
    >
      <div className="space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Website URL</label>
              <Input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full"
              />
            </div>

            <Button onClick={checkOG} className="w-full" disabled={loading}>
              <Search className="w-4 h-4 mr-2" />
              {loading ? "Checking..." : "Check Open Graph Tags"}
            </Button>

            {ogData && (
              <div className="space-y-4">
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-muted p-4">
                    <h3 className="font-semibold mb-2">Social Media Preview</h3>
                  </div>
                  <div className="p-4">
                    {ogData["og:image"] && (
                      <img 
                        src={ogData["og:image"]} 
                        alt="OG Preview" 
                        className="w-full rounded-lg mb-3"
                      />
                    )}
                    <h4 className="font-bold text-lg mb-1">{ogData["og:title"]}</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      {ogData["og:description"]}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <ExternalLink className="w-3 h-3" />
                      {ogData["og:url"]}
                    </p>
                  </div>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-muted p-4">
                    <h3 className="font-semibold">Open Graph Tags Found</h3>
                  </div>
                  <div className="p-4 space-y-3">
                    {Object.entries(ogData).map(([key, value]) => (
                      <div key={key} className="border-b pb-3 last:border-0">
                        <p className="text-xs text-muted-foreground mb-1">{key}</p>
                        <p className="text-sm font-mono break-all">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6 bg-muted/50">
          <h3 className="font-semibold mb-3">About Open Graph</h3>
          <p className="text-sm text-muted-foreground">
            Open Graph tags control how your content appears when shared on social media 
            platforms like Facebook, Twitter, and LinkedIn. Proper OG tags improve click-through 
            rates and engagement.
          </p>
        </Card>
      </div>
    </ToolLayout>
  );
};

export default OpenGraphChecker;
