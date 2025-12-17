import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Download, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { removeBackground, loadImage } from "@/utils/imageProcessing";

const BackgroundRemover = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }

    setOriginalImage(URL.createObjectURL(file));
    setProcessedImage(null);

    setIsProcessing(true);
    try {
      const img = await loadImage(file);
      const resultBlob = await removeBackground(img);
      const resultUrl = URL.createObjectURL(resultBlob);
      setProcessedImage(resultUrl);
      
      toast({
        title: "Success!",
        description: "Background removed successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove background. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!processedImage) return;
    
    const link = document.createElement('a');
    link.href = processedImage;
    link.download = 'background-removed.png';
    link.click();
  };

  return (
    <ToolLayout
      title="Background Remover"
      description="Remove backgrounds from images using AI - all processing happens in your browser"
    >
      <div className="space-y-6">
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg p-12 bg-muted/30">
          <Upload className="w-12 h-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Upload an image</h3>
          <p className="text-sm text-muted-foreground mb-4">PNG, JPG up to 10MB</p>
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="max-w-xs"
            disabled={isProcessing}
          />
        </div>

        {isProcessing && (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
            <p className="text-sm text-muted-foreground">Processing your image...</p>
          </div>
        )}

        {(originalImage || processedImage) && !isProcessing && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {originalImage && (
              <div>
                <h4 className="font-semibold mb-2">Original</h4>
                <img src={originalImage} alt="Original" className="w-full rounded-lg border" />
              </div>
            )}
            {processedImage && (
              <div>
                <h4 className="font-semibold mb-2">Background Removed</h4>
                <div className="relative">
                  <div className="absolute inset-0 bg-[repeating-conic-gradient(#e5e7eb_0%_25%,white_0%_50%)] bg-[length:20px_20px] rounded-lg"></div>
                  <img src={processedImage} alt="Processed" className="relative w-full rounded-lg" />
                </div>
                <Button onClick={handleDownload} className="mt-4 w-full" variant="hero">
                  <Download className="w-4 h-4 mr-2" />
                  Download Image
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default BackgroundRemover;
