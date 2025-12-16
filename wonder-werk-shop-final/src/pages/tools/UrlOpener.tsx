import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function UrlOpener() {
  const [urls, setUrls] = useState("");
  const { toast } = useToast();

  const openUrls = () => {
    const urlList = urls.split('\n').filter(url => url.trim());
    
    if (urlList.length === 0) {
      toast({
        title: "Error",
        description: "Please enter at least one URL",
        variant: "destructive",
      });
      return;
    }

    if (urlList.length > 10) {
      toast({
        title: "Warning",
        description: "Opening more than 10 URLs may be blocked by your browser",
        variant: "destructive",
      });
    }

    let opened = 0;
    urlList.forEach(url => {
      const fullUrl = url.startsWith('http') ? url : `https://${url}`;
      window.open(fullUrl, '_blank');
      opened++;
    });

    toast({
      title: "Success",
      description: `Opened ${opened} URL(s)`,
    });
  };

  return (
    <ToolLayout
      title="URL Opener"
      description="Open multiple URLs at once"
    >
      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <Label>URLs (one per line)</Label>
          <Textarea
            value={urls}
            onChange={(e) => setUrls(e.target.value)}
            rows={10}
            placeholder="https://example.com&#10;https://google.com&#10;github.com"
          />
          <p className="text-sm text-muted-foreground">
            Enter one URL per line. Note: Your browser may block pop-ups.
          </p>
        </div>
        
        <Button onClick={openUrls} className="w-full">
          Open All URLs
        </Button>
      </Card>
    </ToolLayout>
  );
}
