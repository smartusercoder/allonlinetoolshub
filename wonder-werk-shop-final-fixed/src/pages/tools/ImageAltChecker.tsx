import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function ImageAltChecker() {
  const [url, setUrl] = useState("");
  const [images, setImages] = useState<Array<{src: string; alt: string; hasAlt: boolean}>>([]);
  const [stats, setStats] = useState<{total: number; withAlt: number; withoutAlt: number} | null>(null);
  const { toast } = useToast();

  const checkImages = async () => {
    try {
      const response = await fetch(url);
      const html = await response.text();
      
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      const imgElements = doc.querySelectorAll('img');
      const imageData: Array<{src: string; alt: string; hasAlt: boolean}> = [];
      
      imgElements.forEach(img => {
        const src = img.getAttribute('src') || '';
        const alt = img.getAttribute('alt') || '';
        imageData.push({
          src: src.length > 100 ? src.substring(0, 100) + '...' : src,
          alt: alt || '(missing)',
          hasAlt: alt.length > 0
        });
      });
      
      const withAlt = imageData.filter(img => img.hasAlt).length;
      const withoutAlt = imageData.filter(img => !img.hasAlt).length;
      
      setImages(imageData);
      setStats({
        total: imageData.length,
        withAlt,
        withoutAlt
      });
      
      toast({
        title: "Analysis Complete",
        description: `Found ${imageData.length} image(s)`,
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
      title="Image Alt Text Checker"
      description="Check images for alt text accessibility"
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
            <Button onClick={checkImages}>Check</Button>
          </div>
        </div>

        {stats && (
          <div className="grid grid-cols-3 gap-4">
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">Total Images</div>
              <div className="text-2xl font-bold">{stats.total}</div>
            </Card>
            <Card className="p-4 bg-green-50 border-green-200">
              <div className="text-sm text-muted-foreground">With Alt</div>
              <div className="text-2xl font-bold text-green-600">{stats.withAlt}</div>
            </Card>
            <Card className="p-4 bg-red-50 border-red-200">
              <div className="text-sm text-muted-foreground">Missing Alt</div>
              <div className="text-2xl font-bold text-red-600">{stats.withoutAlt}</div>
            </Card>
          </div>
        )}

        {images.length > 0 && (
          <div className="space-y-2">
            <Label>Images</Label>
            <div className="space-y-2">
              {images.map((img, index) => (
                <Card key={index} className={`p-3 ${!img.hasAlt ? 'border-red-200' : ''}`}>
                  <div className="space-y-1">
                    <div className="text-sm font-mono text-muted-foreground break-all">{img.src}</div>
                    <div className={`text-sm ${!img.hasAlt ? 'text-red-600' : ''}`}>
                      Alt: {img.alt}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </Card>
    </ToolLayout>
  );
}
