import { useState, useRef } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Upload, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PixelArt = () => {
  const [image, setImage] = useState<string>("");
  const [pixelSize, setPixelSize] = useState([10]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        pixelateImage(img, pixelSize[0]);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const pixelateImage = (img: HTMLImageElement, size: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const maxWidth = 800;
    const scale = Math.min(1, maxWidth / img.width);
    canvas.width = img.width * scale;
    canvas.height = img.height * scale;

    // Draw scaled image
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Pixelate effect
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    for (let y = 0; y < canvas.height; y += size) {
      for (let x = 0; x < canvas.width; x += size) {
        const pixelIndex = (y * canvas.width + x) * 4;
        const r = imageData.data[pixelIndex];
        const g = imageData.data[pixelIndex + 1];
        const b = imageData.data[pixelIndex + 2];

        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fillRect(x, y, size, size);
      }
    }

    setImage(canvas.toDataURL());
    toast({
      title: "Success",
      description: "Image converted to pixel art",
    });
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = "pixel-art.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <ToolLayout
      title="Pixel Art Generator"
      description="Convert images to pixel art style"
    >
      <Card className="p-6 space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pixel-size">Pixel Size: {pixelSize[0]}px</Label>
            <Slider
              id="pixel-size"
              min={2}
              max={50}
              step={1}
              value={pixelSize}
              onValueChange={setPixelSize}
            />
          </div>

          <div>
            <label htmlFor="image-upload" className="cursor-pointer">
              <Button asChild>
                <span>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Image
                </span>
              </Button>
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {image && (
            <Button onClick={downloadImage} variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          )}

          <div className="border rounded-lg p-4 bg-muted/50">
            <canvas ref={canvasRef} className="max-w-full h-auto mx-auto" />
          </div>
        </div>
      </Card>
    </ToolLayout>
  );
};

export default PixelArt;
