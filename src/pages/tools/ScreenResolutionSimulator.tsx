import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ScreenResolutionSimulator = () => {
  const [url, setUrl] = useState("");
  const [selectedResolution, setSelectedResolution] = useState("1920x1080");
  const { toast } = useToast();

  const resolutions = [
    { name: "Desktop (1920x1080)", value: "1920x1080", width: "1920", height: "1080" },
    { name: "Laptop (1366x768)", value: "1366x768", width: "1366", height: "768" },
    { name: "Tablet (768x1024)", value: "768x1024", width: "768", height: "1024" },
    { name: "Mobile (375x667)", value: "375x667", width: "375", height: "667" },
  ];

  const openSimulator = () => {
    if (!url.trim()) {
      toast({
        title: "Error",
        description: "Please enter a URL",
        variant: "destructive",
      });
      return;
    }

    const fullUrl = url.startsWith('http') ? url : `https://${url}`;
    const resolution = resolutions.find(r => r.value === selectedResolution);
    
    if (resolution) {
      window.open(
        fullUrl,
        '_blank',
        `width=${resolution.width},height=${resolution.height}`
      );
    }
  };

  return (
    <ToolLayout
      title="Screen Resolution Simulator"
      description="Test websites in different screen resolutions"
    >
      <div className="space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Website URL</label>
              <Textarea
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                rows={2}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Select Resolution</label>
              <select
                value={selectedResolution}
                onChange={(e) => setSelectedResolution(e.target.value)}
                className="w-full p-2 border rounded-md bg-background"
              >
                {resolutions.map((res) => (
                  <option key={res.value} value={res.value}>
                    {res.name}
                  </option>
                ))}
              </select>
            </div>

            <Button onClick={openSimulator} className="w-full">
              Open in New Window
            </Button>
          </div>
        </Card>

        <Card className="p-6 bg-muted/50">
          <h3 className="font-semibold mb-3">Note</h3>
          <p className="text-sm text-muted-foreground">
            This opens the website in a new window with the specified dimensions.
            Modern browsers may have restrictions on window sizing.
          </p>
        </Card>
      </div>
    </ToolLayout>
  );
};

export default ScreenResolutionSimulator;
