import { useState, useRef } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Upload, Download } from "lucide-react";
import { UsageGuide } from "@/components/UsageGuide";

const ImageResizer = () => {
  const [image, setImage] = useState<string | null>(null);
  const [width, setWidth] = useState<number>(800);
  const [height, setHeight] = useState<number>(600);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setOriginalDimensions({ width: img.width, height: img.height });
        setWidth(img.width);
        setHeight(img.height);
        setImage(event.target?.result as string);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleWidthChange = (value: number) => {
    setWidth(value);
    if (maintainAspectRatio && originalDimensions.width > 0) {
      const ratio = originalDimensions.height / originalDimensions.width;
      setHeight(Math.round(value * ratio));
    }
  };

  const handleHeightChange = (value: number) => {
    setHeight(value);
    if (maintainAspectRatio && originalDimensions.height > 0) {
      const ratio = originalDimensions.width / originalDimensions.height;
      setWidth(Math.round(value * ratio));
    }
  };

  const downloadImage = () => {
    if (!image) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `resized-${width}x${height}.png`;
          a.click();
          URL.revokeObjectURL(url);
          toast({
            title: "Success!",
            description: "Image resized and downloaded",
          });
        }
      });
    };
    img.src = image;
  };

  return (
    <ToolLayout
      title="Image Resizer"
      description="Resize images to custom dimensions quickly"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Click \"Upload Image\" and select your image file",
            "Adjust width and/or height values",
            "Toggle \"Maintain aspect ratio\" if needed",
            "Preview the image",
            "Click \"Download Resized Image\" to save"
          ]}
          tips={[
            "Aspect ratio keeps proportions when checked",
            "Uncheck aspect ratio for custom dimensions",
            "Great for social media, thumbnails, and web optimization",
            "Supports all common image formats",
            "Processing happens in your browser - no uploads!"
          ]}
        />
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="w-full"
            size="lg"
          >
            <Upload className="w-5 h-5 mr-2" />
            Upload Image
          </Button>
        </div>

        {image && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Width (px)</Label>
                <Input
                  type="number"
                  value={width}
                  onChange={(e) => handleWidthChange(Number(e.target.value))}
                  min="1"
                />
              </div>
              <div>
                <Label>Height (px)</Label>
                <Input
                  type="number"
                  value={height}
                  onChange={(e) => handleHeightChange(Number(e.target.value))}
                  min="1"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="aspectRatio"
                checked={maintainAspectRatio}
                onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                className="rounded"
              />
              <Label htmlFor="aspectRatio" className="cursor-pointer">
                Maintain aspect ratio
              </Label>
            </div>

            <div className="text-sm text-muted-foreground">
              Original: {originalDimensions.width} × {originalDimensions.height} px
            </div>

            <div className="border rounded-lg p-4 bg-muted/10">
              <img src={image} alt="Preview" className="max-w-full h-auto mx-auto" style={{ maxHeight: "400px" }} />
            </div>

            <Button onClick={downloadImage} className="w-full" size="lg">
              <Download className="w-5 h-5 mr-2" />
              Download Resized Image ({width} × {height})
            </Button>
          </>
        )}
      </div>
    </ToolLayout>
  );
};

export default ImageResizer;