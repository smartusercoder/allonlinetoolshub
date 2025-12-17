import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ImageSepia() {
  const [image, setImage] = useState<string | null>(null);
  const [intensity, setIntensity] = useState(100);
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
        ctx.filter = `sepia(${intensity}%)`;
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'sepia-image.png';
            a.click();
            URL.revokeObjectURL(url);
            
            toast({
              title: "Success",
              description: "Sepia image downloaded successfully",
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
      title="Sepia Filter"
      description="Apply sepia tone effect to images"
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
              <Label htmlFor="intensity">Sepia Intensity: {intensity}%</Label>
              <Input
                id="intensity"
                type="range"
                min="0"
                max="100"
                value={intensity}
                onChange={(e) => setIntensity(Number(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label>Preview</Label>
              <div className="border rounded-lg p-4 bg-muted">
                <img 
                  src={image} 
                  alt="Preview" 
                  style={{
                    filter: `sepia(${intensity}%)`,
                    maxWidth: '100%',
                    height: 'auto'
                  }}
                />
              </div>
            </div>

            <Button onClick={downloadImage} className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download Sepia Image
            </Button>
          </>
        )}
      </Card>
    </ToolLayout>
  );
}
