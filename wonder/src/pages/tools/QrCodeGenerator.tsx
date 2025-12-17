import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UsageGuide } from "@/components/UsageGuide";
import { toolFAQs } from "@/data/faqData";

const QrCodeGenerator = () => {
  const [text, setText] = useState("");
  const [size, setSize] = useState([256]);
  const [qrCode, setQrCode] = useState("");
  const { toast } = useToast();

  const generateQR = () => {
    if (!text) {
      toast({
        title: "Error",
        description: "Please enter text or URL",
        variant: "destructive",
      });
      return;
    }
    
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size[0]}x${size[0]}&data=${encodeURIComponent(text)}`;
    setQrCode(qrUrl);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = qrCode;
    link.download = 'qrcode.png';
    link.click();
  };

  return (
    <ToolLayout
      title="QR Code Generator"
      description="Create custom QR codes for URLs, text, and more"
      keywords={["qr code generator", "create qr code", "qr code maker", "free qr generator"]}
      category="GeneratorTools"
      howToSteps={[
        {
          name: "Enter Content",
          text: "Type or paste the text, URL, or information you want to encode in the QR code. This can be a website link, contact information, WiFi credentials, or any text."
        },
        {
          name: "Adjust QR Code Size",
          text: "Use the size slider to set the dimensions of your QR code. Larger sizes (300-500px) work better for printing, while smaller sizes (150-250px) are good for digital use."
        },
        {
          name: "Generate QR Code",
          text: "Click the 'Generate QR Code' button to create your customized QR code based on your input and size preferences."
        },
        {
          name: "Download or Use",
          text: "Download the QR code as a PNG image for printing or digital use. You can test it immediately by scanning with any QR code reader app."
        }
      ]}
      faqs={toolFAQs["qr-code-generator"]}
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Enter the text or URL you want to encode",
            "Adjust the size slider to set QR code dimensions",
            "Click \"Generate QR Code\" to create your QR code",
            "Download the QR code image or scan it directly"
          ]}
          tips={[
            "Use for sharing website URLs, WiFi passwords, or contact info",
            "Larger sizes are better for printing on physical materials",
            "Test your QR code with a scanner before printing"
          ]}
          example="https://example.com or any text like contact details"
        />

        <div>
          <label className="text-sm font-medium mb-2 block">Text or URL</label>
          <Input
            placeholder="Enter text or URL..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="mb-4"
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Size: {size[0]}x{size[0]}px
          </label>
          <Slider
            value={size}
            onValueChange={setSize}
            min={128}
            max={512}
            step={64}
            className="w-full"
          />
        </div>

        <Button onClick={generateQR} className="w-full" variant="hero">
          Generate QR Code
        </Button>

        {qrCode && (
          <div className="text-center space-y-4">
            <div className="inline-block p-4 bg-white rounded-lg">
              <img src={qrCode} alt="QR Code" className="mx-auto" />
            </div>
            <Button onClick={handleDownload} className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Download QR Code
            </Button>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default QrCodeGenerator;
