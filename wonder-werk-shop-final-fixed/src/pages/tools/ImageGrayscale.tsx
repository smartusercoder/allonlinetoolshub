import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UsageGuide } from "@/components/UsageGuide";

export default function ImageGrayscale() {
  const [image, setImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
        convertToGrayscale(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const convertToGrayscale = (imageData: string) => {
    const img = new Image();
    img.src = imageData;
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0);
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg;
        data[i + 1] = avg;
        data[i + 2] = avg;
      }
      
      ctx.putImageData(imageData, 0, 0);
      setProcessedImage(canvas.toDataURL('image/png'));
      
      toast({
        title: "Success",
        description: "Image converted to grayscale",
      });
    };
  };

  const downloadImage = () => {
    if (!processedImage) return;
    const link = document.createElement('a');
    link.download = 'grayscale-image.png';
    link.href = processedImage;
    link.click();
  };

  return (
    <ToolLayout
      title="Grayscale Converter"
      description="Convert images to grayscale"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Click \"Upload Image\" and select your image",
            "Image is automatically converted to grayscale",
            "View before and after comparison",
            "Download the grayscale version"
          ]}
          tips={[
            "Works with all common image formats",
            "Converts color images to shades of gray",
            "Perfect for black and white photography effects",
            "Useful for printing or design projects",
            "Processing happens instantly in your browser"
          ]}
        />
      </div>
      <Card className="p-6">
        <div className="space-y-6">
          <Button asChild variant="outline" className="w-full">
            <label className="cursor-pointer">
              <Upload className="w-4 h-4 mr-2" />
              Upload Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </Button>

          {image && processedImage && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Original</h3>
                  <img src={image} alt="Original" className="w-full rounded border" />
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Grayscale</h3>
                  <img src={processedImage} alt="Grayscale" className="w-full rounded border" />
                </div>
              </div>

              <Button onClick={downloadImage} className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Download Grayscale Image
              </Button>
            </>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
}
