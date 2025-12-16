import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Download, Trash2, Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ImageCombine() {
  const [images, setImages] = useState<File[]>([]);
  const [combinedUrl, setCombinedUrl] = useState<string>("");
  const [layout, setLayout] = useState<"horizontal" | "vertical" | "grid">("horizontal");

  const handleAddImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setImages(prev => [...prev, ...newFiles]);
      setCombinedUrl("");
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setCombinedUrl("");
  };

  const combineImages = async () => {
    if (images.length < 2) {
      toast.error("Please upload at least 2 images");
      return;
    }

    try {
      // Load all images
      const loadedImages = await Promise.all(
        images.map(file => {
          return new Promise<HTMLImageElement>((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = URL.createObjectURL(file);
          });
        })
      );

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;

      if (layout === "horizontal") {
        const maxHeight = Math.max(...loadedImages.map(img => img.height));
        const totalWidth = loadedImages.reduce((sum, img) => sum + img.width, 0);
        
        canvas.width = totalWidth;
        canvas.height = maxHeight;

        let x = 0;
        loadedImages.forEach(img => {
          ctx.drawImage(img, x, 0);
          x += img.width;
        });
      } else if (layout === "vertical") {
        const maxWidth = Math.max(...loadedImages.map(img => img.width));
        const totalHeight = loadedImages.reduce((sum, img) => sum + img.height, 0);
        
        canvas.width = maxWidth;
        canvas.height = totalHeight;

        let y = 0;
        loadedImages.forEach(img => {
          ctx.drawImage(img, 0, y);
          y += img.height;
        });
      } else { // grid
        const cols = Math.ceil(Math.sqrt(images.length));
        const rows = Math.ceil(images.length / cols);
        const cellWidth = Math.max(...loadedImages.map(img => img.width));
        const cellHeight = Math.max(...loadedImages.map(img => img.height));
        
        canvas.width = cellWidth * cols;
        canvas.height = cellHeight * rows;

        loadedImages.forEach((img, i) => {
          const col = i % cols;
          const row = Math.floor(i / cols);
          ctx.drawImage(img, col * cellWidth, row * cellHeight);
        });
      }

      canvas.toBlob(blob => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          setCombinedUrl(url);
          toast.success("Images combined successfully!");
        }
      }, 'image/png');

    } catch (error) {
      console.error("Error combining images:", error);
      toast.error("Failed to combine images");
    }
  };

  const downloadImage = () => {
    if (!combinedUrl) return;
    const a = document.createElement('a');
    a.href = combinedUrl;
    a.download = 'combined-image.png';
    a.click();
  };

  return (
    <ToolLayout
      title="Combine Images"
      description="Merge multiple images into one image"
    >
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <Label>Layout</Label>
            <Select value={layout} onValueChange={(v: any) => setLayout(v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="horizontal">Horizontal (Side by Side)</SelectItem>
                <SelectItem value="vertical">Vertical (Stacked)</SelectItem>
                <SelectItem value="grid">Grid</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="image-upload">Upload Images</Label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleAddImages}
              className="block w-full text-sm text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 mt-2"
            />
          </div>

          {images.length > 0 && (
            <div className="space-y-2">
              <Label>Selected Images ({images.length})</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((file, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Image ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <Button
                      size="icon"
                      variant="destructive"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImage(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button 
            onClick={combineImages} 
            disabled={images.length < 2}
            className="w-full gap-2"
          >
            <Plus className="w-4 h-4" />
            Combine Images
          </Button>

          {combinedUrl && (
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <img src={combinedUrl} alt="Combined" className="max-w-full h-auto" />
              </div>
              
              <Button onClick={downloadImage} className="w-full gap-2">
                <Download className="w-4 h-4" />
                Download Combined Image
              </Button>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
}
