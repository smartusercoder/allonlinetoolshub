import { useState, useRef } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Upload, Download, RotateCw, RotateCcw } from "lucide-react";
import { UsageGuide } from "@/components/UsageGuide";

const ImageRotate = () => {
  const [image, setImage] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
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
      setImage(event.target?.result as string);
      setRotation(0);
    };
    reader.readAsDataURL(file);
  };

  const rotate = (degrees: number) => {
    setRotation((prev) => (prev + degrees) % 360);
  };

  const downloadImage = () => {
    if (!image) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      const rad = (rotation * Math.PI) / 180;
      const sin = Math.abs(Math.sin(rad));
      const cos = Math.abs(Math.cos(rad));
      
      canvas.width = img.width * cos + img.height * sin;
      canvas.height = img.width * sin + img.height * cos;

      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(rad);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `rotated-${rotation}deg.png`;
          a.click();
          URL.revokeObjectURL(url);
          toast({
            title: "Success!",
            description: "Image downloaded",
          });
        }
      });
    };
    img.src = image;
  };

  return (
    <ToolLayout
      title="Image Rotator"
      description="Rotate images by any angle"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Upload an image file",
            "Use \"90° Left\" or \"90° Right\" buttons for quick rotation",
            "Or click preset angles (0°, 90°, 180°, 270°)",
            "Download the rotated image"
          ]}
          tips={[
            "Perfect for fixing sideways photos from phones",
            "Rotate left = counter-clockwise, rotate right = clockwise",
            "Preview updates in real-time as you rotate",
            "All processing happens locally in your browser"
          ]}
        />
      </div>
      <div className="space-y-6 mt-6">
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
            <div className="flex gap-3">
              <Button onClick={() => rotate(-90)} variant="outline" className="flex-1">
                <RotateCcw className="w-4 h-4 mr-2" />
                90° Left
              </Button>
              <Button onClick={() => rotate(90)} variant="outline" className="flex-1">
                <RotateCw className="w-4 h-4 mr-2" />
                90° Right
              </Button>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {[0, 90, 180, 270].map((deg) => (
                <Button
                  key={deg}
                  onClick={() => setRotation(deg)}
                  variant={rotation === deg ? "default" : "outline"}
                  size="sm"
                >
                  {deg}°
                </Button>
              ))}
            </div>

            <div className="text-center text-sm text-muted-foreground">
              Current rotation: {rotation}°
            </div>

            <div className="border rounded-lg p-4 bg-muted/10 flex items-center justify-center min-h-[300px]">
              <img
                src={image}
                alt="Preview"
                className="max-w-full max-h-[400px]"
                style={{ transform: `rotate(${rotation}deg)` }}
              />
            </div>

            <Button onClick={downloadImage} className="w-full" size="lg">
              <Download className="w-5 h-5 mr-2" />
              Download Rotated Image
            </Button>
          </>
        )}
      </div>
    </ToolLayout>
  );
};

export default ImageRotate;