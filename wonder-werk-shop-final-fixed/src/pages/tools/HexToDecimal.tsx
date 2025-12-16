import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UsageGuide } from "@/components/UsageGuide";

const HexToDecimal = () => {
  const [hex, setHex] = useState("");
  const [decimal, setDecimal] = useState("");
  const { toast } = useToast();

  const convert = () => {
    try {
      const cleanHex = hex.replace(/[^0-9A-Fa-f]/g, '');
      if (!cleanHex) {
        toast({
          title: "Error",
          description: "Please enter valid hexadecimal",
          variant: "destructive",
        });
        return;
      }

      const result = parseInt(cleanHex, 16).toString();
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
      title="HEX to Decimal Converter"
      description="Convert hexadecimal to decimal"
    >
      <UsageGuide
        steps={[
          "Enter a hexadecimal value (0-9, A-F)",
          "Click \"Convert to Decimal\"",
          "Decimal number appears below",
          "Copy the result"
        ]}
        tips={[
          "Hexadecimal uses base-16 (0-9, A-F)",
          "Commonly used for colors and memory addresses",
          "A=10, B=11, C=12, D=13, E=14, F=15",
          "Case insensitive (FF = ff)"
        ]}
        example="FF (hex) = 255 (decimal)"
      />
      <div className="space-y-6 mt-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Hexadecimal</label>
              <Input
                value={hex}
                onChange={(e) => setHex(e.target.value)}
                placeholder="e.g., FF or 1A2B"
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

export default HexToDecimal;
