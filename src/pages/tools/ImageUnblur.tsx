import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ValidatedFileUpload } from "@/components/form/ValidatedFileUpload";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Download, Loader2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useToolState, validateFile } from "@/hooks/useToolState";
import { ProcessingOverlay } from "@/components/LoadingState";

export default function ImageUnblur() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [sharpness, setSharpness] = useState(50);
  const [resultUrl, setResultUrl] = useState<string>("");
  const { isProcessing, executeWithErrorHandling } = useToolState();

  const handleFileChange = (file: File | null) => {
    if (file && !validateFile(file, { acceptedTypes: ["image/*"], maxSizeMB: 10 })) {
      return;
    }
    setImageFile(file);
    setResultUrl("");
  };

  const sharpenImage = async () => {
    if (!imageFile) {
      toast.error("Please upload an image");
      return;
    }

    await executeWithErrorHandling(async () => {
      const img = new Image();
      img.src = URL.createObjectURL(imageFile);
      
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Apply unsharp mask filter
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d')!;
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      tempCtx.drawImage(canvas, 0, 0);

      // Simple sharpening using convolution
      const weight = sharpness / 50; // Normalize to 0-1 range
      const weights = [
        0, -weight, 0,
        -weight, 1 + 4 * weight, -weight,
        0, -weight, 0
      ];

      const side = Math.round(Math.sqrt(weights.length));
      const halfSide = Math.floor(side / 2);

      const src = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const dst = ctx.createImageData(canvas.width, canvas.height);

      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          const dstOff = (y * canvas.width + x) * 4;
          let r = 0, g = 0, b = 0;

          for (let cy = 0; cy < side; cy++) {
            for (let cx = 0; cx < side; cx++) {
              const scy = y + cy - halfSide;
              const scx = x + cx - halfSide;

              if (scy >= 0 && scy < canvas.height && scx >= 0 && scx < canvas.width) {
                const srcOff = (scy * canvas.width + scx) * 4;
                const wt = weights[cy * side + cx];
                r += src.data[srcOff] * wt;
                g += src.data[srcOff + 1] * wt;
                b += src.data[srcOff + 2] * wt;
              }
            }
          }

          dst.data[dstOff] = Math.min(255, Math.max(0, r));
          dst.data[dstOff + 1] = Math.min(255, Math.max(0, g));
          dst.data[dstOff + 2] = Math.min(255, Math.max(0, b));
          dst.data[dstOff + 3] = src.data[dstOff + 3];
        }
      }

      ctx.putImageData(dst, 0, 0);

      canvas.toBlob(blob => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          setResultUrl(url);
        }
      }, 'image/png');
    }, {
      successMessage: "Image sharpened successfully!",
      errorMessage: "Failed to sharpen image. Please try a different file."
    });
  };

  const downloadImage = () => {
    if (!resultUrl) return;
    const a = document.createElement('a');
    a.href = resultUrl;
    a.download = 'sharpened-image.png';
    a.click();
  };

  return (
    <ToolLayout
      title="Unblur Image"
      description="Sharpen and enhance blurry images"
    >
      <Card className="p-6 relative">
        <ProcessingOverlay isProcessing={isProcessing} message="Sharpening image..." />
        <div className="space-y-6">
          <ValidatedFileUpload
            label="Upload Image"
            accept="image/*"
            onFileSelect={handleFileChange}
            helperText="Select a blurry image to sharpen"
          />

          <div>
            <Label>Sharpness: {sharpness}%</Label>
            <Slider
              value={[sharpness]}
              onValueChange={(v) => setSharpness(v[0])}
              min={0}
              max={100}
              step={1}
              className="mt-2"
            />
            <p className="text-sm text-muted-foreground mt-1">
              Higher values increase sharpening effect
            </p>
          </div>

          <Button 
            onClick={sharpenImage} 
            disabled={!imageFile || isProcessing}
            className="w-full"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sharpening...
              </>
            ) : (
              "Sharpen Image"
            )}
          </Button>

          {resultUrl && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {imageFile && (
                  <div>
                    <Label className="mb-2 block">Original</Label>
                    <div className="border rounded-lg p-4">
                      <img 
                        src={URL.createObjectURL(imageFile)} 
                        alt="Original" 
                        className="max-w-full h-auto" 
                      />
                    </div>
                  </div>
                )}
                <div>
                  <Label className="mb-2 block">Sharpened</Label>
                  <div className="border rounded-lg p-4">
                    <img src={resultUrl} alt="Sharpened" className="max-w-full h-auto" />
                  </div>
                </div>
              </div>
              
              <Button onClick={downloadImage} className="w-full gap-2">
                <Download className="w-4 h-4" />
                Download Sharpened Image
              </Button>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
}
