import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BinaryConverter = () => {
  const [decimal, setDecimal] = useState("");
  const [binary, setBinary] = useState("");
  const [hex, setHex] = useState("");
  const [octal, setOctal] = useState("");
  const { toast } = useToast();

  const updateFromDecimal = (value: string) => {
    setDecimal(value);
    if (value && !isNaN(Number(value))) {
      const num = parseInt(value, 10);
      setBinary(num.toString(2));
      setHex(num.toString(16).toUpperCase());
      setOctal(num.toString(8));
    } else {
      setBinary("");
      setHex("");
      setOctal("");
    }
  };

  const updateFromBinary = (value: string) => {
    setBinary(value);
    if (value && /^[01]+$/.test(value)) {
      const num = parseInt(value, 2);
      setDecimal(num.toString());
      setHex(num.toString(16).toUpperCase());
      setOctal(num.toString(8));
    } else if (value === "") {
      setDecimal("");
      setHex("");
      setOctal("");
    }
  };

  const updateFromHex = (value: string) => {
    setHex(value);
    if (value && /^[0-9A-Fa-f]+$/.test(value)) {
      const num = parseInt(value, 16);
      setDecimal(num.toString());
      setBinary(num.toString(2));
      setOctal(num.toString(8));
    } else if (value === "") {
      setDecimal("");
      setBinary("");
      setOctal("");
    }
  };

  const updateFromOctal = (value: string) => {
    setOctal(value);
    if (value && /^[0-7]+$/.test(value)) {
      const num = parseInt(value, 8);
      setDecimal(num.toString());
      setBinary(num.toString(2));
      setHex(num.toString(16).toUpperCase());
    } else if (value === "") {
      setDecimal("");
      setBinary("");
      setHex("");
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  return (
    <ToolLayout
      title="Binary Converter"
      description="Convert between binary, decimal, hexadecimal, and octal"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Decimal</Label>
            {decimal && (
              <Button onClick={() => copyToClipboard(decimal, "Decimal")} variant="ghost" size="sm">
                <Copy className="w-4 h-4 mr-1" />
                Copy
              </Button>
            )}
          </div>
          <Input
            value={decimal}
            onChange={(e) => updateFromDecimal(e.target.value)}
            placeholder="Enter decimal number..."
            className="font-mono"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Binary</Label>
            {binary && (
              <Button onClick={() => copyToClipboard(binary, "Binary")} variant="ghost" size="sm">
                <Copy className="w-4 h-4 mr-1" />
                Copy
              </Button>
            )}
          </div>
          <Input
            value={binary}
            onChange={(e) => updateFromBinary(e.target.value)}
            placeholder="Enter binary number..."
            className="font-mono"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Hexadecimal</Label>
            {hex && (
              <Button onClick={() => copyToClipboard(hex, "Hexadecimal")} variant="ghost" size="sm">
                <Copy className="w-4 h-4 mr-1" />
                Copy
              </Button>
            )}
          </div>
          <Input
            value={hex}
            onChange={(e) => updateFromHex(e.target.value.toUpperCase())}
            placeholder="Enter hexadecimal number..."
            className="font-mono"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Octal</Label>
            {octal && (
              <Button onClick={() => copyToClipboard(octal, "Octal")} variant="ghost" size="sm">
                <Copy className="w-4 h-4 mr-1" />
                Copy
              </Button>
            )}
          </div>
          <Input
            value={octal}
            onChange={(e) => updateFromOctal(e.target.value)}
            placeholder="Enter octal number..."
            className="font-mono"
          />
        </div>

        <div className="text-sm text-muted-foreground p-4 bg-muted/30 rounded-lg space-y-1">
          <p><strong>Decimal:</strong> Base-10 (0-9)</p>
          <p><strong>Binary:</strong> Base-2 (0-1)</p>
          <p><strong>Hexadecimal:</strong> Base-16 (0-9, A-F)</p>
          <p><strong>Octal:</strong> Base-8 (0-7)</p>
        </div>
      </div>
    </ToolLayout>
  );
};

export default BinaryConverter;