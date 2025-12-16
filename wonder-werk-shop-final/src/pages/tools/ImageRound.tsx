import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ImageRound() {
  const [image, setImage] = useState<string | null>(null);
  const [radius, setRadius] = useState(50);
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
      const size = Math.min(img.width, img.height);
      canvas.width = size;
      canvas.height = size;
      
      if (ctx) {
        // Create circular clip
        ctx.beginPath();
        if (radius === 50) {
          // Perfect circle
          ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
        } else {
          // Rounded corners
          const r = (size * radius) / 100;
          ctx.moveTo(r, 0);
          ctx.lineTo(size - r, 0);
          ctx.quadraticCurveTo(size, 0, size, r);
          ctx.lineTo(size, size - r);
          ctx.quadraticCurveTo(size, size, size - r, size);
          ctx.lineTo(r, size);
          ctx.quadraticCurveTo(0, size, 0, size - r);
          ctx.lineTo(0, r);
          ctx.quadraticCurveTo(0, 0, r, 0);
        }
        ctx.closePath();
        ctx.clip();
        
        // Draw image
        const offsetX = (img.width - size) / 2;
        const offsetY = (img.height - size) / 2;
        ctx.drawImage(img, -offsetX, -offsetY);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'round-image.png';
            a.click();
            URL.revokeObjectURL(url);
            
            toast({
              title: "Success",
              description: "Round image downloaded",
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
      title="Make Round Image"
      description="Create circular or rounded corner images"
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
              <Label htmlFor="radius">Corner Radius: {radius}%</Label>
              <Input
                id="radius"
                type="range"
                min="0"
                max="50"
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
              />
              <p className="text-sm text-muted-foreground">
                {radius === 50 ? "Perfect circle" : `${radius}% rounded corners`}
              </p>
            </div>

            <div className="space-y-2">
              <Label>Preview</Label>
              <div className="border rounded-lg p-4 bg-muted flex justify-center">
                <img 
                  src={image} 
                  alt="Preview" 
                  style={{
                    borderRadius: `${radius}%`,
                    maxWidth: '300px',
                    maxHeight: '300px',
                    objectFit: 'cover',
                    aspectRatio: '1/1'
                  }}
                />
              </div>
            </div>

            <Button onClick={downloadImage} className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download Round Image
            </Button>
          </>
        )}
      </Card>
    </ToolLayout>
  );
}
