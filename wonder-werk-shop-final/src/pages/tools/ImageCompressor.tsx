import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { FileButton } from "@/components/ui/file-button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Upload, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { compressImage } from "@/utils/imageProcessing";
import { UsageGuide } from "@/components/UsageGuide";
import { toolFAQs } from "@/data/faqData";

const ImageCompressor = () => {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [quality, setQuality] = useState([80]);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const { toast } = useToast();

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

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

    setOriginalFile(file);
    setOriginalSize(file.size);
    await processImage(file, quality[0] / 100);
  };

  const processImage = async (file: File, qualityValue: number) => {
    try {
      const compressed = await compressImage(file, qualityValue);
      const url = URL.createObjectURL(compressed);
      setCompressedImage(url);
      setCompressedSize(compressed.size);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to compress image",
        variant: "destructive",
      });
    }
  };

  const handleQualityChange = (value: number[]) => {
    setQuality(value);
    if (originalFile) {
      processImage(originalFile, value[0] / 100);
    }
  };

  const handleDownload = () => {
    if (!compressedImage) return;
    
    const link = document.createElement('a');
    link.href = compressedImage;
    link.download = 'compressed-image.jpg';
    link.click();
  };

  const savingsPercent = originalSize > 0 
    ? Math.round(((originalSize - compressedSize) / originalSize) * 100)
    : 0;

  return (
    <ToolLayout
      title="Image Compressor"
      description="Reduce image file size while maintaining quality"
      keywords={["compress image", "reduce image size", "image optimization", "shrink photo"]}
      category="ImageTools"
      howToSteps={[
        {
          name: "Upload Your Image",
          text: "Click the 'Choose Image File' button and select the image you want to compress from your device. Supported formats include JPG, PNG, and WebP files up to 10MB."
        },
        {
          name: "Adjust Compression Quality",
          text: "Use the quality slider to set your desired compression level. Lower values (50-70%) create smaller files, while higher values (80-90%) maintain better image quality. 80% is recommended for most uses."
        },
        {
          name: "Preview Results",
          text: "View the compressed image preview and check the file size comparison. The tool shows original size, compressed size, and percentage saved to help you make the best decision."
        },
        {
          name: "Download Compressed Image",
          text: "Once satisfied with the quality and file size, click the 'Download' button to save the compressed image to your device."
        }
      ]}
      faqs={toolFAQs["image-compressor"]}
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Click \"Choose Image File\" or drag and drop an image",
            "Adjust the quality slider to control compression level",
            "Preview the compressed image and check the file size reduction",
            "Click \"Download\" to save the compressed image"
          ]}
          tips={[
            "Lower quality = smaller file size but may reduce image clarity",
            "80% quality is usually a good balance between size and quality",
            "Supported formats: JPG, PNG, WebP"
          ]}
          note="Images are processed entirely in your browser - no uploads to servers!"
        />

        <div className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg p-12 bg-muted/30">
          <Upload className="w-12 h-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Upload an image</h3>
          <p className="text-sm text-muted-foreground mb-4">PNG, JPG up to 10MB</p>
          <FileButton
            accept="image/*"
            onFileSelect={(file) => file && handleFileSelect({ target: { files: [file] } } as any)}
            buttonText="Choose Image File"
            buttonVariant="default"
          />
        </div>

        {originalFile && (
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium">Compression Quality: {quality[0]}%</label>
              </div>
              <Slider
                value={quality}
                onValueChange={handleQualityChange}
                min={10}
                max={100}
                step={5}
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Original Size</p>
                <p className="text-lg font-semibold">{formatFileSize(originalSize)}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Compressed Size</p>
                <p className="text-lg font-semibold text-primary">{formatFileSize(compressedSize)}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Saved</p>
                <p className="text-lg font-semibold text-green-600">{savingsPercent}%</p>
              </div>
            </div>

            {compressedImage && (
              <div>
                <h4 className="font-semibold mb-2">Preview</h4>
                <img src={compressedImage} alt="Compressed" className="w-full rounded-lg border mb-4" />
                <Button onClick={handleDownload} className="w-full" variant="hero">
                  <Download className="w-4 h-4 mr-2" />
                  Download Compressed Image
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default ImageCompressor;
