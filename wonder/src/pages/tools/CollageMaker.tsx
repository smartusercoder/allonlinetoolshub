import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function CollageMaker() {
  const [images, setImages] = useState<string[]>([]);
  const [layout, setLayout] = useState<"grid" | "horizontal" | "vertical">("grid");
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImages(prev => [...prev, event.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const downloadCollage = () => {
    if (images.length === 0) {
      toast({
        title: "Error",
        description: "Please upload at least one image",
        variant: "destructive",
      });
      return;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    images.forEach((src, index) => {
      const img = new Image();
      img.onload = () => {
        loadedImages[index] = img;
        loadedCount++;
        
        if (loadedCount === images.length) {
          createCollage(canvas, ctx, loadedImages);
        }
      };
      img.src = src;
    });
  };

  const createCollage = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D | null, imgs: HTMLImageElement[]) => {
    if (!ctx) return;

    const size = 800;
    const cols = layout === "horizontal" ? imgs.length : layout === "vertical" ? 1 : Math.ceil(Math.sqrt(imgs.length));
    const rows = layout === "vertical" ? imgs.length : layout === "horizontal" ? 1 : Math.ceil(imgs.length / cols);
    
    const cellWidth = size / cols;
    const cellHeight = size / rows;
    
    canvas.width = size;
    canvas.height = size;
    
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);
    
    imgs.forEach((img, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      const x = col * cellWidth;
      const y = row * cellHeight;
      
      const scale = Math.min(cellWidth / img.width, cellHeight / img.height);
      const scaledWidth = img.width * scale;
      const scaledHeight = img.height * scale;
      const offsetX = (cellWidth - scaledWidth) / 2;
      const offsetY = (cellHeight - scaledHeight) / 2;
      
      ctx.drawImage(img, x + offsetX, y + offsetY, scaledWidth, scaledHeight);
    });
    
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'collage.png';
        a.click();
        URL.revokeObjectURL(url);
        
        toast({
          title: "Success",
          description: "Collage downloaded successfully",
        });
      }
    });
  };

  return (
    <ToolLayout
      title="Collage Maker"
      description="Create photo collages from multiple images"
    >
      <Card className="p-6 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="images">Upload Images (multiple)</Label>
          <Input
            id="images"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
          />
        </div>

        <div className="space-y-2">
          <Label>Layout</Label>
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant={layout === "grid" ? "default" : "outline"}
              onClick={() => setLayout("grid")}
            >
              Grid
            </Button>
            <Button
              variant={layout === "horizontal" ? "default" : "outline"}
              onClick={() => setLayout("horizontal")}
            >
              Horizontal
            </Button>
            <Button
              variant={layout === "vertical" ? "default" : "outline"}
              onClick={() => setLayout("vertical")}
            >
              Vertical
            </Button>
          </div>
        </div>

        {images.length > 0 && (
          <>
            <div className="space-y-2">
              <Label>Preview ({images.length} images)</Label>
              <div className="grid grid-cols-4 gap-2">
                {images.map((img, i) => (
                  <img key={i} src={img} alt={`Upload ${i + 1}`} className="w-full h-20 object-cover rounded" />
                ))}
              </div>
            </div>

            <Button onClick={downloadCollage} className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download Collage
            </Button>
          </>
        )}
      </Card>
    </ToolLayout>
  );
}
