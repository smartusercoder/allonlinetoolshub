import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Upload, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UsageGuide } from "@/components/UsageGuide";

export default function ImageBrightness() {
  const [image, setImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
        adjustImage(e.target?.result as string, brightness, contrast);
      };
      reader.readAsDataURL(file);
    }
  };

  const adjustImage = (imageData: string, b: number, c: number) => {
    const img = new Image();
    img.src = imageData;
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      
      const ctx = canvas.getContext('2d')!;
      ctx.filter = `brightness(${b}%) contrast(${c}%)`;
      ctx.drawImage(img, 0, 0);
      
      setProcessedImage(canvas.toDataURL('image/png'));
    };
  };

  const handleBrightnessChange = (value: number) => {
    setBrightness(value);
    if (image) adjustImage(image, value, contrast);
  };

  const handleContrastChange = (value: number) => {
    setContrast(value);
    if (image) adjustImage(image, brightness, value);
  };

  const downloadImage = () => {
    if (!processedImage) return;
    const link = document.createElement('a');
    link.download = 'adjusted-image.png';
    link.href = processedImage;
    link.click();
  };

  return (
    <ToolLayout
      title="Brightness & Contrast Adjuster"
      description="Adjust image brightness and contrast"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Upload your image",
            "Adjust brightness slider (0-200%)",
            "Adjust contrast slider (0-200%)",
            "Preview changes in real-time",
            "Download the adjusted image"
          ]}
          tips={[
            "100% is the original value",
            "Below 100% darkens/reduces, above 100% brightens/increases",
            "Great for fixing underexposed or overexposed photos",
            "Enhance image visibility and clarity",
            "Changes apply instantly"
          ]}
        />
      </div>
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
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Brightness: {brightness}%
                </label>
                <Input
                  type="range"
                  min="0"
                  max="200"
                  value={brightness}
                  onChange={(e) => handleBrightnessChange(parseInt(e.target.value))}
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">
                  Contrast: {contrast}%
                </label>
                <Input
                  type="range"
                  min="0"
                  max="200"
                  value={contrast}
                  onChange={(e) => handleContrastChange(parseInt(e.target.value))}
                />
              </div>

              {processedImage && (
                <>
                  <div>
                    <h3 className="text-sm font-medium mb-2">Result</h3>
                    <img src={processedImage} alt="Adjusted" className="w-full rounded border" />
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
