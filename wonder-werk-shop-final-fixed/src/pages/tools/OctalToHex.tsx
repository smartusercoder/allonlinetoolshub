import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const OctalToHex = () => {
  const [octal, setOctal] = useState("");
  const [hex, setHex] = useState("");
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

      const decimal = parseInt(cleanOctal, 8);
      const result = decimal.toString(16).toUpperCase();
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
      title="Octal to HEX Converter"
      description="Convert octal to hexadecimal"
    >
      <div className="space-y-6">
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

export default OctalToHex;
