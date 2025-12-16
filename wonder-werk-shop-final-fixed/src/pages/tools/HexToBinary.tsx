import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, ArrowLeftRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UsageGuide } from "@/components/UsageGuide";

const HexToBinary = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const convert = () => {
    try {
      const hex = input.replace(/[^0-9A-Fa-f]/g, '');
      if (!hex) {
        toast({
          title: "Error",
          description: "Please enter valid hexadecimal",
          variant: "destructive",
        });
        return;
      }

      const binary = hex
        .split('')
        .map(char => parseInt(char, 16).toString(2).padStart(4, '0'))
        .join(' ');
      
      setOutput(binary);
    } catch (error) {
      toast({
        title: "Error",
        description: "Conversion failed",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    toast({
      title: "Copied!",
      description: "Binary copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="HEX to Binary Converter"
      description="Convert hexadecimal to binary"
    >
      <UsageGuide
        steps={[
          "Enter hexadecimal value (0-9, A-F)",
          "Click \"Convert to Binary\"",
          "Binary representation appears below",
          "Copy the binary output"
        ]}
        tips={[
          "Each hex digit converts to 4 binary digits",
          "Useful for low-level programming",
          "Great for understanding bitwise operations",
          "Spaces added for readability"
        ]}
        example="1A2B (hex) = 0001 1010 0010 1011 (binary)"
      />
      <div className="space-y-6 mt-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Hexadecimal Input</label>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g., 1A2B"
                rows={4}
                className="w-full font-mono"
              />
            </div>

            <Button onClick={convert} className="w-full">
              <ArrowLeftRight className="w-4 h-4 mr-2" />
              Convert to Binary
            </Button>

            {output && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">Binary Output</label>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <Textarea
                  value={output}
                  readOnly
                  rows={4}
                  className="w-full bg-muted font-mono text-sm"
                />
              </div>
            )}
          </div>
        </Card>
      </div>
    </ToolLayout>
  );
};

export default HexToBinary;
