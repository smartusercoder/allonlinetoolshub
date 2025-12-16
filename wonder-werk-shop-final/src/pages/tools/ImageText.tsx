import { useState, useRef, useEffect } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ValidatedFileUpload } from "@/components/form/ValidatedFileUpload";
import { ValidatedInput } from "@/components/form/ValidatedInput";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Download } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ImageText() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState(48);
  const [textColor, setTextColor] = useState("#ffffff");
  const [position, setPosition] = useState<"top" | "center" | "bottom">("center");
  const [resultUrl, setResultUrl] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (file: File | null) => {
    setImageFile(file);
    setResultUrl("");
  };

  const addTextToImage = async () => {
    if (!imageFile) {
      toast.error("Please upload an image");
      return;
    }

    if (!text.trim()) {
      toast.error("Please enter some text");
      return;
    }

    try {
      const img = new Image();
      img.src = URL.createObjectURL(imageFile);
      
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      const canvas = canvasRef.current!;
      const ctx = canvas.getContext('2d')!;
      
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw image
      ctx.drawImage(img, 0, 0);

      // Configure text
      ctx.font = `bold ${fontSize}px Arial`;
      ctx.fillStyle = textColor;
      ctx.textAlign = 'center';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 3;

      // Calculate position
      let y: number;
      if (position === "top") {
        y = fontSize + 20;
      } else if (position === "bottom") {
        y = canvas.height - 20;
      } else {
        y = canvas.height / 2;
      }

      // Draw text with outline
      ctx.strokeText(text, canvas.width / 2, y);
      ctx.fillText(text, canvas.width / 2, y);

      canvas.toBlob(blob => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          setResultUrl(url);
          toast.success("Text added successfully!");
        }
      }, 'image/png');

    } catch (error) {
      console.error("Error adding text:", error);
      toast.error("Failed to add text to image");
    }
  };

  const downloadImage = () => {
    if (!resultUrl) return;
    const a = document.createElement('a');
    a.href = resultUrl;
    a.download = 'image-with-text.png';
    a.click();
  };

  return (
    <ToolLayout
      title="Add Text to Image"
      description="Add custom text overlays to your images"
    >
      <Card className="p-6">
        <div className="space-y-6">
          <ValidatedFileUpload
            label="Upload Image"
            accept="image/*"
            onFileSelect={handleFileChange}
            helperText="Select an image to add text"
          />

          <ValidatedInput
            label="Text"
            value={text}
            onChange={setText}
            placeholder="Enter text to add to image"
          />

          <div>
            <Label>Font Size: {fontSize}px</Label>
            <Slider
              value={[fontSize]}
              onValueChange={(v) => setFontSize(v[0])}
              min={12}
              max={200}
              step={1}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="color">Text Color</Label>
            <div className="flex gap-2 mt-2">
              <input
                id="color"
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="h-10 w-20 cursor-pointer rounded border"
              />
              <span className="flex items-center text-sm text-muted-foreground">
                {textColor}
              </span>
            </div>
          </div>

          <div>
            <Label>Position</Label>
            <Select value={position} onValueChange={(v: any) => setPosition(v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="top">Top</SelectItem>
                <SelectItem value="center">Center</SelectItem>
                <SelectItem value="bottom">Bottom</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={addTextToImage} 
            disabled={!imageFile || !text.trim()}
            className="w-full"
          >
            Add Text to Image
          </Button>

          <canvas ref={canvasRef} style={{ display: 'none' }} />

          {resultUrl && (
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <img src={resultUrl} alt="Result" className="max-w-full h-auto" />
              </div>
              
              <Button onClick={downloadImage} className="w-full gap-2">
                <Download className="w-4 h-4" />
                Download Image
              </Button>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
}
