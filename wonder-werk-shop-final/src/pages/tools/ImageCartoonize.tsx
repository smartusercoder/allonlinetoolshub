import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ImageCartoonize() {
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
        // Draw original image
        ctx.drawImage(img, 0, 0);
        
        // Get image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        // Cartoon effect: posterize colors
        for (let i = 0; i < data.length; i += 4) {
          const levels = 4;
          data[i] = Math.floor(data[i] / (256 / levels)) * (256 / levels);
          data[i + 1] = Math.floor(data[i + 1] / (256 / levels)) * (256 / levels);
          data[i + 2] = Math.floor(data[i + 2] / (256 / levels)) * (256 / levels);
        }
        
        ctx.putImageData(imageData, 0, 0);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'cartoon-image.png';
            a.click();
            URL.revokeObjectURL(url);
            
            toast({
              title: "Success",
              description: "Cartoon image downloaded successfully",
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
      title="Cartoonize Image"
      description="Apply cartoon effect to images"
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
                  style={{
                    filter: 'contrast(150%) saturate(150%)',
                    maxWidth: '100%',
                    height: 'auto'
                  }}
                />
              </div>
            </div>

            <Button onClick={downloadImage} className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download Cartoon Image
            </Button>
          </>
        )}
      </Card>
    </ToolLayout>
  );
}
