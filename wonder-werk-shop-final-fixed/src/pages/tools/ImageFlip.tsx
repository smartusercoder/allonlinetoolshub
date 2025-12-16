import { useState, useRef } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Upload, Download } from "lucide-react";
import { UsageGuide } from "@/components/UsageGuide";

const ImageFlip = () => {
  const [image, setImage] = useState<string | null>(null);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
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
      setFlipH(false);
      setFlipV(false);
    };
    reader.readAsDataURL(file);
  };

  const downloadImage = () => {
    if (!image) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.save();
      ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
      ctx.drawImage(
        img,
        flipH ? -img.width : 0,
        flipV ? -img.height : 0,
        img.width,
        img.height
      );
      ctx.restore();

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `flipped-${flipH ? "h" : ""}${flipV ? "v" : ""}.png`;
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
      title="Image Flip"
      description="Flip images horizontally or vertically"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Upload an image file",
            "Click \"Flip Horizontal\" to create a mirror image",
            "Click \"Flip Vertical\" to flip upside down",
            "You can enable both flips simultaneously"
          ]}
          tips={[
            "Horizontal flip creates a mirror effect (left ↔ right)",
            "Vertical flip turns the image upside down (top ↔ bottom)",
            "Perfect for creating mirrored designs or fixing orientation",
            "Live preview shows changes instantly"
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
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => setFlipH(!flipH)}
                variant={flipH ? "default" : "outline"}
              >
                Flip Horizontal
              </Button>
              <Button
                onClick={() => setFlipV(!flipV)}
                variant={flipV ? "default" : "outline"}
              >
                Flip Vertical
              </Button>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              {flipH && flipV && "Flipped horizontally and vertically"}
              {flipH && !flipV && "Flipped horizontally"}
              {!flipH && flipV && "Flipped vertically"}
              {!flipH && !flipV && "Original orientation"}
            </div>

            <div className="border rounded-lg p-4 bg-muted/10 flex items-center justify-center min-h-[300px]">
              <img
                src={image}
                alt="Preview"
                className="max-w-full max-h-[400px]"
                style={{
                  transform: `scale(${flipH ? -1 : 1}, ${flipV ? -1 : 1})`
                }}
              />
            </div>

            <Button onClick={downloadImage} className="w-full" size="lg">
              <Download className="w-5 h-5 mr-2" />
              Download Flipped Image
            </Button>
          </>
        )}
      </div>
    </ToolLayout>
  );
};

export default ImageFlip;