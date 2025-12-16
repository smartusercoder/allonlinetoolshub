import { useState, useCallback } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, Download, Book, AlertCircle, Info } from "lucide-react";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import JSZip from "jszip";
import { jsPDF } from "jspdf";

interface EpubContent {
  title: string;
  author: string;
  chapters: { title: string; content: string }[];
}

export default function EpubToPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [epubContent, setEpubContent] = useState<EpubContent | null>(null);

  const stripHtml = (html: string): string => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const parseEpub = useCallback(async (file: File): Promise<EpubContent> => {
    const zip = await JSZip.loadAsync(file);
    
    // Find container.xml
    const containerXml = await zip.file("META-INF/container.xml")?.async("text");
    if (!containerXml) {
      throw new Error("Invalid EPUB: container.xml not found");
    }

    // Parse container to find content.opf path
    const parser = new DOMParser();
    const containerDoc = parser.parseFromString(containerXml, "text/xml");
    const rootfilePath = containerDoc.querySelector("rootfile")?.getAttribute("full-path") || "OEBPS/content.opf";
    
    // Get content.opf
    const contentOpf = await zip.file(rootfilePath)?.async("text");
    if (!contentOpf) {
      throw new Error("Invalid EPUB: content.opf not found");
    }

    const opfDoc = parser.parseFromString(contentOpf, "text/xml");
    
    // Get metadata
    const titleEl = opfDoc.querySelector("metadata title, dc\\:title");
    const authorEl = opfDoc.querySelector("metadata creator, dc\\:creator");
    const title = titleEl?.textContent || file.name.replace(".epub", "");
    const author = authorEl?.textContent || "Unknown Author";

    // Get spine items (reading order)
    const spineItems = opfDoc.querySelectorAll("spine itemref");
    const manifestItems = opfDoc.querySelectorAll("manifest item");
    
    // Build manifest map
    const manifestMap: Record<string, string> = {};
    manifestItems.forEach(item => {
      const id = item.getAttribute("id");
      const href = item.getAttribute("href");
      if (id && href) {
        manifestMap[id] = href;
      }
    });

    // Get base path from rootfile
    const basePath = rootfilePath.substring(0, rootfilePath.lastIndexOf("/") + 1);

    // Extract chapters
    const chapters: { title: string; content: string }[] = [];
    let chapterNum = 1;

    for (const itemref of Array.from(spineItems)) {
      const idref = itemref.getAttribute("idref");
      if (idref && manifestMap[idref]) {
        const chapterPath = basePath + manifestMap[idref];
        const chapterContent = await zip.file(chapterPath)?.async("text");
        
        if (chapterContent) {
          const chapterDoc = parser.parseFromString(chapterContent, "text/html");
          const textContent = stripHtml(chapterDoc.body?.innerHTML || "");
          
          if (textContent.trim().length > 50) { // Skip empty/short chapters
            // Try to find chapter title
            const h1 = chapterDoc.querySelector("h1, h2, h3");
            const chapterTitle = h1?.textContent || `Chapter ${chapterNum}`;
            
            chapters.push({
              title: chapterTitle,
              content: textContent.trim()
            });
            chapterNum++;
          }
        }
      }
    }

    return { title, author, chapters };
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.name.toLowerCase().endsWith(".epub")) {
      toast.error("Please select an EPUB file");
      return;
    }

    setFile(selectedFile);
    setLoading(true);
    setProgress(10);

    try {
      setProgress(30);
      const content = await parseEpub(selectedFile);
      setProgress(70);
      setEpubContent(content);
      setProgress(100);
      toast.success(`Loaded: ${content.title} (${content.chapters.length} chapters)`);
    } catch (error) {
      console.error("EPUB parse error:", error);
      toast.error("Failed to parse EPUB file. The file may be corrupted or in an unsupported format.");
      setFile(null);
    } finally {
      setLoading(false);
    }
  };

  const convertToPdf = async () => {
    if (!epubContent) return;

    setLoading(true);
    setProgress(0);

    try {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      const lineHeight = 6;
      const maxWidth = pageWidth - margin * 2;

      // Title page
      pdf.setFontSize(24);
      pdf.setFont("helvetica", "bold");
      const titleLines = pdf.splitTextToSize(epubContent.title, maxWidth);
      pdf.text(titleLines, pageWidth / 2, pageHeight / 3, { align: "center" });
      
      pdf.setFontSize(14);
      pdf.setFont("helvetica", "normal");
      pdf.text(epubContent.author, pageWidth / 2, pageHeight / 3 + 20, { align: "center" });

      // Process chapters
      const totalChapters = epubContent.chapters.length;
      
      for (let i = 0; i < totalChapters; i++) {
        const chapter = epubContent.chapters[i];
        setProgress(Math.round((i / totalChapters) * 100));

        pdf.addPage();
        let y = margin;

        // Chapter title
        pdf.setFontSize(16);
        pdf.setFont("helvetica", "bold");
        const chapterTitleLines = pdf.splitTextToSize(chapter.title, maxWidth);
        pdf.text(chapterTitleLines, margin, y);
        y += chapterTitleLines.length * 8 + 10;

        // Chapter content
        pdf.setFontSize(11);
        pdf.setFont("helvetica", "normal");
        
        const paragraphs = chapter.content.split(/\n+/);
        
        for (const paragraph of paragraphs) {
          if (!paragraph.trim()) continue;
          
          const lines = pdf.splitTextToSize(paragraph.trim(), maxWidth);
          
          for (const line of lines) {
            if (y + lineHeight > pageHeight - margin) {
              pdf.addPage();
              y = margin;
            }
            pdf.text(line, margin, y);
            y += lineHeight;
          }
          y += 4; // Paragraph spacing
        }
      }

      // Add page numbers
      const totalPages = pdf.getNumberOfPages();
      for (let i = 2; i <= totalPages; i++) { // Skip title page
        pdf.setPage(i);
        pdf.setFontSize(10);
        pdf.setFont("helvetica", "normal");
        pdf.text(String(i - 1), pageWidth / 2, pageHeight - 10, { align: "center" });
      }

      setProgress(100);
      
      // Download
      const fileName = `${epubContent.title.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`;
      pdf.save(fileName);
      toast.success("PDF created successfully!");
    } catch (error) {
      console.error("PDF conversion error:", error);
      toast.error("Failed to create PDF");
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  return (
    <ToolLayout
      title="EPUB to PDF Converter"
      description="Convert EPUB ebooks to PDF format"
    >
      <Card className="p-6 space-y-6">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            This tool converts EPUB files to PDF locally in your browser. Complex formatting and images may not be preserved perfectly. For best results with complex books, use dedicated ebook software like Calibre.
          </AlertDescription>
        </Alert>

        {/* File Upload */}
        <div className="space-y-4">
          <Label>Upload EPUB File</Label>
          <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
            <Input
              type="file"
              accept=".epub"
              onChange={handleFileChange}
              className="hidden"
              id="epub-upload"
              disabled={loading}
            />
            <label htmlFor="epub-upload" className="cursor-pointer">
              <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg font-medium">
                {file ? file.name : "Click to upload EPUB file"}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                or drag and drop
              </p>
            </label>
          </div>
        </div>

        {/* Progress */}
        {loading && (
          <div className="space-y-2">
            <Progress value={progress} />
            <p className="text-sm text-center text-muted-foreground">
              {progress < 100 ? "Processing..." : "Complete!"}
            </p>
          </div>
        )}

        {/* Book Info */}
        {epubContent && (
          <Card className="p-4 bg-muted/50">
            <div className="flex items-start gap-4">
              <Book className="w-12 h-12 text-primary flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{epubContent.title}</h3>
                <p className="text-muted-foreground">{epubContent.author}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  {epubContent.chapters.length} chapters
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Chapters Preview */}
        {epubContent && epubContent.chapters.length > 0 && (
          <div className="space-y-2">
            <Label>Table of Contents</Label>
            <div className="max-h-48 overflow-y-auto border rounded-lg p-3 space-y-1">
              {epubContent.chapters.map((chapter, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm py-1">
                  <FileText className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <span className="truncate">{chapter.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Convert Button */}
        {epubContent && (
          <Button
            onClick={convertToPdf}
            disabled={loading}
            className="w-full"
            size="lg"
          >
            <Download className="w-4 h-4 mr-2" />
            Convert to PDF
          </Button>
        )}

        {/* Tips */}
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <p className="font-medium mb-1">Tips for best results:</p>
            <ul className="text-sm list-disc list-inside space-y-1">
              <li>Works best with text-heavy EPUB files</li>
              <li>Complex layouts and images may be simplified</li>
              <li>DRM-protected files cannot be converted</li>
              <li>Large files may take longer to process</li>
            </ul>
          </AlertDescription>
        </Alert>
      </Card>
    </ToolLayout>
  );
}
