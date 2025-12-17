import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Download, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Redirect {
  from: string;
  to: string;
  type: "301" | "302";
}

export default function HtaccessGenerator() {
  const [forceHttps, setForceHttps] = useState(false);
  const [forceWww, setForceWww] = useState(false);
  const [removeWww, setRemoveWww] = useState(false);
  const [enableGzip, setEnableGzip] = useState(false);
  const [enableCaching, setEnableCaching] = useState(false);
  const [blockBots, setBlockBots] = useState(false);
  const [customErrorPages, setCustomErrorPages] = useState(false);
  const [error404Page, setError404Page] = useState("/404.html");
  const [error500Page, setError500Page] = useState("/500.html");
  const [redirects, setRedirects] = useState<Redirect[]>([]);
  const [blockIps, setBlockIps] = useState("");
  const [customRules, setCustomRules] = useState("");

  const addRedirect = () => {
    setRedirects([...redirects, { from: "", to: "", type: "301" }]);
  };

  const removeRedirect = (index: number) => {
    setRedirects(redirects.filter((_, i) => i !== index));
  };

  const updateRedirect = (index: number, field: keyof Redirect, value: string) => {
    setRedirects(redirects.map((r, i) => i === index ? { ...r, [field]: value } : r));
  };

  const generateHtaccess = (): string => {
    const lines: string[] = ["# Generated .htaccess file"];

    if (forceHttps) {
      lines.push("");
      lines.push("# Force HTTPS");
      lines.push("RewriteEngine On");
      lines.push("RewriteCond %{HTTPS} off");
      lines.push("RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]");
    }

    if (forceWww) {
      lines.push("");
      lines.push("# Force WWW");
      lines.push("RewriteEngine On");
      lines.push("RewriteCond %{HTTP_HOST} !^www\\. [NC]");
      lines.push("RewriteRule ^(.*)$ https://www.%{HTTP_HOST}/$1 [R=301,L]");
    }

    if (removeWww) {
      lines.push("");
      lines.push("# Remove WWW");
      lines.push("RewriteEngine On");
      lines.push("RewriteCond %{HTTP_HOST} ^www\\.(.*)$ [NC]");
      lines.push("RewriteRule ^(.*)$ https://%1/$1 [R=301,L]");
    }

    if (enableGzip) {
      lines.push("");
      lines.push("# Enable Gzip Compression");
      lines.push("<IfModule mod_deflate.c>");
      lines.push("  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css");
      lines.push("  AddOutputFilterByType DEFLATE text/javascript application/javascript");
      lines.push("  AddOutputFilterByType DEFLATE application/json application/xml");
      lines.push("</IfModule>");
    }

    if (enableCaching) {
      lines.push("");
      lines.push("# Browser Caching");
      lines.push("<IfModule mod_expires.c>");
      lines.push("  ExpiresActive On");
      lines.push("  ExpiresByType image/jpg \"access plus 1 year\"");
      lines.push("  ExpiresByType image/jpeg \"access plus 1 year\"");
      lines.push("  ExpiresByType image/png \"access plus 1 year\"");
      lines.push("  ExpiresByType image/gif \"access plus 1 year\"");
      lines.push("  ExpiresByType image/svg+xml \"access plus 1 year\"");
      lines.push("  ExpiresByType text/css \"access plus 1 month\"");
      lines.push("  ExpiresByType application/javascript \"access plus 1 month\"");
      lines.push("  ExpiresByType text/html \"access plus 1 day\"");
      lines.push("</IfModule>");
    }

    if (blockBots) {
      lines.push("");
      lines.push("# Block Bad Bots");
      lines.push("RewriteEngine On");
      lines.push("RewriteCond %{HTTP_USER_AGENT} ^.*(bot|crawl|spider|slurp).* [NC]");
      lines.push("RewriteRule .* - [F,L]");
    }

    if (customErrorPages) {
      lines.push("");
      lines.push("# Custom Error Pages");
      lines.push(`ErrorDocument 404 ${error404Page}`);
      lines.push(`ErrorDocument 500 ${error500Page}`);
    }

    if (redirects.length > 0) {
      lines.push("");
      lines.push("# Redirects");
      redirects.forEach(r => {
        if (r.from && r.to) {
          lines.push(`Redirect ${r.type} ${r.from} ${r.to}`);
        }
      });
    }

    if (blockIps.trim()) {
      lines.push("");
      lines.push("# Block IPs");
      lines.push("order allow,deny");
      blockIps.split("\n").filter(ip => ip.trim()).forEach(ip => {
        lines.push(`deny from ${ip.trim()}`);
      });
      lines.push("allow from all");
    }

    if (customRules.trim()) {
      lines.push("");
      lines.push("# Custom Rules");
      lines.push(customRules);
    }

    return lines.join("\n");
  };

  const htaccess = generateHtaccess();

  const copy = () => {
    navigator.clipboard.writeText(htaccess);
    toast.success("Copied to clipboard");
  };

  const download = () => {
    const blob = new Blob([htaccess], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = ".htaccess";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded");
  };

  return (
    <ToolLayout title=".htaccess Generator" description="Generate Apache .htaccess configuration files">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Card className="p-6">
            <h3 className="font-semibold mb-4">SSL & Domain Settings</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="https" checked={forceHttps} onCheckedChange={(c) => setForceHttps(!!c)} />
                <Label htmlFor="https">Force HTTPS</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="www" checked={forceWww} onCheckedChange={(c) => { setForceWww(!!c); if (c) setRemoveWww(false); }} />
                <Label htmlFor="www">Force WWW</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="nowww" checked={removeWww} onCheckedChange={(c) => { setRemoveWww(!!c); if (c) setForceWww(false); }} />
                <Label htmlFor="nowww">Remove WWW</Label>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Performance</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="gzip" checked={enableGzip} onCheckedChange={(c) => setEnableGzip(!!c)} />
                <Label htmlFor="gzip">Enable Gzip Compression</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="cache" checked={enableCaching} onCheckedChange={(c) => setEnableCaching(!!c)} />
                <Label htmlFor="cache">Enable Browser Caching</Label>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Security</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="bots" checked={blockBots} onCheckedChange={(c) => setBlockBots(!!c)} />
                <Label htmlFor="bots">Block Bad Bots</Label>
              </div>
              <div>
                <Label>Block IP Addresses (one per line)</Label>
                <Textarea
                  value={blockIps}
                  onChange={(e) => setBlockIps(e.target.value)}
                  placeholder="192.168.1.1&#10;10.0.0.0/24"
                  className="mt-2"
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Error Pages</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="errors" checked={customErrorPages} onCheckedChange={(c) => setCustomErrorPages(!!c)} />
                <Label htmlFor="errors">Enable Custom Error Pages</Label>
              </div>
              {customErrorPages && (
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <Label>404 Page</Label>
                    <Input value={error404Page} onChange={(e) => setError404Page(e.target.value)} />
                  </div>
                  <div>
                    <Label>500 Page</Label>
                    <Input value={error500Page} onChange={(e) => setError500Page(e.target.value)} />
                  </div>
                </div>
              )}
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Redirects</h3>
              <Button variant="outline" size="sm" onClick={addRedirect}>
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
            <div className="space-y-2">
              {redirects.map((redirect, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <Input
                    placeholder="/old-page"
                    value={redirect.from}
                    onChange={(e) => updateRedirect(i, "from", e.target.value)}
                    className="flex-1"
                  />
                  <Input
                    placeholder="/new-page"
                    value={redirect.to}
                    onChange={(e) => updateRedirect(i, "to", e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="ghost" size="icon" onClick={() => removeRedirect(i)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Generated .htaccess</h3>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={copy}>
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={download}>
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <pre className="bg-muted p-4 rounded-lg overflow-auto max-h-[500px] text-sm font-mono whitespace-pre-wrap">
              {htaccess}
            </pre>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-2">Custom Rules</h3>
            <Textarea
              value={customRules}
              onChange={(e) => setCustomRules(e.target.value)}
              placeholder="# Add custom .htaccess rules here"
              className="font-mono text-sm min-h-[150px]"
            />
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
