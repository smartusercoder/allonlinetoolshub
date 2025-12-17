import { useState, useRef } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Upload, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UsageGuide } from "@/components/UsageGuide";

const ImageBlur = () => {
  const [image, setImage] = useState<string>("");
  const [blurAmount, setBlurAmount] = useState([5]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        applyBlur(img);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const applyBlur = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = img.width;
    canvas.height = img.height;

    ctx.filter = `blur(${blurAmount[0]}px)`;
    ctx.drawImage(img, 0, 0);

    setImage(canvas.toDataURL());
    toast({
      title: "Success",
      description: "Blur applied to image",
    });
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = "blurred.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <ToolLayout
      title="Image Blur Tool"
      description="Apply blur effect to images"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Adjust blur amount using the slider (1-50px)",
            "Upload your image",
            "Blur is applied automatically",
            "Download the blurred image"
          ]}
          tips={[
            "Higher values = more blur",
            "Great for privacy (blurring faces, license plates)",
            "Perfect for background effects",
            "Create depth of field effects",
            "Preview updates in real-time"
          ]}
        />
      </div>
      <Card className="p-6 space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="blur">Blur Amount: {blurAmount[0]}px</Label>
            <Slider
              id="blur"
              min={1}
              max={50}
              value={blurAmount}
              onValueChange={setBlurAmount}
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

export default ImageBlur;
