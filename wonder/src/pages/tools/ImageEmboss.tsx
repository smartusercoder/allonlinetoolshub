import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ImageEmboss() {
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
        
        // Emboss effect
        const weights = [
          -2, -1, 0,
          -1, 1, 1,
          0, 1, 2
        ];
        
        const side = Math.round(Math.sqrt(weights.length));
        const halfSide = Math.floor(side / 2);
        const w = canvas.width;
        const h = canvas.height;
        const output = ctx.createImageData(w, h);
        
        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            let r = 0, g = 0, b = 0;
            
            for (let cy = 0; cy < side; cy++) {
              for (let cx = 0; cx < side; cx++) {
                const scy = y + cy - halfSide;
                const scx = x + cx - halfSide;
                
                if (scy >= 0 && scy < h && scx >= 0 && scx < w) {
                  const offset = (scy * w + scx) * 4;
                  const wt = weights[cy * side + cx];
                  r += data[offset] * wt;
                  g += data[offset + 1] * wt;
                  b += data[offset + 2] * wt;
                }
              }
            }
            
            const dstOffset = (y * w + x) * 4;
            output.data[dstOffset] = r + 128;
            output.data[dstOffset + 1] = g + 128;
            output.data[dstOffset + 2] = b + 128;
            output.data[dstOffset + 3] = 255;
          }
        }
        
        ctx.putImageData(output, 0, 0);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'emboss-image.png';
            a.click();
            URL.revokeObjectURL(url);
            
            toast({
              title: "Success",
              description: "Emboss effect applied",
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
      title="Emboss Effect"
      description="Apply emboss effect to images"
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
            <div className="space-y-2">
              <Label>Preview</Label>
              <div className="border rounded-lg p-4 bg-muted">
                <img 
                  src={image} 
                  alt="Preview" 
                  className="max-w-full h-auto"
                />
              </div>
            </div>

            <Button onClick={downloadImage} className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download Embossed Image
            </Button>
          </>
        )}
      </Card>
    </ToolLayout>
  );
}
