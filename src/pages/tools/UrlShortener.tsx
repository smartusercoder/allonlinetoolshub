import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

const UrlShortener = () => {
  const [longUrl, setLongUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const generateShortUrl = () => {
    if (!longUrl) {
      toast.error("Please enter a URL");
      return;
    }

    try {
      new URL(longUrl);
    } catch {
      toast.error("Please enter a valid URL");
      return;
    }

    const alias = customAlias || generateRandomAlias();
    const baseUrl = window.location.origin;
    setShortUrl(`${baseUrl}/s/${alias}`);
    
    // Store in localStorage for demo purposes
    const stored = localStorage.getItem('shortened-urls') || '{}';
    const urls = JSON.parse(stored);
    urls[alias] = longUrl;
    localStorage.setItem('shortened-urls', JSON.stringify(urls));
  };

  const generateRandomAlias = (): string => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    toast.success("Short URL copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="URL Shortener"
      description="Create short URLs (client-side demo)"
    >
      <Card>
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-2">
            <Label>Long URL</Label>
            <Input
              type="url"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              placeholder="https://example.com/very/long/url/here"
            />
          </div>

          <div className="space-y-2">
            <Label>Custom Alias (Optional)</Label>
            <Input
              value={customAlias}
              onChange={(e) => setCustomAlias(e.target.value.replace(/[^a-zA-Z0-9-_]/g, ''))}
              placeholder="my-custom-link"
              maxLength={20}
            />
            <p className="text-xs text-muted-foreground">
              Leave blank to generate a random alias
            </p>
          </div>

          <Button onClick={generateShortUrl} className="w-full">
            Shorten URL
          </Button>

          {shortUrl && (
            <div className="space-y-2">
              <Label>Shortened URL</Label>
              <div className="flex gap-2">
                <Input
                  value={shortUrl}
                  readOnly
                  className="font-mono"
                />
                <Button variant="outline" size="icon" onClick={copyToClipboard}>
                  {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          )}

          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> This is a client-side demo that stores URLs in browser localStorage. 
              For production URL shortening, implement a proper backend service with database storage and redirect handling.
            </p>
          </div>
        </CardContent>
      </Card>
    </ToolLayout>
  );
};

export default UrlShortener;
