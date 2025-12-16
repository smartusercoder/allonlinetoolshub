import { useState, useCallback } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Download, Upload, Type, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { jsPDF } from "jspdf";

export default function WordToPdf() {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("Document");
  const [fontSize, setFontSize] = useState("12");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Handle .txt files directly
    if (file.name.endsWith('.txt')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setText(content);
        setTitle(file.name.replace('.txt', ''));
        toast.success("Text file loaded");
      };
      reader.readAsText(file);
      return;
    }

    // Handle .docx files - extract text only
    if (file.name.endsWith('.docx')) {
      try {
        const JSZip = (await import('jszip')).default;
        const arrayBuffer = await file.arrayBuffer();
        const zip = await JSZip.loadAsync(arrayBuffer);
        
        // Find the main document content
        const docXml = await zip.file('word/document.xml')?.async('text');
        
        if (docXml) {
          // Extract text from XML, removing tags
          const textContent = docXml
            .replace(/<w:p[^>]*>/g, '\n') // Paragraph breaks
            .replace(/<w:br[^>]*>/g, '\n') // Line breaks
            .replace(/<[^>]+>/g, '') // Remove all tags
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&apos;/g, "'")
            .replace(/\n{3,}/g, '\n\n') // Reduce multiple newlines
            .trim();
          
          setText(textContent);
          setTitle(file.name.replace('.docx', ''));
          toast.success("Word document text extracted");
        } else {
          toast.error("Could not find document content");
        }
      } catch (error) {
        toast.error("Failed to parse Word document");
        console.error(error);
      }
      return;
    }

    toast.error("Unsupported file type. Please use .txt or .docx files");
  }, []);

  const generatePdf = useCallback(() => {
    if (!text.trim()) {
      toast.error("Please enter or upload some text");
      return;
    }

    setIsProcessing(true);

    try {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      const maxWidth = pageWidth - margin * 2;
      const fontSizeNum = parseInt(fontSize);
      const lineHeight = fontSizeNum * 0.5;

      // Title
      pdf.setFontSize(18);
      pdf.setFont('helvetica', 'bold');
      const titleLines = pdf.splitTextToSize(title, maxWidth);
      pdf.text(titleLines, margin, margin + 10);

      // Content
      pdf.setFontSize(fontSizeNum);
      pdf.setFont('helvetica', 'normal');
      
      let yPosition = margin + 25;
      const paragraphs = text.split('\n');

      for (const paragraph of paragraphs) {
        if (paragraph.trim() === '') {
          yPosition += lineHeight;
          continue;
        }

        const lines = pdf.splitTextToSize(paragraph, maxWidth);
        
        for (const line of lines) {
          if (yPosition > pageHeight - margin) {
            pdf.addPage();
            yPosition = margin;
          }
          pdf.text(line, margin, yPosition);
          yPosition += lineHeight;
        }
        yPosition += lineHeight * 0.5; // Paragraph spacing
      }

      // Save
      const safeName = title.replace(/[^a-z0-9]/gi, '_').substring(0, 50);
      pdf.save(`${safeName}.pdf`);
      toast.success("PDF generated successfully!");
    } catch (error) {
      toast.error("Failed to generate PDF");
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  }, [text, title, fontSize]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const input = document.getElementById('file-input') as HTMLInputElement;
      const dt = new DataTransfer();
      dt.items.add(file);
      input.files = dt.files;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }, []);

  return (
    <ToolLayout 
      title="Word/Text to PDF" 
      description="Convert text documents to PDF format with custom formatting"
    >
      <Card className="p-6">
        <div className="space-y-6">
          {/* File upload */}
          <div
            className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <input
              id="file-input"
              type="file"
              accept=".txt,.docx"
              onChange={handleFileUpload}
              className="hidden"
            />
            <label htmlFor="file-input" className="cursor-pointer">
              <Upload className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
              <p className="text-sm font-medium mb-1">
                Drop a file here or click to upload
              </p>
              <p className="text-xs text-muted-foreground">
                Supports .txt and .docx files (text extraction only)
              </p>
            </label>
          </div>

          {/* Document settings */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Document Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="My Document"
              />
            </div>
            <div>
              <Label htmlFor="fontSize">Font Size</Label>
              <Select value={fontSize} onValueChange={setFontSize}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10pt</SelectItem>
                  <SelectItem value="11">11pt</SelectItem>
                  <SelectItem value="12">12pt</SelectItem>
                  <SelectItem value="14">14pt</SelectItem>
                  <SelectItem value="16">16pt</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Text editor */}
          <div>
            <Label htmlFor="text">Document Content</Label>
            <Textarea
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type or paste your text here..."
              className="min-h-[300px] font-mono"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {text.length} characters, ~{text.split(/\s+/).filter(w => w).length} words
            </p>
          </div>

          {/* Generate button */}
          <Button 
            onClick={generatePdf} 
            className="w-full"
            disabled={isProcessing || !text.trim()}
          >
            {isProcessing ? (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-background border-t-transparent mr-2" />
            ) : (
              <Download className="h-4 w-4 mr-2" />
            )}
            Generate PDF
          </Button>

          {/* Info section */}
          <div className="bg-muted/30 p-4 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <p className="font-medium text-foreground mb-1">About This Tool:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Extracts text from .docx files (formatting not preserved)</li>
                  <li>Creates clean PDF with consistent formatting</li>
                  <li>For complex Word documents, use Microsoft Word or Google Docs export</li>
                  <li>All processing happens in your browser - files never leave your device</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </ToolLayout>
  );
}
