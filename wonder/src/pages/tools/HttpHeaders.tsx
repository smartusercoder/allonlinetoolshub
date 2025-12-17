import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Server } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const HttpHeaders = () => {
  const [url, setUrl] = useState("");
  const [headers, setHeaders] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const checkHeaders = async () => {
    if (!url.trim()) {
      toast({
        title: "Error",
        description: "Please enter a URL",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(url, { method: 'HEAD' });
      const headersObj: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        headersObj[key] = value;
      });
      setHeaders(headersObj);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch headers. CORS policy may prevent this.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout
      title="HTTP Headers Checker"
      description="View HTTP response headers for any URL"
    >
      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="url">URL</Label>
          <div className="flex gap-2">
            <Input
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
            />
            <Button onClick={checkHeaders} disabled={loading}>
              <Server className="mr-2 h-4 w-4" />
              Check
            </Button>
          </div>
        </div>

        {Object.keys(headers).length > 0 && (
          <div className="space-y-3 pt-4 border-t">
            <h3 className="font-semibold text-lg">Response Headers</h3>
            <div className="space-y-2">
              {Object.entries(headers).map(([key, value]) => (
                <div key={key} className="p-3 bg-muted rounded-md">
                  <p className="text-sm font-medium">{key}</p>
                  <p className="text-sm text-muted-foreground break-all">{value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
          Note: Due to CORS restrictions, this tool may not work for all URLs. Consider using browser DevTools or command-line tools for complete header inspection.
        </div>
      </Card>
    </ToolLayout>
  );
};

export default HttpHeaders;
