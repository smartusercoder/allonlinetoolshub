import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Upload, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PDFDocument } from "pdf-lib";
import { UsageGuide } from "@/components/UsageGuide";

const PdfMerge = () => {
  const [files, setFiles] = useState<File[]>([]);
  const { toast } = useToast();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(e.target.files || []);
    setFiles(prev => [...prev, ...uploadedFiles]);
  };

  const mergePdfs = async () => {
    if (files.length < 2) {
      toast({
        title: "Error",
        description: "Please upload at least 2 PDF files",
        variant: "destructive",
      });
      return;
    }

    try {
      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfFile = await mergedPdf.save();
      const blob = new Blob([new Uint8Array(mergedPdfFile)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "merged.pdf";
      link.click();
      URL.revokeObjectURL(url);

      toast({
        title: "Success",
        description: `Merged ${files.length} PDF files`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to merge PDFs",
        variant: "destructive",
      });
    }
  };

  return (
    <ToolLayout
      title="Merge PDFs"
      description="Combine multiple PDF files into one"
      keywords={["merge pdf", "combine pdf", "join pdf files", "pdf combiner"]}
      category="PDFTools"
      howToSteps={[
        {
          name: "Select PDF Files",
          text: "Click 'Upload PDFs' button and select multiple PDF files you want to merge. You can select as many PDF documents as needed from your device."
        },
        {
          name: "Review File Order",
          text: "Check the list of uploaded files. They will be merged in the order they appear in the list. Make sure the sequence matches your desired output."
        },
        {
          name: "Merge PDFs",
          text: "Click the 'Merge PDFs' button to combine all selected files into a single PDF document. The tool processes all pages from each file in sequence."
        },
        {
          name: "Download Merged PDF",
          text: "Once processing is complete, the merged PDF will automatically download to your device as 'merged.pdf'. All pages from your selected PDFs are now in one document."
        }
      ]}
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Click \"Upload PDFs\" and select 2 or more PDF files",
            "Files will be merged in the order they appear",
            "Review the list of uploaded files",
            "Click \"Merge PDFs\" to combine them",
            "The merged PDF will download automatically"
          ]}
          tips={[
            "You can upload multiple files at once",
            "PDFs are combined in upload order",
            "Great for combining reports, contracts, or documents",
            "All pages from each PDF are included",
            "Processing happens locally - your files stay private"
          ]}
        />
      </div>
      <Card className="p-6 space-y-4">
        <div>
          <label htmlFor="pdf-upload" className="cursor-pointer">
            <Button asChild>
              <span>
                <Upload className="mr-2 h-4 w-4" />
                Upload PDFs
              </span>
            </Button>
          </label>
          <input
            id="pdf-upload"
            type="file"
            accept="application/pdf"
            multiple
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        {files.length > 0 && (
          <div className="space-y-2">
            <Label>Uploaded Files: {files.length}</Label>
            <div className="space-y-1">
              {files.map((file, index) => (
                <div key={index} className="text-sm p-2 bg-muted rounded">
                  {index + 1}. {file.name}
                </div>
              ))}
            </div>
          </div>
        )}

        <Button onClick={mergePdfs} disabled={files.length < 2}>
          <Download className="mr-2 h-4 w-4" />
          Merge PDFs
        </Button>
      </Card>
    </ToolLayout>
  );
};

export default PdfMerge;
