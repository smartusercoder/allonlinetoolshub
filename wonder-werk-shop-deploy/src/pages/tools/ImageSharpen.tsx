import { useState, useRef } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Download, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ImageSharpen() {
  const [image, setImage] = useState<string | null>(null);
  const [intensity, setIntensity] = useState(50);
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

  const applySharpen = (imageData: ImageData, amount: number): ImageData => {
    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
    const factor = amount / 100;
    
    // Sharpening kernel
    const kernel = [
      0, -factor, 0,
      -factor, 1 + 4 * factor, -factor,
      0, -factor, 0
    ];
    
    const output = new Uint8ClampedArray(data.length);
    
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        for (let c = 0; c < 3; c++) {
          let sum = 0;
          for (let ky = -1; ky <= 1; ky++) {
            for (let kx = -1; kx <= 1; kx++) {
              const idx = ((y + ky) * width + (x + kx)) * 4 + c;
              sum += data[idx] * kernel[(ky + 1) * 3 + (kx + 1)];
            }
          }
          output[(y * width + x) * 4 + c] = Math.min(255, Math.max(0, sum));
        }
        output[(y * width + x) * 4 + 3] = data[(y * width + x) * 4 + 3];
      }
    }
    
    return new ImageData(output, width, height);
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
      const sharpened = applySharpen(imageData, intensity);
      ctx.putImageData(sharpened, 0, 0);
    };
    img.src = image;
  };

  const downloadImage = () => {
    if (!canvasRef.current) return;
    
    const link = document.createElement("a");
    link.download = "sharpened-image.png";
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
    
    toast({ title: "Success", description: "Sharpened image downloaded" });
  };

  return (
    <ToolLayout title="Image Sharpen" description="Sharpen blurry images">
      <Card className="p-6 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="image">Upload Image</Label>
          <Input id="image" type="file" accept="image/*" onChange={handleImageUpload} />
        </div>

        {image && (
          <>
            <div className="space-y-2">
              <Label>Sharpen Intensity: {intensity}%</Label>
              <Slider
                value={[intensity]}
                onValueChange={(v) => setIntensity(v[0])}
                min={0}
                max={100}
                step={1}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Original</Label>
                <div className="border rounded-lg p-2 bg-muted">
                  <img src={image} alt="Original" className="max-w-full h-auto" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Sharpened</Label>
                <div className="border rounded-lg p-2 bg-muted">
                  <canvas ref={canvasRef} className="max-w-full h-auto" />
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={processImage} className="flex-1">
                <Upload className="h-4 w-4 mr-2" />
                Apply Sharpen
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
