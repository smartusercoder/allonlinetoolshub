import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function FaviconGenerator() {
  const [image, setImage] = useState<string | null>(null);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateFavicon = (size: number) => {
    if (!image) return;

    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      if (ctx) {
        ctx.drawImage(img, 0, 0, size, size);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `favicon-${size}x${size}.png`;
            a.click();
            URL.revokeObjectURL(url);
            
            toast({
              title: "Success",
              description: `Favicon ${size}x${size} downloaded`,
            });
          }
        });
      }
    };

    img.src = image;
  };

  return (
    <ToolLayout
      title="Favicon Generator"
      description="Generate favicons from images in multiple sizes"
    >
      <Card className="p-6 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="image">Upload Image</Label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
          <p className="text-sm text-muted-foreground">
            Best results with square images
          </p>
        </div>

        {image && (
          <>
            <div className="space-y-2">
              <Label>Preview</Label>
              <div className="border rounded-lg p-4 bg-muted flex gap-4 items-center">
                <img src={image} alt="Original" className="w-16 h-16 border rounded" />
                <img src={image} alt="32x32" className="w-8 h-8 border rounded" />
                <img src={image} alt="16x16" className="w-4 h-4 border rounded" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Download Sizes</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button onClick={() => generateFavicon(16)} variant="outline">
                  16×16 (favicon.ico)
                </Button>
                <Button onClick={() => generateFavicon(32)} variant="outline">
                  32×32
                </Button>
                <Button onClick={() => generateFavicon(48)} variant="outline">
                  48×48
                </Button>
                <Button onClick={() => generateFavicon(64)} variant="outline">
                  64×64
                </Button>
                <Button onClick={() => generateFavicon(128)} variant="outline">
                  128×128
                </Button>
                <Button onClick={() => generateFavicon(256)} variant="outline">
                  256×256
                </Button>
              </div>
            </div>

            <div className="bg-muted p-4 rounded-lg text-sm">
              <strong>Usage:</strong> Rename the 16×16 or 32×32 file to "favicon.ico" and place it in your website's root directory.
            </div>
          </>
        )}
      </Card>
    </ToolLayout>
  );
}
