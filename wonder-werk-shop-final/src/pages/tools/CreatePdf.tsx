import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Download, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { UsageGuide } from "@/components/UsageGuide";

interface TextBlock {
  text: string;
  fontSize: number;
}

export default function CreatePdf() {
  const [title, setTitle] = useState("My Document");
  const [blocks, setBlocks] = useState<TextBlock[]>([
    { text: "", fontSize: 12 }
  ]);
  const { toast } = useToast();

  const addBlock = () => {
    setBlocks([...blocks, { text: "", fontSize: 12 }]);
  };

  const updateBlock = (index: number, field: keyof TextBlock, value: any) => {
    const updated = [...blocks];
    updated[index] = { ...updated[index], [field]: value };
    setBlocks(updated);
  };

  const removeBlock = (index: number) => {
    setBlocks(blocks.filter((_, i) => i !== index));
  };

  const createPdf = async () => {
    try {
      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      
      let page = pdfDoc.addPage([595, 842]); // A4 size
      let yPosition = 750;
      const margin = 50;
      const pageWidth = 595;
      const lineHeight = 1.5;

      // Add title
      page.drawText(title, {
        x: margin,
        y: yPosition,
        size: 24,
        font: boldFont,
        color: rgb(0, 0, 0),
      });
      yPosition -= 40;

      // Add text blocks
      for (const block of blocks) {
        if (!block.text.trim()) continue;

        const lines = block.text.split('\n');
        
        for (const line of lines) {
          const words = line.split(' ');
          let currentLine = '';
          
          for (const word of words) {
            const testLine = currentLine + (currentLine ? ' ' : '') + word;
            const width = font.widthOfTextAtSize(testLine, block.fontSize);
            
            if (width > pageWidth - 2 * margin && currentLine) {
              // Draw current line
              if (yPosition < margin + block.fontSize) {
                // Add new page
                page = pdfDoc.addPage([595, 842]);
                yPosition = 750;
              }
              
              page.drawText(currentLine, {
                x: margin,
                y: yPosition,
                size: block.fontSize,
                font,
                color: rgb(0, 0, 0),
              });
              
              yPosition -= block.fontSize * lineHeight;
              currentLine = word;
            } else {
              currentLine = testLine;
            }
          }
          
          // Draw remaining text
          if (currentLine) {
            if (yPosition < margin + block.fontSize) {
              page = pdfDoc.addPage([595, 842]);
              yPosition = 750;
            }
            
            page.drawText(currentLine, {
              x: margin,
              y: yPosition,
              size: block.fontSize,
              font,
              color: rgb(0, 0, 0),
            });
            
            yPosition -= block.fontSize * lineHeight;
          }
        }
        
        yPosition -= 10; // Space between blocks
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${title.replace(/\s+/g, '-').toLowerCase()}.pdf`;
      a.click();
      URL.revokeObjectURL(url);

      toast({
        title: "Success",
        description: "PDF created and downloaded",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create PDF",
        variant: "destructive",
      });
    }
  };

  return (
    <ToolLayout
      title="Create PDF"
      description="Create PDF documents from text"
      keywords={["create pdf", "pdf maker", "text to pdf", "pdf creator", "generate pdf", "pdf document creator"]}
    >
      <UsageGuide
        steps={[
          "Enter a title for your PDF document",
          "Add text blocks with customizable font sizes",
          "Text automatically wraps and creates new pages",
          "Click Create PDF to download"
        ]}
        tips={[
          "Use multiple blocks to organize content",
          "Adjust font size for headings vs body text",
          "Text wraps automatically at margins",
          "PDFs are created instantly in your browser"
        ]}
      />
      <Card className="p-6 space-y-6">

        <div className="space-y-2">
          <Label htmlFor="title">Document Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="My Document"
          />
        </div>

        {blocks.map((block, index) => (
          <Card key={index} className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <Label>Text Block #{index + 1}</Label>
              {blocks.length > 1 && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeBlock(index)}
                >
                  Remove
                </Button>
              )}
            </div>
            <Textarea
              value={block.text}
              onChange={(e) => updateBlock(index, "text", e.target.value)}
              placeholder="Enter text content..."
              rows={4}
            />
            <div className="space-y-2">
              <Label>Font Size: {block.fontSize}px</Label>
              <Input
                type="range"
                min="8"
                max="24"
                value={block.fontSize}
                onChange={(e) => updateBlock(index, "fontSize", Number(e.target.value))}
              />
            </div>
          </Card>
        ))}

        <div className="grid grid-cols-2 gap-2">
          <Button onClick={addBlock} variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Add Text Block
          </Button>
          <Button onClick={createPdf}>
            <Download className="mr-2 h-4 w-4" />
            Create PDF
          </Button>
        </div>
      </Card>
    </ToolLayout>
  );
}
