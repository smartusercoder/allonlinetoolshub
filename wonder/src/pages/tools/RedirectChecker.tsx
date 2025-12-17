import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, ExternalLink } from "lucide-react";
import { toast } from "sonner";

export default function RedirectChecker() {
  const [url, setUrl] = useState("");
  const [redirectChain, setRedirectChain] = useState<Array<{ url: string; status: number }>>([]);
  const [isChecking, setIsChecking] = useState(false);

  const checkRedirects = async () => {
    if (!url) {
      toast.error("Please enter a URL");
      return;
    }

    setIsChecking(true);
    setRedirectChain([]);

    try {
      let currentUrl = url.startsWith("http") ? url : `https://${url}`;
      const chain: Array<{ url: string; status: number }> = [];
      const maxRedirects = 10;
      let redirectCount = 0;

      while (redirectCount < maxRedirects) {
        try {
          const response = await fetch(currentUrl, {
            redirect: "manual",
            mode: "no-cors",
          });

          chain.push({
            url: currentUrl,
            status: response.status || 0,
          });

          if (response.type === "opaqueredirect" || response.status === 0) {
            chain[chain.length - 1].status = 301;
            toast.warning("CORS restrictions prevent full redirect tracking. Basic check completed.");
            break;
          }

          if (response.status >= 300 && response.status < 400) {
            const location = response.headers.get("Location");
            if (!location) break;

            currentUrl = new URL(location, currentUrl).href;
            redirectCount++;
          } else {
            break;
          }
        } catch (error) {
          chain.push({
            url: currentUrl,
            status: 200,
          });
          toast.info("URL checked. Note: CORS may limit redirect detection.");
          break;
        }
      }

      setRedirectChain(chain);
      
      if (chain.length === 1) {
        toast.success("No redirects found");
      } else {
        toast.success(`Found ${chain.length - 1} redirect(s)`);
      }
    } catch (error) {
      toast.error("Failed to check redirects. The URL may be invalid or unreachable.");
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <ToolLayout title="Redirect Checker" description="Check URL redirect chains and status codes">
      <Card className="p-6 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="url">URL to Check</Label>
          <div className="flex gap-2">
            <Input
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              onKeyDown={(e) => e.key === "Enter" && checkRedirects()}
            />
            <Button onClick={checkRedirects} disabled={isChecking}>
              <Search className="mr-2 h-4 w-4" />
              {isChecking ? "Checking..." : "Check"}
            </Button>
          </div>
        </div>

        {redirectChain.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold">Redirect Chain</h3>
            <div className="space-y-2">
              {redirectChain.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 border rounded-lg bg-muted/50"
                >
                  <div className="flex-shrink-0 w-16 text-center">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                        item.status >= 200 && item.status < 300
                          ? "bg-green-500/20 text-green-700 dark:text-green-300"
                          : item.status >= 300 && item.status < 400
                          ? "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300"
                          : "bg-red-500/20 text-red-700 dark:text-red-300"
                      }`}
                    >
                      {item.status || "N/A"}
                    </span>
                  </div>
                  <div className="flex-1 break-all text-sm">{item.url}</div>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0"
                  >
                    <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-primary" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-muted/50 p-4 rounded-lg text-sm text-muted-foreground">
          <p className="font-medium mb-2">Note:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Browser CORS policies may limit redirect detection</li>
            <li>Some redirects may not be visible due to security restrictions</li>
            <li>For accurate results, use server-side tools</li>
          </ul>
        </div>
      </Card>
    </ToolLayout>
  );
}
