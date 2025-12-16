import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Upload, Download, Droplets } from "lucide-react";
import { toast } from "sonner";
import { PDFDocument, rgb, degrees } from "pdf-lib";

export default function PdfWatermark() {
  const [file, setFile] = useState<File | null>(null);
  const [watermarkText, setWatermarkText] = useState("CONFIDENTIAL");
  const [opacity, setOpacity] = useState([0.3]);
  const [fontSize, setFontSize] = useState([48]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile?.type === "application/pdf") {
      setFile(selectedFile);
      toast.success("PDF loaded successfully");
    } else {
      toast.error("Please select a valid PDF file");
    }
  };

  const addWatermark = async () => {
    if (!file) {
      toast.error("Please select a PDF file");
      return;
    }

    if (!watermarkText.trim()) {
      toast.error("Please enter watermark text");
      return;
    }

    setIsProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();

      for (const page of pages) {
        const { width, height } = page.getSize();
        const x = width / 2 - (watermarkText.length * fontSize[0]) / 4;
        const y = height / 2;
        page.drawText(watermarkText, {
          x,
          y,
          size: fontSize[0],
          color: rgb(0.5, 0.5, 0.5),
          opacity: opacity[0],
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `watermarked-${file.name}`;
      a.click();
      URL.revokeObjectURL(url);

      toast.success("Watermark added successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add watermark");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ToolLayout title="PDF Watermark" description="Add text watermark to your PDF">
      <Card className="p-6 space-y-6">
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileSelect}
            className="hidden"
            id="pdf-upload"
          />
          <label htmlFor="pdf-upload" className="cursor-pointer">
            <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-medium mb-2">Click to upload PDF</p>
            {file && <p className="text-sm text-primary mt-2">{file.name}</p>}
          </label>
        </div>

        {file && (
          <>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="watermark">Watermark Text</Label>
                <Input
                  id="watermark"
                  value={watermarkText}
                  onChange={(e) => setWatermarkText(e.target.value)}
                  placeholder="Enter watermark text"
                />
              </div>

              <div className="space-y-2">
                <Label>Opacity: {opacity[0].toFixed(2)}</Label>
                <Slider
                  value={opacity}
                  onValueChange={setOpacity}
                  min={0.1}
                  max={1}
                  step={0.05}
                />
              </div>

              <div className="space-y-2">
                <Label>Font Size: {fontSize[0]}px</Label>
                <Slider
                  value={fontSize}
                  onValueChange={setFontSize}
                  min={12}
                  max={100}
                  step={1}
                />
              </div>
            </div>

            <Button onClick={addWatermark} disabled={isProcessing} className="w-full">
              <Droplets className="mr-2 h-4 w-4" />
              {isProcessing ? "Adding Watermark..." : "Add Watermark"}
            </Button>
          </>
        )}
      </Card>
    </ToolLayout>
  );
}
