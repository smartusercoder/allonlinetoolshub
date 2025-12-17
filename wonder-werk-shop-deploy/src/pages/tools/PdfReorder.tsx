import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Download, ArrowUpDown } from "lucide-react";
import { toast } from "sonner";
import { PDFDocument } from "pdf-lib";

export default function PdfReorder() {
  const [file, setFile] = useState<File | null>(null);
  const [newOrder, setNewOrder] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile?.type === "application/pdf") {
      setFile(selectedFile);
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pageCount = pdfDoc.getPageCount();
      setTotalPages(pageCount);
      setNewOrder(Array.from({ length: pageCount }, (_, i) => i + 1).join(", "));
      toast.success(`PDF loaded - ${pageCount} pages`);
    } else {
      toast.error("Please select a valid PDF file");
    }
  };

  const reorderPages = async () => {
    if (!file) {
      toast.error("Please select a PDF file");
      return;
    }

    if (!newOrder.trim()) {
      toast.error("Please specify the new page order");
      return;
    }

    setIsProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const newPdf = await PDFDocument.create();
      
      const pageNumbers = newOrder.split(",").map(n => parseInt(n.trim()) - 1);
      
      if (pageNumbers.length !== totalPages) {
        toast.error(`Please specify all ${totalPages} pages`);
        setIsProcessing(false);
        return;
      }

      const copiedPages = await newPdf.copyPages(pdfDoc, pageNumbers);
      copiedPages.forEach(page => newPdf.addPage(page));

      const pdfBytes = await newPdf.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `reordered-${file.name}`;
      a.click();
      URL.revokeObjectURL(url);

      toast.success("Pages reordered successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to reorder pages. Check page numbers are valid.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ToolLayout title="Reorder PDF Pages" description="Rearrange the order of pages in your PDF">
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
              <Label htmlFor="order">New Page Order</Label>
              <Input
                id="order"
                value={newOrder}
                onChange={(e) => setNewOrder(e.target.value)}
                placeholder="e.g., 3, 1, 2, 4"
              />
              <p className="text-xs text-muted-foreground">
                Enter all page numbers in the desired order, separated by commas
              </p>
            </div>

            <Button onClick={reorderPages} disabled={isProcessing} className="w-full">
              <ArrowUpDown className="mr-2 h-4 w-4" />
              {isProcessing ? "Reordering..." : "Reorder Pages"}
            </Button>
          </>
        )}
      </Card>
    </ToolLayout>
  );
}
