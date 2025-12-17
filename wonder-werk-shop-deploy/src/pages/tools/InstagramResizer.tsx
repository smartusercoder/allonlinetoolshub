import { useState, useRef } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const InstagramResizer = () => {
  const [image, setImage] = useState<string>("");
  const [format, setFormat] = useState("square");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const formats = {
    square: { width: 1080, height: 1080, name: "Square Post (1:1)" },
    portrait: { width: 1080, height: 1350, name: "Portrait Post (4:5)" },
    landscape: { width: 1080, height: 566, name: "Landscape Post (1.91:1)" },
    story: { width: 1080, height: 1920, name: "Story/Reels (9:16)" },
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        resizeImage(img);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const resizeImage = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const selectedFormat = formats[format as keyof typeof formats];
    canvas.width = selectedFormat.width;
    canvas.height = selectedFormat.height;

    // Calculate scaling to cover the canvas
    const scale = Math.max(
      canvas.width / img.width,
      canvas.height / img.height
    );

    const x = (canvas.width / 2) - (img.width / 2) * scale;
    const y = (canvas.height / 2) - (img.height / 2) * scale;

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

    setImage(canvas.toDataURL());
    toast({
      title: "Success",
      description: "Image resized for Instagram",
    });
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = `instagram-${format}.jpg`;
    link.href = canvas.toDataURL("image/jpeg", 0.9);
    link.click();
  };

  return (
    <ToolLayout
      title="Instagram Image Resizer"
      description="Resize images for Instagram posts, stories, and reels"
    >
      <Card className="p-6 space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="format">Instagram Format</Label>
            <Select value={format} onValueChange={setFormat}>
              <SelectTrigger id="format">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(formats).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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

export default InstagramResizer;
