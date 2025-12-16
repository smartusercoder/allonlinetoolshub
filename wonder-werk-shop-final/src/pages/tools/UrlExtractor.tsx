import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function UrlExtractor() {
  const [input, setInput] = useState("");
  const [urls, setUrls] = useState<string[]>([]);
  const { toast } = useToast();

  const extractUrls = () => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const found = input.match(urlRegex) || [];
    const unique = [...new Set(found)];
    setUrls(unique);
    
    toast({
      title: "Success",
      description: `Found ${unique.length} unique URL(s)`,
    });
  };

  const copyAll = () => {
    navigator.clipboard.writeText(urls.join('\n'));
    toast({
      title: "Copied!",
      description: "All URLs copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="URL Extractor"
      description="Extract URLs from text"
    >
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium">Input Text</label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste text containing URLs..."
              rows={8}
            />
          </div>

          <Button onClick={extractUrls} className="w-full">
            Extract URLs
          </Button>

          {urls.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">
                  Found {urls.length} URL(s)
                </label>
                <Button onClick={copyAll} variant="outline" size="sm">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy All
                </Button>
              </div>
              <div className="space-y-2">
                {urls.map((url, index) => (
                  <div key={index} className="p-2 bg-muted rounded font-mono text-sm break-all">
                    {url}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
}
