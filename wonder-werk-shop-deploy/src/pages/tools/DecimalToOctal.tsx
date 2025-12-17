import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UsageGuide } from "@/components/UsageGuide";

const DecimalToOctal = () => {
  const [decimal, setDecimal] = useState("");
  const [octal, setOctal] = useState("");
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

      const result = num.toString(8);
      setOctal(result);
    } catch (error) {
      toast({
        title: "Error",
        description: "Conversion failed",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(octal);
    toast({
      title: "Copied!",
      description: "Octal copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="Decimal to Octal Converter"
      description="Convert decimal to octal"
    >
      <UsageGuide
        steps={[
          "Enter a decimal number",
          "Click \"Convert to Octal\"",
          "Octal value displays below",
          "Copy the octal number"
        ]}
        tips={[
          "Octal uses digits 0-7 only",
          "Useful for Unix file permissions",
          "Base-8 number system",
          "Less common than hex in modern programming"
        ]}
        example="127 (decimal) = 177 (octal)"
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
                placeholder="e.g., 127"
                className="w-full font-mono"
              />
            </div>

            <Button onClick={convert} className="w-full">
              Convert to Octal
            </Button>

            {octal && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">Octal</label>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-mono font-bold">{octal}</p>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </ToolLayout>
  );
};

export default DecimalToOctal;
