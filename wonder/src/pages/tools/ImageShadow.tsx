import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ImageShadow() {
  const [image, setImage] = useState<string | null>(null);
  const [shadowX, setShadowX] = useState(5);
  const [shadowY, setShadowY] = useState(5);
  const [shadowBlur, setShadowBlur] = useState(10);
  const [shadowColor, setShadowColor] = useState("#000000");
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

  const downloadImage = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      const padding = shadowBlur + Math.max(Math.abs(shadowX), Math.abs(shadowY)) + 10;
      canvas.width = img.width + padding * 2;
      canvas.height = img.height + padding * 2;
      
      if (ctx) {
        ctx.shadowColor = shadowColor;
        ctx.shadowBlur = shadowBlur;
        ctx.shadowOffsetX = shadowX;
        ctx.shadowOffsetY = shadowY;
        
        ctx.drawImage(img, padding, padding);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'image-with-shadow.png';
            a.click();
            URL.revokeObjectURL(url);
            
            toast({
              title: "Success",
              description: "Image downloaded successfully",
            });
          }
        });
      }
    };
    
    if (image) {
      img.src = image;
    }
  };

  return (
    <ToolLayout
      title="Add Shadow to Image"
      description="Add drop shadow effects to your images"
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
        </div>

        {image && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="shadowX">Horizontal Offset</Label>
                <Input
                  id="shadowX"
                  type="number"
                  value={shadowX}
                  onChange={(e) => setShadowX(Number(e.target.value))}
                  min="-50"
                  max="50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="shadowY">Vertical Offset</Label>
                <Input
                  id="shadowY"
                  type="number"
                  value={shadowY}
                  onChange={(e) => setShadowY(Number(e.target.value))}
                  min="-50"
                  max="50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="shadowBlur">Blur Radius</Label>
                <Input
                  id="shadowBlur"
                  type="number"
                  value={shadowBlur}
                  onChange={(e) => setShadowBlur(Number(e.target.value))}
                  min="0"
                  max="50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="shadowColor">Shadow Color</Label>
                <Input
                  id="shadowColor"
                  type="color"
                  value={shadowColor}
                  onChange={(e) => setShadowColor(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Preview</Label>
              <div className="border rounded-lg p-12 bg-muted">
                <img 
                  src={image} 
                  alt="Preview" 
                  style={{
                    filter: `drop-shadow(${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowColor})`,
                    maxWidth: '100%',
                    height: 'auto'
                  }}
                />
              </div>
            </div>

            <Button onClick={downloadImage} className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download Image
            </Button>
          </>
        )}
      </Card>
    </ToolLayout>
  );
}
