import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Server, Search, CheckCircle, XCircle, Clock, Globe, AlertCircle, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface StatusResult {
  url: string;
  status: 'online' | 'offline' | 'error';
  responseTime: number | null;
  statusCode: number | null;
  checkedAt: Date;
  message: string;
}

interface HistoryEntry extends StatusResult {
  id: number;
}

export default function ServerStatusChecker() {
  const [url, setUrl] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<StatusResult | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const cleanUrl = (input: string): string => {
    let cleaned = input.trim();
    if (!cleaned.startsWith('http://') && !cleaned.startsWith('https://')) {
      cleaned = 'https://' + cleaned;
    }
    return cleaned;
  };

  const checkStatus = async () => {
    if (!url.trim()) {
      toast.error("Please enter a URL");
      return;
    }
    
    const cleanedUrl = cleanUrl(url);
    setIsChecking(true);
    
    const startTime = performance.now();
    
    try {
      // Try to fetch with no-cors mode (limited info but works cross-origin)
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);
      
      const response = await fetch(cleanedUrl, {
        method: 'HEAD',
        mode: 'no-cors',
        signal: controller.signal
      });
      
      clearTimeout(timeout);
      const responseTime = Math.round(performance.now() - startTime);
      
      // With no-cors, we can't read status, but if we get here, the server responded
      const newResult: StatusResult = {
        url: cleanedUrl,
        status: 'online',
        responseTime,
        statusCode: null, // Can't read with no-cors
        checkedAt: new Date(),
        message: 'Server is responding'
      };
      
      setResult(newResult);
      setHistory(prev => [{ ...newResult, id: Date.now() }, ...prev.slice(0, 9)]);
      toast.success(`${new URL(cleanedUrl).hostname} is online!`);
    } catch (error) {
      const responseTime = Math.round(performance.now() - startTime);
      
      let status: 'offline' | 'error' = 'offline';
      let message = 'Server appears to be down or unreachable';
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          message = 'Request timed out (>10s)';
        } else if (error.message.includes('Failed to fetch')) {
          message = 'Unable to reach server (may be down or blocking requests)';
        }
      }
      
      const newResult: StatusResult = {
        url: cleanedUrl,
        status,
        responseTime,
        statusCode: null,
        checkedAt: new Date(),
        message
      };
      
      setResult(newResult);
      setHistory(prev => [{ ...newResult, id: Date.now() }, ...prev.slice(0, 9)]);
      toast.error(`${new URL(cleanedUrl).hostname} may be offline`);
    } finally {
      setIsChecking(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'offline':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'online':
        return <Badge className="bg-green-500">Online</Badge>;
      case 'offline':
        return <Badge variant="destructive">Offline</Badge>;
      default:
        return <Badge variant="secondary">Error</Badge>;
    }
  };

  return (
    <ToolLayout 
      title="Server Status Checker" 
      description="Check if a website or server is online and responding"
    >
      <Card className="p-6">
        <div className="space-y-6">
          {/* Input section */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="url">Server/Website URL</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  onKeyDown={(e) => e.key === 'Enter' && checkStatus()}
                />
                <Button onClick={checkStatus} disabled={isChecking}>
                  {isChecking ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Check
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Current result */}
          {result && (
            <div className={`border rounded-lg p-6 ${
              result.status === 'online' 
                ? 'bg-green-500/10 border-green-500/30' 
                : 'bg-red-500/10 border-red-500/30'
            }`}>
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-full ${
                  result.status === 'online' ? 'bg-green-500/20' : 'bg-red-500/20'
                }`}>
                  <Server className={`h-8 w-8 ${
                    result.status === 'online' ? 'text-green-500' : 'text-red-500'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-lg">{new URL(result.url).hostname}</h3>
                    {getStatusBadge(result.status)}
                  </div>
                  <p className="text-sm text-muted-foreground">{result.message}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-background/50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Response Time</span>
                  </div>
                  <p className="font-semibold">
                    {result.responseTime !== null ? `${result.responseTime}ms` : 'N/A'}
                  </p>
                </div>
                <div className="bg-background/50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Checked At</span>
                  </div>
                  <p className="font-semibold text-sm">
                    {result.checkedAt.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* History */}
          {history.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-medium">Recent Checks</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {history.map((entry) => (
                  <div 
                    key={entry.id}
                    className="flex items-center gap-3 p-2 bg-muted/50 rounded-lg text-sm"
                  >
                    {getStatusIcon(entry.status)}
                    <span className="flex-1 truncate">{new URL(entry.url).hostname}</span>
                    <span className="text-muted-foreground">
                      {entry.responseTime}ms
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {entry.checkedAt.toLocaleTimeString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick checks */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground self-center mr-2">Quick check:</span>
            {['google.com', 'github.com', 'cloudflare.com', 'amazon.com'].map((domain) => (
              <Button
                key={domain}
                variant="outline"
                size="sm"
                onClick={() => {
                  setUrl(domain);
                  setTimeout(checkStatus, 100);
                }}
              >
                {domain}
              </Button>
            ))}
          </div>

          {/* Info section */}
          <div className="bg-muted/30 p-4 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <p className="font-medium text-foreground mb-1">How it works:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Sends a request to the server to check if it responds</li>
                  <li>Measures response time from your browser</li>
                  <li>Some servers may block cross-origin requests (shows as offline)</li>
                  <li>For more detailed uptime monitoring, use dedicated services</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </ToolLayout>
  );
}
