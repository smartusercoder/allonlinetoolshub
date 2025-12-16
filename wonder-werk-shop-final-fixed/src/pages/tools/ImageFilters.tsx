import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ImageFilters() {
  const [image, setImage] = useState<string | null>(null);
  const [filter, setFilter] = useState("none");
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
        applyFilter(e.target?.result as string, filter);
      };
      reader.readAsDataURL(file);
    }
  };

  const applyFilter = (imageData: string, filterType: string) => {
    const img = new Image();
    img.src = imageData;
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      
      const ctx = canvas.getContext('2d')!;
      
      const filters: Record<string, string> = {
        none: 'none',
        grayscale: 'grayscale(100%)',
        sepia: 'sepia(100%)',
        blur: 'blur(5px)',
        brightness: 'brightness(150%)',
        contrast: 'contrast(150%)',
        saturate: 'saturate(200%)',
        invert: 'invert(100%)',
      };
      
      ctx.filter = filters[filterType] || 'none';
      ctx.drawImage(img, 0, 0);
      
      setProcessedImage(canvas.toDataURL('image/png'));
    };
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    if (image) applyFilter(image, newFilter);
  };

  const downloadImage = () => {
    if (!processedImage) return;
    const link = document.createElement('a');
    link.download = `filtered-image.png`;
    link.href = processedImage;
    link.click();
  };

  const filters = [
    { id: 'none', name: 'Original' },
    { id: 'grayscale', name: 'Grayscale' },
    { id: 'sepia', name: 'Sepia' },
    { id: 'blur', name: 'Blur' },
    { id: 'brightness', name: 'Bright' },
    { id: 'contrast', name: 'Contrast' },
    { id: 'saturate', name: 'Saturate' },
    { id: 'invert', name: 'Invert' },
  ];

  return (
    <ToolLayout
      title="Image Filter Editor"
      description="Apply filters and effects to images"
    >
      <Card className="p-6">
        <div className="space-y-6">
          <Button asChild variant="outline" className="w-full">
            <label className="cursor-pointer">
              <Upload className="w-4 h-4 mr-2" />
              Upload Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </Button>

          {image && (
            <>
              <div className="grid grid-cols-4 gap-2">
                {filters.map(f => (
                  <Button
                    key={f.id}
                    variant={filter === f.id ? "default" : "outline"}
                    onClick={() => handleFilterChange(f.id)}
                    size="sm"
                  >
                    {f.name}
                  </Button>
                ))}
              </div>

              {processedImage && (
                <>
                  <div>
                    <h3 className="text-sm font-medium mb-2">Preview</h3>
                    <img src={processedImage} alt="Filtered" className="w-full rounded border" />
                  </div>

                  <Button onClick={downloadImage} className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download Image
                  </Button>
                </>
              )}
            </>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
}
