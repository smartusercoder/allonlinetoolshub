import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UsageGuide } from "@/components/UsageGuide";

const OctalToDecimal = () => {
  const [octal, setOctal] = useState("");
  const [decimal, setDecimal] = useState("");
  const { toast } = useToast();

  const convert = () => {
    try {
      const cleanOctal = octal.replace(/[^0-7]/g, '');
      if (!cleanOctal) {
        toast({
          title: "Error",
          description: "Please enter valid octal",
          variant: "destructive",
        });
        return;
      }

      const result = parseInt(cleanOctal, 8).toString();
      setDecimal(result);
    } catch (error) {
      toast({
        title: "Error",
        description: "Conversion failed",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(decimal);
    toast({
      title: "Copied!",
      description: "Decimal copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="Octal to Decimal Converter"
      description="Convert octal to decimal"
    >
      <UsageGuide
        steps={[
          "Enter octal number (digits 0-7 only)",
          "Click \"Convert to Decimal\"",
          "Decimal value appears below",
          "Copy the result to clipboard"
        ]}
        tips={[
          "Octal is base-8 number system",
          "Common in Unix/Linux file permissions (chmod 755)",
          "Each position represents a power of 8",
          "Only uses digits 0-7"
        ]}
        example="177 (octal) = 127 (decimal)"
      />
      <div className="space-y-6 mt-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Octal Number</label>
              <Input
                value={octal}
                onChange={(e) => setOctal(e.target.value)}
                placeholder="e.g., 177"
                className="w-full font-mono"
              />
            </div>

            <Button onClick={convert} className="w-full">
              Convert to Decimal
            </Button>

            {decimal && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">Decimal</label>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-mono font-bold">{decimal}</p>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </ToolLayout>
  );
};

export default OctalToDecimal;
