import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const UrlRewriting = () => {
  const [oldUrl, setOldUrl] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [redirectType, setRedirectType] = useState("301");
  const [rules, setRules] = useState("");
  const { toast } = useToast();

  const generateRules = () => {
    if (!oldUrl || !newUrl) {
      toast({
        title: "Error",
        description: "Please enter both old and new URLs",
        variant: "destructive",
      });
      return;
    }

    const htaccessRules = `# URL Rewrite Rule
RewriteEngine On
RewriteRule ^${oldUrl.replace(/^\//, '')}$ ${newUrl} [R=${redirectType},L]

# Alternative using Redirect
Redirect ${redirectType} /${oldUrl.replace(/^\//, '')} ${newUrl}`;

    setRules(htaccessRules);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(rules);
    toast({
      title: "Copied!",
      description: "Rewrite rules copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="URL Rewriting Tool"
      description="Generate htaccess URL rewrite and redirect rules"
    >
      <div className="space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Old URL Path</label>
              <Input
                value={oldUrl}
                onChange={(e) => setOldUrl(e.target.value)}
                placeholder="old-page.html or old-folder/page"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">New URL</label>
              <Input
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                placeholder="https://example.com/new-page or /new-page"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Redirect Type</label>
              <Select value={redirectType} onValueChange={setRedirectType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="301">301 - Permanent Redirect</SelectItem>
                  <SelectItem value="302">302 - Temporary Redirect</SelectItem>
                  <SelectItem value="307">307 - Temporary Redirect (POST preserved)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={generateRules} className="w-full">
              Generate Rewrite Rules
            </Button>

            {rules && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">.htaccess Rules</label>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <Textarea
                  value={rules}
                  readOnly
                  rows={8}
                  className="w-full bg-muted font-mono text-sm"
                />
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6 bg-muted/50">
          <h3 className="font-semibold mb-3">Redirect Types</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li><strong>301</strong> - Permanent redirect, passes SEO value to new URL</li>
            <li><strong>302</strong> - Temporary redirect, doesn't pass SEO value</li>
            <li><strong>307</strong> - Temporary redirect, preserves request method (POST/GET)</li>
          </ul>
        </Card>
      </div>
    </ToolLayout>
  );
};

export default UrlRewriting;
