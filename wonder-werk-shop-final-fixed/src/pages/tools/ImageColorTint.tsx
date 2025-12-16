import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ImageColorTint() {
  const [image, setImage] = useState<string | null>(null);
  const [tintColor, setTintColor] = useState("#ff0000");
  const [intensity, setIntensity] = useState(50);
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

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 255, g: 0, b: 0 };
  };

  const downloadImage = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        const tint = hexToRgb(tintColor);
        const amount = intensity / 100;
        
        for (let i = 0; i < data.length; i += 4) {
          data[i] = data[i] * (1 - amount) + tint.r * amount;
          data[i + 1] = data[i + 1] * (1 - amount) + tint.g * amount;
          data[i + 2] = data[i + 2] * (1 - amount) + tint.b * amount;
        }
        
        ctx.putImageData(imageData, 0, 0);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'tinted-image.png';
            a.click();
            URL.revokeObjectURL(url);
            
            toast({
              title: "Success",
              description: "Color tint applied",
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
      title="Color Tint"
      description="Apply color tint overlay to images"
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
                <Label htmlFor="color">Tint Color</Label>
                <Input
                  id="color"
                  type="color"
                  value={tintColor}
                  onChange={(e) => setTintColor(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="intensity">Intensity: {intensity}%</Label>
                <Input
                  id="intensity"
                  type="range"
                  min="0"
                  max="100"
                  value={intensity}
                  onChange={(e) => setIntensity(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Preview</Label>
              <div className="border rounded-lg p-4 bg-muted">
                <img 
                  src={image} 
                  alt="Preview" 
                  style={{
                    filter: `sepia(100%) hue-rotate(${tintColor}) saturate(${intensity * 2}%)`,
                    maxWidth: '100%',
                    height: 'auto'
                  }}
                />
              </div>
            </div>

            <Button onClick={downloadImage} className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download Tinted Image
            </Button>
          </>
        )}
      </Card>
    </ToolLayout>
  );
}
