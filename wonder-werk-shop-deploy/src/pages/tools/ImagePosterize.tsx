import { useState, useRef } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Download, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ImagePosterize() {
  const [image, setImage] = useState<string | null>(null);
  const [levels, setLevels] = useState(4);
  const canvasRef = useRef<HTMLCanvasElement>(null);
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

  const posterize = (value: number, levels: number): number => {
    const step = 255 / (levels - 1);
    return Math.round(Math.round(value / step) * step);
  };

  const processImage = () => {
    if (!image || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        data[i] = posterize(data[i], levels);
        data[i + 1] = posterize(data[i + 1], levels);
        data[i + 2] = posterize(data[i + 2], levels);
      }
      
      ctx.putImageData(imageData, 0, 0);
    };
    img.src = image;
  };

  const downloadImage = () => {
    if (!canvasRef.current) return;
    
    const link = document.createElement("a");
    link.download = "posterized-image.png";
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
    
    toast({ title: "Success", description: "Posterized image downloaded" });
  };

  return (
    <ToolLayout title="Image Posterize" description="Create poster effect on images">
      <Card className="p-6 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="image">Upload Image</Label>
          <Input id="image" type="file" accept="image/*" onChange={handleImageUpload} />
        </div>

        {image && (
          <>
            <div className="space-y-2">
              <Label>Color Levels: {levels}</Label>
              <Slider
                value={[levels]}
                onValueChange={(v) => setLevels(v[0])}
                min={2}
                max={16}
                step={1}
              />
              <p className="text-xs text-muted-foreground">
                Lower values create more dramatic poster effects
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Original</Label>
                <div className="border rounded-lg p-2 bg-muted">
                  <img src={image} alt="Original" className="max-w-full h-auto" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Posterized</Label>
                <div className="border rounded-lg p-2 bg-muted">
                  <canvas ref={canvasRef} className="max-w-full h-auto" />
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={processImage} className="flex-1">
                <Upload className="h-4 w-4 mr-2" />
                Apply Posterize
              </Button>
              <Button onClick={downloadImage} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </>
        )}
      </Card>
    </ToolLayout>
  );
}
