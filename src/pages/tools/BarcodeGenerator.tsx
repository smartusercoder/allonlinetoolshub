import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UsageGuide } from "@/components/UsageGuide";

export default function BarcodeGenerator() {
  const [text, setText] = useState("");
  const [format, setFormat] = useState("code128");
  const { toast } = useToast();

  const generateBarcode = () => {
    if (!text) return null;
    
    // Using a simple barcode API
    return `https://barcode.tec-it.com/barcode.ashx?data=${encodeURIComponent(text)}&code=${format.toUpperCase()}&translate-esc=on`;
  };

  const barcodeUrl = generateBarcode();

  const downloadBarcode = () => {
    if (!barcodeUrl) return;
    const link = document.createElement('a');
    link.download = `barcode-${text}.png`;
    link.href = barcodeUrl;
    link.click();
    toast({
      title: "Downloaded",
      description: "Barcode image downloaded",
    });
  };

  return (
    <ToolLayout
      title="Barcode Generator"
      description="Generate various barcode formats"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Enter the text or number you want to encode",
            "Select barcode format (Code 128, EAN-13, UPC-A, etc.)",
            "Barcode appears automatically",
            "Click \"Download Barcode\" to save as image"
          ]}
          tips={[
            "Code 128 works with any text",
            "EAN-13 requires exactly 13 digits",
            "UPC-A requires 12 digits",
            "Perfect for inventory, products, and tracking"
          ]}
        />
      </div>
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium">Text/Number</label>
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text or number..."
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Barcode Format</label>
            <Select value={format} onValueChange={setFormat}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="code128">Code 128</SelectItem>
                <SelectItem value="code39">Code 39</SelectItem>
                <SelectItem value="ean13">EAN-13</SelectItem>
                <SelectItem value="ean8">EAN-8</SelectItem>
                <SelectItem value="upca">UPC-A</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {text && barcodeUrl && (
            <div className="space-y-4">
              <div className="flex justify-center p-8 bg-muted rounded-lg">
                <img src={barcodeUrl} alt="Barcode" className="max-w-full" />
              </div>
              
              <Button onClick={downloadBarcode} className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Download Barcode
              </Button>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
}
