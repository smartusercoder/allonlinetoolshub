import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FileButton } from "@/components/ui/file-button";
import { Download, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export default function EditPdf() {
  const [pdfFile, setPdfFile] = useState<ArrayBuffer | null>(null);
  const [text, setText] = useState("");
  const [x, setX] = useState("50");
  const [y, setY] = useState("700");
  const [fontSize, setFontSize] = useState("12");
  const [page, setPage] = useState("1");
  const { toast } = useToast();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPdfFile(event.target?.result as ArrayBuffer);
      };
      reader.readAsArrayBuffer(file);
      toast({
        title: "Success",
        description: "PDF loaded successfully",
      });
    } else {
      toast({
        title: "Error",
        description: "Please select a valid PDF file",
        variant: "destructive",
      });
    }
  };

  const addTextToPdf = async () => {
    if (!pdfFile || !text) {
      toast({
        title: "Error",
        description: "Please upload a PDF and enter text",
        variant: "destructive",
      });
      return;
    }

    try {
      const pdfDoc = await PDFDocument.load(pdfFile);
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      
      const pageIndex = parseInt(page) - 1;
      const pages = pdfDoc.getPages();
      
      if (pageIndex < 0 || pageIndex >= pages.length) {
        toast({
          title: "Error",
          description: `Invalid page number. PDF has ${pages.length} page(s)`,
          variant: "destructive",
        });
        return;
      }

      const targetPage = pages[pageIndex];
      targetPage.drawText(text, {
        x: parseFloat(x),
        y: parseFloat(y),
        size: parseFloat(fontSize),
        font,
        color: rgb(0, 0, 0),
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "edited-pdf.pdf";
      a.click();
      URL.revokeObjectURL(url);

      toast({
        title: "Success",
        description: "PDF edited and downloaded",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to edit PDF",
        variant: "destructive",
      });
    }
  };

  return (
    <ToolLayout
      title="Edit PDF"
      description="Add text and annotations to PDF files"
    >
      <Card className="p-6 space-y-6">
        <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg mb-4">
          <h3 className="font-semibold text-sm mb-2">💡 How to use:</h3>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>Upload a PDF file you want to edit</li>
            <li>Enter the text you want to add</li>
            <li>Set the page number and position (X, Y coordinates)</li>
            <li>Adjust font size as needed</li>
            <li>Download the edited PDF</li>
          </ul>
        </div>

        <div className="space-y-2">
          <Label htmlFor="pdf">Upload PDF</Label>
          <div className="flex flex-col items-center gap-4 p-8 border-2 border-dashed rounded-lg bg-muted/30">
            <Upload className="w-10 h-10 text-muted-foreground" />
            <div className="text-center">
              <p className="text-sm font-medium mb-1">Choose a PDF file to edit</p>
              <p className="text-xs text-muted-foreground">PDF files only</p>
            </div>
            <FileButton
              accept=".pdf,application/pdf"
              onFileSelect={(file) => {
                if (file) {
                  const e = { target: { files: [file] } } as any;
                  handleFileUpload(e);
                }
              }}
              buttonText="Choose PDF File"
              buttonVariant="default"
            />
          </div>
        </div>

        {pdfFile && (
          <>
            <div className="space-y-2">
              <Label htmlFor="text">Text to Add</Label>
              <Textarea
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to add to PDF"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="page">Page Number</Label>
                <Input
                  id="page"
                  type="number"
                  value={page}
                  onChange={(e) => setPage(e.target.value)}
                  min="1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fontSize">Font Size</Label>
                <Input
                  id="fontSize"
                  type="number"
                  value={fontSize}
                  onChange={(e) => setFontSize(e.target.value)}
                  min="6"
                  max="72"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="x">X Position</Label>
                <Input
                  id="x"
                  type="number"
                  value={x}
                  onChange={(e) => setX(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="y">Y Position</Label>
                <Input
                  id="y"
                  type="number"
                  value={y}
                  onChange={(e) => setY(e.target.value)}
                />
              </div>
            </div>

            <div className="bg-muted p-4 rounded text-sm">
              <p className="font-semibold mb-2">Tip:</p>
              <p>• Y position starts from bottom (0) to top</p>
              <p>• X position starts from left (0) to right</p>
              <p>• Standard page is ~595px wide × 842px tall (A4)</p>
            </div>

            <Button onClick={addTextToPdf} className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Add Text & Download
            </Button>
          </>
        )}
      </Card>
    </ToolLayout>
  );
}
