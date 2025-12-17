import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ValidatedFileUpload } from "@/components/form/ValidatedFileUpload";
import { toast } from "sonner";
import { Download, Loader2 } from "lucide-react";
import { pipeline, env } from '@huggingface/transformers';
import { useToolState, validateFile } from "@/hooks/useToolState";
import { ProcessingOverlay } from "@/components/LoadingState";

// Configure transformers.js
env.allowLocalModels = false;
env.useBrowserCache = false;

const MAX_IMAGE_DIMENSION = 1024;

function resizeImageIfNeeded(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, image: HTMLImageElement) {
  let width = image.naturalWidth;
  let height = image.naturalHeight;

  if (width > MAX_IMAGE_DIMENSION || height > MAX_IMAGE_DIMENSION) {
    if (width > height) {
      height = Math.round((height * MAX_IMAGE_DIMENSION) / width);
      width = MAX_IMAGE_DIMENSION;
    } else {
      width = Math.round((width * MAX_IMAGE_DIMENSION) / height);
      height = MAX_IMAGE_DIMENSION;
    }

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(image, 0, 0, width, height);
    return true;
  }

  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(image, 0, 0);
  return false;
}

export default function ImageTransparent() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [resultUrl, setResultUrl] = useState<string>("");
  const { isProcessing, executeWithErrorHandling } = useToolState();

  const handleFileChange = (file: File | null) => {
    if (file && !validateFile(file, { acceptedTypes: ["image/*"], maxSizeMB: 10 })) {
      return;
    }
    setImageFile(file);
    setResultUrl("");
  };

  const removeBackground = async () => {
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

      const segmenter = await pipeline('image-segmentation', 'Xenova/segformer-b0-finetuned-ade-512-512', {
        device: 'webgpu',
      });
      
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) throw new Error('Could not get canvas context');
      
      const wasResized = resizeImageIfNeeded(canvas, ctx, img);
      
      const imageData = canvas.toDataURL('image/jpeg', 0.8);
      
      toast.info("Processing image... Please wait");
      const result = await segmenter(imageData);
      
      if (!result || !Array.isArray(result) || result.length === 0 || !result[0].mask) {
        throw new Error('Invalid segmentation result');
      }
      
      const outputCanvas = document.createElement('canvas');
      outputCanvas.width = canvas.width;
      outputCanvas.height = canvas.height;
      const outputCtx = outputCanvas.getContext('2d');
      
      if (!outputCtx) throw new Error('Could not get output canvas context');
      
      outputCtx.drawImage(canvas, 0, 0);
      
      const outputImageData = outputCtx.getImageData(0, 0, outputCanvas.width, outputCanvas.height);
      const data = outputImageData.data;
      
      for (let i = 0; i < result[0].mask.data.length; i++) {
        const alpha = Math.round((1 - result[0].mask.data[i]) * 255);
        data[i * 4 + 3] = alpha;
      }
      
      outputCtx.putImageData(outputImageData, 0, 0);
      
      outputCanvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          setResultUrl(url);
        }
      }, 'image/png', 1.0);
      
      return true;
    }, {
      loadingMessage: "Loading AI model and processing image...",
      successMessage: "Background removed successfully!",
      errorMessage: "Failed to remove background. Try a different image or smaller size."
    });
  };

  const downloadImage = () => {
    if (!resultUrl) return;
    const a = document.createElement('a');
    a.href = resultUrl;
    a.download = 'transparent-background.png';
    a.click();
  };

  return (
    <ToolLayout
      title="Transparent Background"
      description="Remove background and make it transparent using AI"
    >
      <Card className="p-6 relative">
        <ProcessingOverlay isProcessing={isProcessing} message="Processing with AI..." />
        <div className="space-y-6">
          <ValidatedFileUpload
            label="Upload Image"
            accept="image/*"
            onFileSelect={handleFileChange}
            helperText="AI will automatically remove the background"
          />

          <Button 
            onClick={removeBackground} 
            disabled={!imageFile || isProcessing}
            className="w-full"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              "Remove Background"
            )}
          </Button>

          {resultUrl && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {imageFile && (
                  <div>
                    <p className="text-sm font-medium mb-2">Original</p>
                    <div className="border rounded-lg p-4 bg-white">
                      <img 
                        src={URL.createObjectURL(imageFile)} 
                        alt="Original" 
                        className="max-w-full h-auto" 
                      />
                    </div>
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium mb-2">Transparent</p>
                  <div className="border rounded-lg p-4 bg-checkered">
                    <img src={resultUrl} alt="Transparent" className="max-w-full h-auto" />
                  </div>
                </div>
              </div>
              
              <Button onClick={downloadImage} className="w-full gap-2">
                <Download className="w-4 h-4" />
                Download PNG with Transparency
              </Button>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
}
