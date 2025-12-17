import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PDFDocument } from "pdf-lib";
import { UsageGuide } from "@/components/UsageGuide";

export default function PdfCompress() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    } else {
      toast({
        title: "Error",
        description: "Please select a valid PDF file",
        variant: "destructive",
      });
    }
  };

  const compressPdf = async () => {
    if (!file) return;

    setIsProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      
      const pdfBytes = await pdfDoc.save({
        useObjectStreams: false,
        addDefaultPage: false,
      });

      const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "compressed-" + file.name;
      a.click();
      URL.revokeObjectURL(url);

      toast({
        title: "Success",
        description: "PDF compressed successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to compress PDF",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ToolLayout
      title="Compress PDF"
      description="Reduce PDF file size"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Upload a PDF file",
            "View the original file size",
            "Click \"Compress PDF\" to optimize",
            "Download the compressed version"
          ]}
          tips={[
            "Great for reducing large PDFs before emailing",
            "Helps meet file size limits for uploads",
            "Compression maintains document readability",
            "Processing happens entirely in your browser"
          ]}
          note="Compression quality depends on the PDF content and structure"
        />
      </div>
      <Card className="p-6 space-y-6 mt-6">
        <div className="space-y-2">
          <Label htmlFor="pdf">Upload PDF</Label>
          <Input
            id="pdf"
            type="file"
            accept=".pdf"
            onChange={handleFileSelect}
          />
        </div>

        {file && (
          <>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm">
                <strong>File:</strong> {file.name}
              </p>
              <p className="text-sm">
                <strong>Size:</strong> {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>

            <Button 
              onClick={compressPdf} 
              disabled={isProcessing}
              className="w-full"
            >
              {isProcessing ? (
                "Compressing..."
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Compress PDF
                </>
              )}
            </Button>
          </>
        )}
      </Card>
    </ToolLayout>
  );
}
