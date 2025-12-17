import { useState, useCallback } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Download, FileImage } from "lucide-react";
import { toast } from "sonner";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";

// Configure PDF.js worker
GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

export default function PdfToImage() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [isConverting, setIsConverting] = useState(false);

  const handlePdfSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      toast.error("Please select a PDF file");
      return;
    }

    setPdfFile(file);
    setImages([]);
    toast.success("PDF loaded successfully");
  }, []);

  const convertToImages = async () => {
    if (!pdfFile) {
      toast.error("Please select a PDF file");
      return;
    }

    setIsConverting(true);
    try {
      const arrayBuffer = await pdfFile.arrayBuffer();
      const pdf = await getDocument({ data: arrayBuffer }).promise;

      const imageUrls: string[] = [];

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale: 2.0 });
        
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({
          canvasContext: context!,
          viewport: viewport,
        } as any).promise;

        const imageUrl = canvas.toDataURL('image/png');
        imageUrls.push(imageUrl);
      }

      setImages(imageUrls);
      toast.success(`Converted ${pdf.numPages} pages to images`);
    } catch (error) {
      console.error('Error converting PDF to images:', error);
      toast.error("Failed to convert PDF to images");
    } finally {
      setIsConverting(false);
    }
  };

  const downloadImage = (imageUrl: string, index: number) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `page-${index + 1}.png`;
    link.click();
  };

  const downloadAllImages = () => {
    images.forEach((imageUrl, index) => {
      setTimeout(() => downloadImage(imageUrl, index), index * 100);
    });
    toast.success("Downloading all images...");
  };

  return (
    <ToolLayout 
      title="PDF to Image" 
      description="Convert PDF pages to high-quality images"
    >
      <Card className="p-6">
        <div className="space-y-6">
          {/* Upload Section */}
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
            <input
              type="file"
              accept=".pdf,application/pdf"
              onChange={handlePdfSelect}
              className="hidden"
              id="pdf-upload"
            />
            <label htmlFor="pdf-upload" className="cursor-pointer">
              <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg font-medium mb-2">Click to upload PDF</p>
              {pdfFile && (
                <p className="text-sm text-primary mt-2">{pdfFile.name}</p>
              )}
            </label>
          </div>

          {/* Convert Button */}
          {pdfFile && images.length === 0 && (
            <Button
              onClick={convertToImages}
              disabled={isConverting}
              className="w-full"
            >
              {isConverting ? "Converting..." : "Convert to Images"}
            </Button>
          )}

          {/* Converted Images */}
          {images.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Converted Pages ({images.length})</h3>
                <Button onClick={downloadAllImages} variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download All
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {images.map((imageUrl, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <img
                      src={imageUrl}
                      alt={`Page ${index + 1}`}
                      className="w-full h-auto mb-3 rounded"
                    />
                    <Button
                      onClick={() => downloadImage(imageUrl, index)}
                      variant="outline"
                      size="sm"
                      className="w-full"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Page {index + 1}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Info */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex items-start gap-2">
              <FileImage className="w-5 h-5 mt-0.5 text-primary" />
              <div className="text-sm space-y-1">
                <p className="font-medium">Features:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>High-quality PNG conversion (2x scale)</li>
                  <li>Download individual pages or all at once</li>
                  <li>All processing happens locally - your files stay private</li>
                  <li>No file size limits</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </ToolLayout>
  );
}
