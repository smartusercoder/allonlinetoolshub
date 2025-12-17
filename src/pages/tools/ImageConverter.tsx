import { useState, useRef } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Upload, Download } from "lucide-react";
import { UsageGuide } from "@/components/UsageGuide";

const ImageConverter = () => {
  const [image, setImage] = useState<string | null>(null);
  const [format, setFormat] = useState<"png" | "jpeg" | "webp">("png");
  const [originalFormat, setOriginalFormat] = useState("");
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

    setOriginalFormat(file.type.split("/")[1].toUpperCase());
    const reader = new FileReader();
    reader.onload = (event) => {
      setImage(event.target?.result as string);
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
      ctx.drawImage(img, 0, 0);

      const mimeType = `image/${format}`;
      const quality = format === "jpeg" ? 0.95 : undefined;

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `converted.${format}`;
            a.click();
            URL.revokeObjectURL(url);
            toast({
              title: "Success!",
              description: `Image converted to ${format.toUpperCase()}`,
            });
          }
        },
        mimeType,
        quality
      );
    };
    img.src = image;
  };

  return (
    <ToolLayout
      title="Image Format Converter"
      description="Convert between JPG, PNG, and WEBP formats"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Upload an image in any format (JPG, PNG, WEBP, etc.)",
            "Choose the target format from the dropdown",
            "Preview your image",
            "Click \"Download\" to save in the new format"
          ]}
          tips={[
            "PNG supports transparency, JPEG doesn't",
            "WEBP offers best compression for web use",
            "JPEG is best for photos with many colors",
            "Convert happens entirely in your browser - no uploads"
          ]}
          example="Convert logo.png → logo.webp for faster website loading"
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
            <div className="p-4 bg-primary/5 border-l-4 border-primary rounded">
              <div className="text-sm">
                <strong>Original format:</strong> {originalFormat}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Convert to</Label>
              <Select value={format} onValueChange={(v: any) => setFormat(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="png">PNG (Lossless, supports transparency)</SelectItem>
                  <SelectItem value="jpeg">JPEG (Smaller size, no transparency)</SelectItem>
                  <SelectItem value="webp">WEBP (Modern format, best compression)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="border rounded-lg p-4 bg-muted/10">
              <img src={image} alt="Preview" className="max-w-full h-auto mx-auto" style={{ maxHeight: "400px" }} />
            </div>

            <Button onClick={downloadImage} className="w-full" size="lg">
              <Download className="w-5 h-5 mr-2" />
              Download as {format.toUpperCase()}
            </Button>

            <div className="text-sm text-muted-foreground space-y-1">
              <p><strong>PNG:</strong> Best for graphics, logos, screenshots. Supports transparency.</p>
              <p><strong>JPEG:</strong> Best for photos. Smaller file size but loses quality.</p>
              <p><strong>WEBP:</strong> Modern format with better compression than JPEG and PNG.</p>
            </div>
          </>
        )}
      </div>
    </ToolLayout>
  );
};

export default ImageConverter;