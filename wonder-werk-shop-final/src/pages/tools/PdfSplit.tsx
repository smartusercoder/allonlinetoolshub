import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PDFDocument } from "pdf-lib";
import { UsageGuide } from "@/components/UsageGuide";

const PdfSplit = () => {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [ranges, setRanges] = useState("");
  const { toast } = useToast();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;

    setFile(uploadedFile);
    const arrayBuffer = await uploadedFile.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    setPageCount(pdf.getPageCount());
  };

  const splitPdf = async () => {
    if (!file) return;

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      
      // Parse ranges (e.g., "1-3,5,7-9")
      const rangeGroups = ranges.split(',').map(r => r.trim());
      
      for (let i = 0; i < rangeGroups.length; i++) {
        const newPdf = await PDFDocument.create();
        const range = rangeGroups[i];
        
        let pages: number[] = [];
        if (range.includes('-')) {
          const [start, end] = range.split('-').map(Number);
          pages = Array.from({ length: end - start + 1 }, (_, i) => start + i - 1);
        } else {
          pages = [Number(range) - 1];
        }
        
        const copiedPages = await newPdf.copyPages(pdf, pages);
        copiedPages.forEach(page => newPdf.addPage(page));
        
        const pdfBytes = await newPdf.save();
        const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `split-${i + 1}.pdf`;
        link.click();
        URL.revokeObjectURL(url);
      }

      toast({
        title: "Success",
        description: "PDF split successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to split PDF",
        variant: "destructive",
      });
    }
  };

  return (
    <ToolLayout
      title="Split PDF"
      description="Split PDF into multiple files"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Upload a PDF file",
            "Enter page ranges (e.g., \"1-3,5,7-9\")",
            "Click \"Split PDF\" to create separate files",
            "Each range downloads as its own PDF file"
          ]}
          tips={[
            "Use hyphens for ranges: \"1-5\" means pages 1 through 5",
            "Use commas to separate: \"1-3,5,7-9\" creates multiple PDFs",
            "Single pages work too: \"1,3,5\" extracts individual pages",
            "Perfect for extracting specific chapters or sections"
          ]}
          example='"1-3,7,10-12" creates PDFs with pages 1-3, page 7, and pages 10-12'
        />
      </div>
      <Card className="p-6 space-y-4 mt-6">
        <div>
          <label htmlFor="pdf-upload" className="cursor-pointer">
            <Button asChild>
              <span>
                <Upload className="mr-2 h-4 w-4" />
                Upload PDF
              </span>
            </Button>
          </label>
          <input
            id="pdf-upload"
            type="file"
            accept="application/pdf"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        {pageCount > 0 && (
          <div className="space-y-2">
            <p className="text-sm">Total Pages: {pageCount}</p>
            <Label htmlFor="ranges">Page Ranges (e.g., 1-3,5,7-9)</Label>
            <Input
              id="ranges"
              value={ranges}
              onChange={(e) => setRanges(e.target.value)}
              placeholder="1-3,5,7-9"
            />
          </div>
        )}

        <Button onClick={splitPdf} disabled={!file || !ranges}>
          <Download className="mr-2 h-4 w-4" />
          Split PDF
        </Button>
      </Card>
    </ToolLayout>
  );
};

export default PdfSplit;
