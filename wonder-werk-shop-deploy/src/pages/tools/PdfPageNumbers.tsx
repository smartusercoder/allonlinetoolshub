import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Upload, Download, Hash } from "lucide-react";
import { toast } from "sonner";
import { PDFDocument, rgb } from "pdf-lib";

export default function PdfPageNumbers() {
  const [file, setFile] = useState<File | null>(null);
  const [position, setPosition] = useState<string>("bottom-center");
  const [fontSize, setFontSize] = useState([12]);
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

  const addPageNumbers = async () => {
    if (!file) {
      toast.error("Please select a PDF file");
      return;
    }

    setIsProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();

      pages.forEach((page, index) => {
        const { width, height } = page.getSize();
        const pageNumber = `${index + 1}`;
        
        let x = width / 2 - 10;
        let y = 20;

        if (position === "top-center") {
          y = height - 30;
        } else if (position === "top-left") {
          x = 30;
          y = height - 30;
        } else if (position === "top-right") {
          x = width - 50;
          y = height - 30;
        } else if (position === "bottom-left") {
          x = 30;
        } else if (position === "bottom-right") {
          x = width - 50;
        }

        page.drawText(pageNumber, {
          x,
          y,
          size: fontSize[0],
          color: rgb(0, 0, 0),
        });
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `numbered-${file.name}`;
      a.click();
      URL.revokeObjectURL(url);

      toast.success("Page numbers added successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add page numbers");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ToolLayout title="Add Page Numbers to PDF" description="Add page numbers to your PDF document">
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
                <Label>Position</Label>
                <Select value={position} onValueChange={setPosition}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bottom-center">Bottom Center</SelectItem>
                    <SelectItem value="bottom-left">Bottom Left</SelectItem>
                    <SelectItem value="bottom-right">Bottom Right</SelectItem>
                    <SelectItem value="top-center">Top Center</SelectItem>
                    <SelectItem value="top-left">Top Left</SelectItem>
                    <SelectItem value="top-right">Top Right</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Font Size: {fontSize[0]}px</Label>
                <Slider
                  value={fontSize}
                  onValueChange={setFontSize}
                  min={8}
                  max={24}
                  step={1}
                />
              </div>
            </div>

            <Button onClick={addPageNumbers} disabled={isProcessing} className="w-full">
              <Hash className="mr-2 h-4 w-4" />
              {isProcessing ? "Adding Numbers..." : "Add Page Numbers"}
            </Button>
          </>
        )}
      </Card>
    </ToolLayout>
  );
}
