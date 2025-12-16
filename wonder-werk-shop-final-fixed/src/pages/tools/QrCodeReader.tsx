import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import jsQR from "jsqr";

const QrCodeReader = () => {
  const [result, setResult] = useState("");
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          setResult(code.data);
          toast({
            title: "QR Code Read Successfully",
            description: "The QR code has been decoded",
          });
        } else {
          toast({
            title: "No QR Code Found",
            description: "Could not find a QR code in the image",
            variant: "destructive",
          });
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
    <ToolLayout
      title="QR Code Reader"
      description="Read and decode QR codes from images"
    >
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="qr-upload" className="cursor-pointer">
              <Button asChild>
                <span>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload QR Code Image
                </span>
              </Button>
            </label>
            <input
              id="qr-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {result && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Decoded Result</label>
              <Textarea value={result} readOnly rows={10} />
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
};

export default QrCodeReader;
