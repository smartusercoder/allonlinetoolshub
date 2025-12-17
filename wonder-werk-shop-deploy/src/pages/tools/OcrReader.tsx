import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Copy, FileText, Info, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function OcrReader() {
  const [image, setImage] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState("");
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setExtractedText("");
      };
      reader.readAsDataURL(file);
    }
  };

  const copyText = () => {
    navigator.clipboard.writeText(extractedText);
    toast({ title: "Copied", description: "Text copied to clipboard" });
  };

  const ocrServices = [
    { name: "Google Lens", url: "https://lens.google.com/", desc: "Free, works with any image" },
    { name: "OnlineOCR.net", url: "https://www.onlineocr.net/", desc: "Free, 15 images/hour" },
    { name: "i2OCR", url: "https://www.i2ocr.com/", desc: "Free, supports 100+ languages" },
    { name: "NewOCR", url: "https://www.newocr.com/", desc: "Free, no registration" },
  ];

  return (
    <ToolLayout title="OCR Reader" description="Extract text from images">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="image">Upload Image</Label>
            <Input id="image" type="file" accept="image/*" onChange={handleImageUpload} />
          </div>

          {image && (
            <div className="border rounded-lg p-2 bg-muted">
              <img src={image} alt="Uploaded" className="max-w-full h-auto max-h-[300px] mx-auto" />
            </div>
          )}

          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Browser-based OCR requires large ML models. Use one of the free services below for best results.
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <h3 className="font-semibold">Free OCR Services</h3>
            {ocrServices.map((service) => (
              <a
                key={service.name}
                href={service.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted transition-colors"
              >
                <div>
                  <p className="font-medium">{service.name}</p>
                  <p className="text-xs text-muted-foreground">{service.desc}</p>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </a>
            ))}
          </div>

          <div className="bg-muted p-4 rounded-lg space-y-2">
            <h4 className="font-semibold text-sm">Quick Tip: Google Drive OCR</h4>
            <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside">
              <li>Upload your image to Google Drive</li>
              <li>Right-click the image</li>
              <li>Select "Open with" → "Google Docs"</li>
              <li>The text will be extracted automatically!</li>
            </ol>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-lg font-semibold">Extracted Text</Label>
            <Button variant="outline" size="sm" onClick={copyText} disabled={!extractedText}>
              <Copy className="h-4 w-4 mr-2" />Copy
            </Button>
          </div>
          
          <Textarea
            value={extractedText}
            onChange={(e) => setExtractedText(e.target.value)}
            placeholder="Paste extracted text here after using one of the OCR services above..."
            className="min-h-[400px] font-mono text-sm"
          />

          <p className="text-xs text-muted-foreground">
            You can paste text here after extracting it from an OCR service, then copy it for use elsewhere.
          </p>
        </Card>
      </div>
    </ToolLayout>
  );
}
