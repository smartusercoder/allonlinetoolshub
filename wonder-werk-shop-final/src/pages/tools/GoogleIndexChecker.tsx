import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, ExternalLink, Copy, Info, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function GoogleIndexChecker() {
  const [url, setUrl] = useState("");
  const [searchQueries, setSearchQueries] = useState<{ name: string; query: string; url: string }[] | null>(null);
  const { toast } = useToast();

  const generateSearchQueries = () => {
    if (!url) {
      toast({ title: "Error", description: "Please enter a URL", variant: "destructive" });
      return;
    }
    const cleanDomain = url.replace(/^(https?:\/\/)?(www\.)?/, "").split("/")[0];
    const fullUrl = url.startsWith("http") ? url : `https://${url}`;

    setSearchQueries([
      { name: "Check if URL is indexed", query: `site:${fullUrl}`, url: `https://www.google.com/search?q=site:${encodeURIComponent(fullUrl)}` },
      { name: "Check entire domain", query: `site:${cleanDomain}`, url: `https://www.google.com/search?q=site:${cleanDomain}` },
      { name: "Find related pages", query: `related:${cleanDomain}`, url: `https://www.google.com/search?q=related:${cleanDomain}` },
    ]);
    toast({ title: "Success", description: "Search queries generated" });
  };

  const copyQuery = (query: string) => {
    navigator.clipboard.writeText(query);
    toast({ title: "Copied", description: "Query copied" });
  };

  return (
    <ToolLayout title="Google Index Checker" description="Check if pages are indexed by Google">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">Enter URL or Domain</Label>
            <div className="flex gap-2">
              <Input id="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="example.com" onKeyDown={(e) => e.key === "Enter" && generateSearchQueries()} />
              <Button onClick={generateSearchQueries}><Search className="h-4 w-4 mr-2" />Check</Button>
            </div>
          </div>
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>Use Google search operators to check indexing. Results found = page is indexed.</AlertDescription>
          </Alert>
        </Card>

        <Card className="p-6 space-y-4">
          <Label className="text-lg font-semibold">Search Queries</Label>
          {searchQueries ? (
            <div className="space-y-3">
              {searchQueries.map((item) => (
                <div key={item.name} className="p-3 border rounded-lg space-y-2">
                  <p className="font-medium text-sm">{item.name}</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 bg-muted px-2 py-1 rounded text-sm truncate">{item.query}</code>
                    <Button variant="ghost" size="icon" onClick={() => copyQuery(item.query)}><Copy className="h-4 w-4" /></Button>
                    <a href={item.url} target="_blank" rel="noopener noreferrer"><Button variant="outline" size="icon"><ExternalLink className="h-4 w-4" /></Button></a>
                  </div>
                </div>
              ))}
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <h4 className="font-semibold flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" />How to interpret</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• <strong>Results found:</strong> Page is indexed</li>
                  <li>• <strong>No results:</strong> Page not indexed</li>
                </ul>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground">Enter a URL above to generate search queries</p>
          )}
        </Card>
      </div>
    </ToolLayout>
  );
}
