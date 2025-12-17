import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UsageGuide } from "@/components/UsageGuide";

const DecimalToHex = () => {
  const [decimal, setDecimal] = useState("");
  const [hex, setHex] = useState("");
  const { toast } = useToast();

  const convert = () => {
    try {
      const num = parseInt(decimal);
      if (isNaN(num)) {
        toast({
          title: "Error",
          description: "Please enter a valid decimal number",
          variant: "destructive",
        });
        return;
      }

      const result = num.toString(16).toUpperCase();
      setHex(result);
    } catch (error) {
      toast({
        title: "Error",
        description: "Conversion failed",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(hex);
    toast({
      title: "Copied!",
      description: "HEX copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="Decimal to HEX Converter"
      description="Convert decimal to hexadecimal"
    >
      <UsageGuide
        steps={[
          "Enter a decimal number",
          "Click \"Convert to HEX\"",
          "Hexadecimal value appears below",
          "Copy the HEX code"
        ]}
        tips={[
          "Hexadecimal uses 0-9 and A-F",
          "Commonly used in CSS colors (#FFFFFF)",
          "Used for memory addresses in programming",
          "More compact than decimal for large numbers"
        ]}
        example="255 (decimal) = FF (hex)"
      />
      <div className="space-y-6 mt-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Decimal Number</label>
              <Input
                type="number"
                value={decimal}
                onChange={(e) => setDecimal(e.target.value)}
                placeholder="e.g., 255 or 42"
                className="w-full font-mono"
              />
            </div>

            <Button onClick={convert} className="w-full">
              Convert to HEX
            </Button>

            {hex && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">Hexadecimal</label>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-mono font-bold">{hex}</p>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </ToolLayout>
  );
};

export default DecimalToHex;
