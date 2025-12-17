import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, ArrowLeftRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UsageGuide } from "@/components/UsageGuide";

const OctalToBinary = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const convert = () => {
    try {
      const octal = input.replace(/[^0-7]/g, '');
      if (!octal) {
        toast({
          title: "Error",
          description: "Please enter valid octal",
          variant: "destructive",
        });
        return;
      }

      const binary = octal
        .split('')
        .map(char => parseInt(char, 8).toString(2).padStart(3, '0'))
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
      title="Octal to Binary Converter"
      description="Convert octal to binary"
    >
      <UsageGuide
        steps={[
          "Enter octal number (0-7 digits)",
          "Click \"Convert to Binary\"",
          "Binary representation appears below",
          "Copy the result"
        ]}
        tips={[
          "Octal uses base-8 (digits 0-7)",
          "Each octal digit = 3 binary digits",
          "Used in Unix file permissions",
          "Less common than hex or binary today"
        ]}
        example="177 (octal) = 001 111 111 (binary)"
      />
      <div className="space-y-6 mt-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Octal Input</label>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g., 177"
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

export default OctalToBinary;
