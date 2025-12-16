import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SitemapGenerator = () => {
  const [baseUrl, setBaseUrl] = useState("");
  const [urls, setUrls] = useState<string[]>([""]);
  const [result, setResult] = useState("");
  const { toast } = useToast();

  const addUrl = () => {
    setUrls([...urls, ""]);
  };

  const removeUrl = (index: number) => {
    setUrls(urls.filter((_, i) => i !== index));
  };

  const updateUrl = (index: number, value: string) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
  };

  const generateSitemap = () => {
    if (!baseUrl.trim()) {
      toast({
        title: "Error",
        description: "Please enter a base URL",
        variant: "destructive",
      });
      return;
    }

    const validUrls = urls.filter(url => url.trim());
    const currentDate = new Date().toISOString().split('T')[0];

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    validUrls.forEach(url => {
      const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;
      xml += '  <url>\n';
      xml += `    <loc>${fullUrl}</loc>\n`;
      xml += `    <lastmod>${currentDate}</lastmod>\n`;
      xml += '    <changefreq>weekly</changefreq>\n';
      xml += '    <priority>0.8</priority>\n';
      xml += '  </url>\n';
    });

    xml += '</urlset>';
    setResult(xml);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "Sitemap copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="Sitemap Generator"
      description="Generate XML sitemap for search engines"
    >
      <Card className="p-6 space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="baseUrl">Base URL</Label>
            <Input
              id="baseUrl"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              placeholder="https://example.com"
            />
          </div>

          <div className="space-y-2">
            <Label>URLs</Label>
            {urls.map((url, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={url}
                  onChange={(e) => updateUrl(index, e.target.value)}
                  placeholder="/page or full URL"
                />
                {urls.length > 1 && (
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => removeUrl(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button variant="outline" onClick={addUrl}>
              <Plus className="mr-2 h-4 w-4" />
              Add URL
            </Button>
          </div>

          <Button onClick={generateSitemap}>
            Generate Sitemap
          </Button>

          {result && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Generated Sitemap</Label>
                <Button size="sm" variant="outline" onClick={copyToClipboard}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </Button>
              </div>
              <Textarea value={result} readOnly rows={15} />
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
};

export default SitemapGenerator;
