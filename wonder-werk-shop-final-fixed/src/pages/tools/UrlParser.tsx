import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { UsageGuide } from "@/components/UsageGuide";

export default function UrlParser() {
  const [url, setUrl] = useState("https://user:pass@example.com:8080/path/to/page?name=value&foo=bar#section");
  const [parsed, setParsed] = useState<any>({});

  const parseUrl = (urlString: string) => {
    try {
      const urlObj = new URL(urlString);
      const params: Record<string, string> = {};
      urlObj.searchParams.forEach((value, key) => {
        params[key] = value;
      });

      setParsed({
        protocol: urlObj.protocol,
        username: urlObj.username,
        password: urlObj.password,
        hostname: urlObj.hostname,
        port: urlObj.port,
        pathname: urlObj.pathname,
        search: urlObj.search,
        hash: urlObj.hash,
        origin: urlObj.origin,
        params
      });
    } catch {
      setParsed({ error: "Invalid URL" });
    }
  };

  const handleChange = (value: string) => {
    setUrl(value);
    parseUrl(value);
  };

  useState(() => {
    parseUrl(url);
  });

  return (
    <ToolLayout title="URL Parser" description="Parse and analyze URL components">
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Paste any URL in the input field",
            "URL is parsed automatically",
            "View all components (protocol, hostname, port, path, etc.)",
            "See query parameters broken down individually"
          ]}
          tips={[
            "Great for debugging URLs",
            "Understand URL structure",
            "Extract query parameters easily",
            "Useful for API development",
            "Shows hidden components like username and port"
          ]}
          example="https://example.com:8080/path?key=value#section"
        />
      </div>
      <div className="space-y-4">
        <Card className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              value={url}
              onChange={(e) => handleChange(e.target.value)}
              placeholder="https://example.com/path?query=value"
            />
          </div>
        </Card>

        {parsed.error ? (
          <Card className="p-6 text-red-600">{parsed.error}</Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">Protocol</div>
              <div className="font-mono">{parsed.protocol || '-'}</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">Hostname</div>
              <div className="font-mono">{parsed.hostname || '-'}</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">Port</div>
              <div className="font-mono">{parsed.port || '(default)'}</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">Pathname</div>
              <div className="font-mono">{parsed.pathname || '-'}</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">Username</div>
              <div className="font-mono">{parsed.username || '-'}</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">Password</div>
              <div className="font-mono">{parsed.password ? '****' : '-'}</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">Hash</div>
              <div className="font-mono">{parsed.hash || '-'}</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">Origin</div>
              <div className="font-mono text-xs">{parsed.origin || '-'}</div>
            </Card>
            {Object.keys(parsed.params || {}).length > 0 && (
              <Card className="p-4 col-span-2">
                <div className="text-sm text-muted-foreground mb-2">Query Parameters</div>
                <div className="space-y-1">
                  {Object.entries(parsed.params).map(([key, value]) => (
                    <div key={key} className="font-mono text-sm">
                      <span className="text-primary">{key}</span> = {value as string}
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
