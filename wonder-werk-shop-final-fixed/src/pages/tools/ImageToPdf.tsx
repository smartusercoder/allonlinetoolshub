import { useState, useCallback } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Download, X, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { PDFDocument } from "pdf-lib";

export default function ImageToPdf() {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [isConverting, setIsConverting] = useState(false);

  const handleImageSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) {
      toast.error("Please select valid image files");
      return;
    }
    
    setSelectedImages(prev => [...prev, ...imageFiles]);
    toast.success(`${imageFiles.length} image(s) added`);
  }, []);

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    toast.info("Image removed");
  };

  const convertToPdf = async () => {
    if (selectedImages.length === 0) {
      toast.error("Please select at least one image");
      return;
    }

    setIsConverting(true);
    try {
      const pdfDoc = await PDFDocument.create();

      for (const imageFile of selectedImages) {
        const imageBytes = await imageFile.arrayBuffer();
        let image;

        if (imageFile.type === 'image/png') {
          image = await pdfDoc.embedPng(imageBytes);
        } else if (imageFile.type === 'image/jpeg' || imageFile.type === 'image/jpg') {
          image = await pdfDoc.embedJpg(imageBytes);
        } else {
          // Convert other formats to canvas then to PNG
          const img = await createImageBitmap(imageFile);
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0);
          const pngBlob = await new Promise<Blob>((resolve) => 
            canvas.toBlob((blob) => resolve(blob!), 'image/png')
          );
          const pngBytes = await pngBlob.arrayBuffer();
          image = await pdfDoc.embedPng(pngBytes);
        }

        const page = pdfDoc.addPage([image.width, image.height]);
        page.drawImage(image, {
          x: 0,
          y: 0,
          width: image.width,
          height: image.height,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `images-to-pdf-${Date.now()}.pdf`;
      link.click();
      URL.revokeObjectURL(url);

      toast.success("PDF created successfully!");
    } catch (error) {
      console.error('Error converting images to PDF:', error);
      toast.error("Failed to convert images to PDF");
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <ToolLayout 
      title="Image to PDF" 
      description="Convert multiple images into a single PDF document"
    >
      <Card className="p-6">
        <div className="space-y-6">
          {/* Upload Section */}
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageSelect}
              className="hidden"
              id="image-upload"
            />
            <label htmlFor="image-upload" className="cursor-pointer">
              <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg font-medium mb-2">Click to upload images</p>
              <p className="text-sm text-muted-foreground">
                Supports JPG, PNG, GIF, WEBP, BMP
              </p>
            </label>
          </div>

          {/* Selected Images */}
          {selectedImages.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-semibold">Selected Images ({selectedImages.length})</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {selectedImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={image.name}
                      className="w-full h-32 object-cover rounded-lg border"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <p className="text-xs mt-1 truncate">{image.name}</p>
                  </div>
                ))}
              </div>

              {/* Convert Button */}
              <div className="flex gap-3">
                <Button
                  onClick={convertToPdf}
                  disabled={isConverting}
                  className="flex-1"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {isConverting ? "Converting..." : "Convert to PDF"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setSelectedImages([])}
                >
                  Clear All
                </Button>
              </div>
            </div>
          )}

          {/* Info */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex items-start gap-2">
              <ImageIcon className="w-5 h-5 mt-0.5 text-primary" />
              <div className="text-sm space-y-1">
                <p className="font-medium">How it works:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Upload one or more images</li>
                  <li>Images will be converted in the order they appear</li>
                  <li>Each image becomes a separate page in the PDF</li>
                  <li>All processing happens in your browser - completely private</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </ToolLayout>
  );
}
