import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function LinkAnalyzer() {
  const [url, setUrl] = useState("");
  const [links, setLinks] = useState<Array<{url: string; type: string; text: string}>>([]);
  const [stats, setStats] = useState<{internal: number; external: number; total: number} | null>(null);
  const { toast } = useToast();

  const analyzeLinks = async () => {
    try {
      const response = await fetch(url);
      const html = await response.text();
      
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      const baseUrl = new URL(url);
      const anchorElements = doc.querySelectorAll('a[href]');
      const linkData: Array<{url: string; type: string; text: string}> = [];
      
      anchorElements.forEach(anchor => {
        const href = anchor.getAttribute('href') || '';
        const text = anchor.textContent?.trim() || '(no text)';
        
        if (href.startsWith('http')) {
          const linkUrl = new URL(href);
          const type = linkUrl.hostname === baseUrl.hostname ? 'internal' : 'external';
          linkData.push({ url: href, type, text });
        } else if (href.startsWith('/') || !href.startsWith('#')) {
          linkData.push({ url: href, type: 'internal', text });
        }
      });
      
      const internal = linkData.filter(l => l.type === 'internal').length;
      const external = linkData.filter(l => l.type === 'external').length;
      
      setLinks(linkData);
      setStats({
        internal,
        external,
        total: linkData.length
      });
      
      toast({
        title: "Analysis Complete",
        description: `Found ${linkData.length} link(s)`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch URL. CORS restrictions may apply.",
        variant: "destructive",
      });
    }
  };

  return (
    <ToolLayout
      title="Link Analyzer"
      description="Analyze internal and external links"
    >
      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="url">Website URL</Label>
          <div className="flex gap-2">
            <Input
              id="url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="flex-1"
            />
            <Button onClick={analyzeLinks}>Analyze</Button>
          </div>
        </div>

        {stats && (
          <div className="grid grid-cols-3 gap-4">
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">Total Links</div>
              <div className="text-2xl font-bold">{stats.total}</div>
            </Card>
            <Card className="p-4 bg-green-50 border-green-200">
              <div className="text-sm text-muted-foreground">Internal</div>
              <div className="text-2xl font-bold text-green-600">{stats.internal}</div>
            </Card>
            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="text-sm text-muted-foreground">External</div>
              <div className="text-2xl font-bold text-blue-600">{stats.external}</div>
            </Card>
          </div>
        )}

        {links.length > 0 && (
          <div className="space-y-2 max-h-96 overflow-auto">
            <Label>Links ({links.length})</Label>
            {links.map((link, index) => (
              <Card key={index} className={`p-3 ${link.type === 'external' ? 'border-blue-200' : ''}`}>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded ${link.type === 'external' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                      {link.type}
                    </span>
                    <span className="text-sm">{link.text}</span>
                  </div>
                  <div className="text-xs text-muted-foreground break-all">{link.url}</div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Card>
    </ToolLayout>
  );
}
