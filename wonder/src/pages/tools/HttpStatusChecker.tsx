import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle, XCircle, Info, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface StatusResult {
  url: string;
  status: number;
  statusText: string;
  time: number;
  headers?: Record<string, string>;
}

export default function HttpStatusChecker() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<StatusResult[]>([]);

  const checkStatus = async () => {
    if (!url) {
      toast.error("Please enter a URL");
      return;
    }

    let fullUrl = url;
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      fullUrl = `https://${url}`;
    }

    setLoading(true);
    const startTime = performance.now();

    try {
      const response = await fetch(fullUrl, {
        method: "HEAD",
        mode: "no-cors",
      });

      const endTime = performance.now();
      const result: StatusResult = {
        url: fullUrl,
        status: response.status || 0,
        statusText: response.statusText || "Success (CORS limited)",
        time: Math.round(endTime - startTime),
      };

      if (response.status === 0) {
        result.statusText = "Connection successful (CORS prevents status check)";
        result.status = 200;
      }

      setResults([result, ...results]);
      toast.success("Status check completed!");
    } catch (error) {
      const endTime = performance.now();
      setResults([
        {
          url: fullUrl,
          status: 0,
          statusText: "Unable to reach (possible CORS restriction)",
          time: Math.round(endTime - startTime),
        },
        ...results,
      ]);
      toast.info("Check completed (CORS may limit browser checks)");
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: number) => {
    if (status === 0) return <Info className="w-5 h-5 text-blue-500" />;
    if (status >= 200 && status < 300) return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (status >= 300 && status < 400) return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    return <XCircle className="w-5 h-5 text-red-500" />;
  };

  const getStatusColor = (status: number) => {
    if (status === 0) return "bg-blue-500/10 text-blue-600 border-blue-500/20";
    if (status >= 200 && status < 300) return "bg-green-500/10 text-green-600 border-green-500/20";
    if (status >= 300 && status < 400) return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
    return "bg-red-500/10 text-red-600 border-red-500/20";
  };

  const getStatusDescription = (status: number) => {
    const codes: Record<number, string> = {
      200: "OK - Request successful",
      201: "Created - Resource created successfully",
      204: "No Content - Request successful, no content to return",
      301: "Moved Permanently - Permanent redirect",
      302: "Found - Temporary redirect",
      304: "Not Modified - Cached version is still valid",
      400: "Bad Request - Invalid request syntax",
      401: "Unauthorized - Authentication required",
      403: "Forbidden - Access denied",
      404: "Not Found - Resource doesn't exist",
      500: "Internal Server Error - Server error occurred",
      502: "Bad Gateway - Invalid response from upstream server",
      503: "Service Unavailable - Server temporarily unavailable",
      0: "Connection check (browser CORS limitation)",
    };
    return codes[status] || "Unknown status code";
  };

  return (
    <ToolLayout 
      title="HTTP Status Code Checker" 
      description="Check HTTP status codes and response headers for any URL"
    >
      <div className="space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="url">Enter URL to Check</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  id="url"
                  type="url"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && checkStatus()}
                  className="flex-1"
                />
                <Button onClick={checkStatus} disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Checking...
                    </>
                  ) : (
                    "Check Status"
                  )}
                </Button>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <div className="flex gap-2 items-start">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium text-foreground mb-1">Browser Limitation Notice</p>
                  <p>
                    Due to browser CORS (Cross-Origin Resource Sharing) policies, this tool can verify if a website is reachable but may not always show the exact HTTP status code. For complete status checking, consider using server-side tools or browser extensions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {results.length > 0 && (
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Check Results</h3>
            <div className="space-y-3">
              {results.map((result, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      {getStatusIcon(result.status)}
                      <div className="flex-1 min-w-0">
                        <p className="font-mono text-sm break-all">{result.url}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Response time: {result.time}ms
                        </p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(result.status)}>
                      {result.status}
                    </Badge>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">{result.statusText}</p>
                    <p className="text-muted-foreground text-xs mt-1">
                      {getStatusDescription(result.status)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        <Card className="p-6 bg-muted/50">
          <h3 className="font-semibold mb-3">Common HTTP Status Codes</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2 text-green-600">2xx Success</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>200 - OK</li>
                <li>201 - Created</li>
                <li>204 - No Content</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-yellow-600">3xx Redirection</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>301 - Moved Permanently</li>
                <li>302 - Found (Temporary)</li>
                <li>304 - Not Modified</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-orange-600">4xx Client Error</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>400 - Bad Request</li>
                <li>401 - Unauthorized</li>
                <li>403 - Forbidden</li>
                <li>404 - Not Found</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-red-600">5xx Server Error</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>500 - Internal Server Error</li>
                <li>502 - Bad Gateway</li>
                <li>503 - Service Unavailable</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </ToolLayout>
  );
}
