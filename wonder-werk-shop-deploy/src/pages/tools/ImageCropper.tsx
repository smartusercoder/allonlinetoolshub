import { useState, useRef } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Upload, Download, Crop } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UsageGuide } from "@/components/UsageGuide";

export default function ImageCropper() {
  const [image, setImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [cropData, setCropData] = useState({ x: 0, y: 0, width: 100, height: 100 });
  const { toast } = useToast();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const cropImage = () => {
    if (!image) return;

    const img = new Image();
    img.src = image;
    
    img.onload = () => {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext('2d')!;
      
      canvas.width = cropData.width;
      canvas.height = cropData.height;
      
      ctx.drawImage(
        img,
        cropData.x, cropData.y, cropData.width, cropData.height,
        0, 0, cropData.width, cropData.height
      );
      
      setCroppedImage(canvas.toDataURL('image/png'));
      toast({
        title: "Success",
        description: "Image cropped successfully",
      });
    };
  };

  const downloadImage = () => {
    if (!croppedImage) return;
    const link = document.createElement('a');
    link.download = 'cropped-image.png';
    link.href = croppedImage;
    link.click();
  };

  return (
    <ToolLayout
      title="Image Cropper"
      description="Crop images to custom dimensions"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Click \"Upload Image\" to select an image file",
            "Set X and Y position for the crop starting point",
            "Set width and height for the crop area",
            "Click \"Crop Image\" and then download the result"
          ]}
          tips={[
            "X and Y define the top-left corner of the crop area",
            "Width and height determine the size of the cropped region",
            "Perfect for profile pictures and thumbnails",
            "All processing happens in your browser"
          ]}
        />
      </div>
      <Card className="p-6 mt-6">
        <div className="space-y-6">
          <Button asChild variant="outline" className="w-full">
            <label className="cursor-pointer">
              <Upload className="w-4 h-4 mr-2" />
              Upload Image
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          </Button>

          {image && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">X Position</label>
                  <Input type="number" value={cropData.x} onChange={(e) => setCropData({...cropData, x: parseInt(e.target.value) || 0})} />
                </div>
                <div>
                  <label className="text-sm font-medium">Y Position</label>
                  <Input type="number" value={cropData.y} onChange={(e) => setCropData({...cropData, y: parseInt(e.target.value) || 0})} />
                </div>
                <div>
                  <label className="text-sm font-medium">Width</label>
                  <Input type="number" value={cropData.width} onChange={(e) => setCropData({...cropData, width: parseInt(e.target.value) || 1})} />
                </div>
                <div>
                  <label className="text-sm font-medium">Height</label>
                  <Input type="number" value={cropData.height} onChange={(e) => setCropData({...cropData, height: parseInt(e.target.value) || 1})} />
                </div>
              </div>

              <Button onClick={cropImage} className="w-full">
                <Crop className="w-4 h-4 mr-2" />
                Crop Image
              </Button>

              <img src={image} alt="Original" className="w-full rounded border" />
              
              {croppedImage && (
                <div className="space-y-4">
                  <img src={croppedImage} alt="Cropped" className="w-full rounded border" />
                  <Button onClick={downloadImage} className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download Cropped Image
                  </Button>
                </div>
              )}
            </>
          )}
          <canvas ref={canvasRef} className="hidden" />
        </div>
      </Card>
    </ToolLayout>
  );
}
