import { useState, useRef } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MemeGenerator = () => {
  const [image, setImage] = useState<string>("");
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const generateMeme = () => {
    if (!image) {
      toast({
        title: "Error",
        description: "Please upload an image first",
        variant: "destructive",
      });
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      
      ctx.drawImage(img, 0, 0);
      
      ctx.font = `bold ${Math.floor(img.width / 15)}px Impact`;
      ctx.fillStyle = "white";
      ctx.strokeStyle = "black";
      ctx.lineWidth = Math.floor(img.width / 200);
      ctx.textAlign = "center";
      ctx.textBaseline = "top";

      const drawText = (text: string, y: number) => {
        ctx.strokeText(text.toUpperCase(), canvas.width / 2, y);
        ctx.fillText(text.toUpperCase(), canvas.width / 2, y);
      };

      if (topText) {
        drawText(topText, 20);
      }
      
      if (bottomText) {
        drawText(bottomText, canvas.height - Math.floor(img.width / 15) - 20);
      }
    };
    img.src = image;
  };

  const downloadMeme = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = "meme.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <ToolLayout
      title="Meme Generator"
      description="Create memes with custom text"
    >
      <Card className="p-6 space-y-4">
        <div className="space-y-4">
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

          <div className="space-y-2">
            <Label htmlFor="top">Top Text</Label>
            <Input
              id="top"
              value={topText}
              onChange={(e) => setTopText(e.target.value)}
              placeholder="Enter top text..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bottom">Bottom Text</Label>
            <Input
              id="bottom"
              value={bottomText}
              onChange={(e) => setBottomText(e.target.value)}
              placeholder="Enter bottom text..."
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={generateMeme}>
              Generate Meme
            </Button>
            <Button onClick={downloadMeme} variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>

          <div className="border rounded-lg p-4 bg-muted/50">
            <canvas ref={canvasRef} className="max-w-full h-auto mx-auto" />
          </div>
        </div>
      </Card>
    </ToolLayout>
  );
};

export default MemeGenerator;
