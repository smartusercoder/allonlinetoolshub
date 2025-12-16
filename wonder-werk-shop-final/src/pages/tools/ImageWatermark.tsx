import { useState, useRef } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Upload, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ImageWatermark = () => {
  const [image, setImage] = useState<string>("");
  const [watermarkText, setWatermarkText] = useState("WATERMARK");
  const [opacity, setOpacity] = useState([50]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        addWatermark(img);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const addWatermark = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0);

    ctx.font = `bold ${Math.floor(img.width / 15)}px Arial`;
    ctx.fillStyle = `rgba(255, 255, 255, ${opacity[0] / 100})`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(-Math.PI / 4);
    ctx.fillText(watermarkText, 0, 0);
    ctx.restore();

    setImage(canvas.toDataURL());
    toast({
      title: "Success",
      description: "Watermark added",
    });
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = "watermarked.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <ToolLayout
      title="Image Watermark"
      description="Add watermark text to images"
    >
      <Card className="p-6 space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="watermark">Watermark Text</Label>
            <Input
              id="watermark"
              value={watermarkText}
              onChange={(e) => setWatermarkText(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="opacity">Opacity: {opacity[0]}%</Label>
            <Slider
              id="opacity"
              min={10}
              max={100}
              value={opacity}
              onValueChange={setOpacity}
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

export default ImageWatermark;
