import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Download, FileText } from "lucide-react";
import { toast } from "sonner";
import { PDFDocument } from "pdf-lib";

export default function PdfExtractPages() {
  const [file, setFile] = useState<File | null>(null);
  const [pagesToExtract, setPagesToExtract] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile?.type === "application/pdf") {
      setFile(selectedFile);
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      setTotalPages(pdfDoc.getPageCount());
      toast.success(`PDF loaded - ${pdfDoc.getPageCount()} pages`);
    } else {
      toast.error("Please select a valid PDF file");
    }
  };

  const extractPages = async () => {
    if (!file) {
      toast.error("Please select a PDF file");
      return;
    }

    if (!pagesToExtract.trim()) {
      toast.error("Please specify pages to extract");
      return;
    }

    setIsProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const newPdf = await PDFDocument.create();
      
      const pageIndices = new Set<number>();
      const ranges = pagesToExtract.split(",").map(r => r.trim());
      
      for (const range of ranges) {
        if (range.includes("-")) {
          const [start, end] = range.split("-").map(n => parseInt(n.trim()) - 1);
          for (let i = start; i <= end && i < totalPages; i++) {
            pageIndices.add(i);
          }
        } else {
          const pageNum = parseInt(range) - 1;
          if (pageNum >= 0 && pageNum < totalPages) {
            pageIndices.add(pageNum);
          }
        }
      }

      const sortedIndices = Array.from(pageIndices).sort((a, b) => a - b);
      const copiedPages = await newPdf.copyPages(pdfDoc, sortedIndices);
      copiedPages.forEach(page => newPdf.addPage(page));

      const pdfBytes = await newPdf.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `extracted-pages-${file.name}`;
      a.click();
      URL.revokeObjectURL(url);

      toast.success(`Extracted ${sortedIndices.length} pages successfully`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to extract pages");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ToolLayout title="Extract PDF Pages" description="Extract specific pages into a new PDF">
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
            {file && (
              <p className="text-sm text-primary mt-2">
                {file.name} ({totalPages} pages)
              </p>
            )}
          </label>
        </div>

        {file && (
          <>
            <div className="space-y-2">
              <Label htmlFor="pages">Pages to Extract</Label>
              <Input
                id="pages"
                value={pagesToExtract}
                onChange={(e) => setPagesToExtract(e.target.value)}
                placeholder="e.g., 1-3, 5, 7-9"
              />
              <p className="text-xs text-muted-foreground">
                Enter page numbers or ranges (e.g., "1-3, 5, 7-9")
              </p>
            </div>

            <Button onClick={extractPages} disabled={isProcessing} className="w-full">
              <FileText className="mr-2 h-4 w-4" />
              {isProcessing ? "Extracting..." : "Extract Pages"}
            </Button>
          </>
        )}
      </Card>
    </ToolLayout>
  );
}
