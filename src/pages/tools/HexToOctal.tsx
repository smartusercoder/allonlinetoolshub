import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const HexToOctal = () => {
  const [hex, setHex] = useState("");
  const [octal, setOctal] = useState("");
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

      const decimal = parseInt(cleanHex, 16);
      const result = decimal.toString(8);
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
      title="HEX to Octal Converter"
      description="Convert hexadecimal to octal"
    >
      <div className="space-y-6">
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

export default HexToOctal;
