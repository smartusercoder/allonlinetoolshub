import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ImageMetadata() {
  const [image, setImage] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<any>(null);
  const [fileName, setFileName] = useState("");
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setImage(result);
        
        const img = new Image();
        img.onload = () => {
          setMetadata({
            width: img.width,
            height: img.height,
            size: file.size,
            type: file.type,
            lastModified: new Date(file.lastModified).toLocaleString()
          });
        };
        img.src = result;
      };
      reader.readAsDataURL(file);
    }
  };

  const removeMetadata = () => {
    if (!image) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'cleaned-' + fileName;
            a.click();
            URL.revokeObjectURL(url);
            
            toast({
              title: "Success",
              description: "Image saved without metadata",
            });
          }
        });
      }
    };
    
    img.src = image;
  };

  return (
    <ToolLayout
      title="Image Metadata Viewer"
      description="View and remove EXIF data from images"
    >
      <Card className="p-6 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="image">Upload Image</Label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>

        {metadata && (
          <>
            <div className="space-y-2">
              <Label>Image Information</Label>
              <div className="bg-muted p-4 rounded-lg space-y-2 font-mono text-sm">
                <div><strong>Dimensions:</strong> {metadata.width} × {metadata.height}</div>
                <div><strong>File Size:</strong> {(metadata.size / 1024).toFixed(2)} KB</div>
                <div><strong>Format:</strong> {metadata.type}</div>
                <div><strong>Last Modified:</strong> {metadata.lastModified}</div>
              </div>
            </div>

            {image && (
              <div className="space-y-2">
                <Label>Preview</Label>
                <div className="border rounded-lg p-4 bg-muted flex justify-center">
                  <img 
                    src={image} 
                    alt="Preview" 
                    className="max-w-full h-auto"
                    style={{ maxHeight: '400px' }}
                  />
                </div>
              </div>
            )}

            <Button onClick={removeMetadata} className="w-full">
              <Trash2 className="mr-2 h-4 w-4" />
              Remove Metadata & Download
            </Button>
          </>
        )}
      </Card>
    </ToolLayout>
  );
}
