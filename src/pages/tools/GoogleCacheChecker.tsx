import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, ExternalLink, Copy, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function GoogleCacheChecker() {
  const [url, setUrl] = useState("");
  const [cacheUrls, setCacheUrls] = useState<{ name: string; url: string }[] | null>(null);
  const { toast } = useToast();

  const generateCacheUrls = () => {
    if (!url) {
      toast({ title: "Error", description: "Please enter a URL", variant: "destructive" });
      return;
    }
    const cleanUrl = url.startsWith("http") ? url : `https://${url}`;
    setCacheUrls([
      { name: "Google Cache", url: `https://webcache.googleusercontent.com/search?q=cache:${cleanUrl}` },
      { name: "Wayback Machine", url: `https://web.archive.org/web/*/${cleanUrl}` },
      { name: "CachedView", url: `https://cachedview.com/?url=${encodeURIComponent(cleanUrl)}` },
      { name: "Archive.today", url: `https://archive.today/${cleanUrl}` },
    ]);
    toast({ title: "Success", description: "Cache URLs generated" });
  };

  const copyUrl = (cacheUrl: string) => {
    navigator.clipboard.writeText(cacheUrl);
    toast({ title: "Copied", description: "URL copied to clipboard" });
  };

  return (
    <ToolLayout title="Google Cache Checker" description="Check cached versions of web pages">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">Enter URL</Label>
            <div className="flex gap-2">
              <Input id="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com/page" onKeyDown={(e) => e.key === "Enter" && generateCacheUrls()} />
              <Button onClick={generateCacheUrls}><Search className="h-4 w-4 mr-2" />Check</Button>
            </div>
          </div>
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>Cache services store snapshots of web pages for viewing old versions or pages that are down.</AlertDescription>
          </Alert>
        </Card>

        <Card className="p-6 space-y-4">
          <Label className="text-lg font-semibold">Cache Links</Label>
          {cacheUrls ? (
            <div className="space-y-3">
              {cacheUrls.map((cache) => (
                <div key={cache.name} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{cache.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{cache.url}</p>
                  </div>
                  <div className="flex gap-2 ml-2">
                    <Button variant="ghost" size="icon" onClick={() => copyUrl(cache.url)}><Copy className="h-4 w-4" /></Button>
                    <a href={cache.url} target="_blank" rel="noopener noreferrer"><Button variant="outline" size="icon"><ExternalLink className="h-4 w-4" /></Button></a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">Enter a URL above to generate cache links</p>
          )}
        </Card>
      </div>
    </ToolLayout>
  );
}
