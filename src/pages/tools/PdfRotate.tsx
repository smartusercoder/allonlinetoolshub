import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Download, RotateCw } from "lucide-react";
import { toast } from "sonner";
import { PDFDocument, degrees } from "pdf-lib";

export default function PdfRotate() {
  const [file, setFile] = useState<File | null>(null);
  const [rotation, setRotation] = useState<number>(90);
  const [pageRange, setPageRange] = useState<string>("all");
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

  const rotatePdf = async () => {
    if (!file) {
      toast.error("Please select a PDF file");
      return;
    }

    setIsProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();

      let pagesToRotate: number[] = [];
      if (pageRange === "all") {
        pagesToRotate = pages.map((_, i) => i);
      } else {
        const ranges = pageRange.split(",").map(r => r.trim());
        for (const range of ranges) {
          if (range.includes("-")) {
            const [start, end] = range.split("-").map(n => parseInt(n.trim()) - 1);
            for (let i = start; i <= end && i < pages.length; i++) {
              pagesToRotate.push(i);
            }
          } else {
            const pageNum = parseInt(range) - 1;
            if (pageNum >= 0 && pageNum < pages.length) {
              pagesToRotate.push(pageNum);
            }
          }
        }
      }

      pagesToRotate.forEach(i => {
        pages[i].setRotation(degrees(rotation));
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `rotated-${file.name}`;
      a.click();
      URL.revokeObjectURL(url);

      toast.success("PDF rotated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to rotate PDF");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ToolLayout title="Rotate PDF Pages" description="Rotate PDF pages by 90, 180, or 270 degrees">
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
                <Label>Rotation Angle</Label>
                <Select value={rotation.toString()} onValueChange={(v) => setRotation(parseInt(v))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="90">90° Clockwise</SelectItem>
                    <SelectItem value="180">180°</SelectItem>
                    <SelectItem value="270">270° Clockwise (90° Counter-clockwise)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pages">Pages to Rotate</Label>
                <Input
                  id="pages"
                  value={pageRange}
                  onChange={(e) => setPageRange(e.target.value)}
                  placeholder="all, 1-3, 5, 7-9"
                />
                <p className="text-xs text-muted-foreground">
                  Enter "all" or specific pages (e.g., "1-3, 5, 7-9")
                </p>
              </div>
            </div>

            <Button onClick={rotatePdf} disabled={isProcessing} className="w-full">
              <RotateCw className="mr-2 h-4 w-4" />
              {isProcessing ? "Rotating..." : "Rotate PDF"}
            </Button>
          </>
        )}
      </Card>
    </ToolLayout>
  );
}
