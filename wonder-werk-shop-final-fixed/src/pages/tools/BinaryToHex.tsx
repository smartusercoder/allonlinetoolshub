import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, ArrowLeftRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UsageGuide } from "@/components/UsageGuide";

const BinaryToHex = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const convert = () => {
    try {
      const binary = input.replace(/[^01]/g, '');
      if (!binary) {
        toast({
          title: "Error",
          description: "Please enter valid binary",
          variant: "destructive",
        });
        return;
      }

      // Pad to groups of 4
      const paddedBinary = binary.padStart(Math.ceil(binary.length / 4) * 4, '0');
      const hex = paddedBinary
        .match(/.{1,4}/g)
        ?.map(group => parseInt(group, 2).toString(16).toUpperCase())
        .join('') || '';
      
      setOutput(hex);
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
      description: "HEX copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="Binary to HEX Converter"
      description="Convert binary to hexadecimal"
    >
      <UsageGuide
        steps={[
          "Enter binary number (only 0s and 1s)",
          "Click \"Convert to HEX\"",
          "Hexadecimal output appears below",
          "Copy the HEX value"
        ]}
        tips={[
          "Binary digits are grouped into sets of 4",
          "Each group of 4 bits = 1 hex digit",
          "More compact than binary representation",
          "Commonly used in programming and debugging"
        ]}
        example="00011010 (binary) = 1A (hex)"
      />
      <div className="space-y-6 mt-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Binary Input</label>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g., 00011010001010"
                rows={4}
                className="w-full font-mono"
              />
            </div>

            <Button onClick={convert} className="w-full">
              <ArrowLeftRight className="w-4 h-4 mr-2" />
              Convert to HEX
            </Button>

            {output && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">HEX Output</label>
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

export default BinaryToHex;
