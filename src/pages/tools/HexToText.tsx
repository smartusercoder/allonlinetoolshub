import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, ArrowLeftRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const HexToText = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const convert = () => {
    try {
      const hexValues = input.replace(/[^0-9A-Fa-f\s]/g, '').split(/\s+/).filter(h => h);
      if (hexValues.length === 0) {
        toast({
          title: "Error",
          description: "Please enter valid hexadecimal values",
          variant: "destructive",
        });
        return;
      }

      const text = hexValues
        .map(hex => String.fromCharCode(parseInt(hex, 16)))
        .join('');
      
      setOutput(text);
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
      description: "Text copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="HEX to Text Converter"
      description="Convert hexadecimal to text"
    >
      <div className="space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                HEX Input (space-separated)
              </label>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g., 48 65 6C 6C 6F"
                rows={4}
                className="w-full font-mono"
              />
            </div>

            <Button onClick={convert} className="w-full">
              <ArrowLeftRight className="w-4 h-4 mr-2" />
              Convert to Text
            </Button>

            {output && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">Text Output</label>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <Textarea
                  value={output}
                  readOnly
                  rows={4}
                  className="w-full bg-muted"
                />
              </div>
            )}
          </div>
        </Card>
      </div>
    </ToolLayout>
  );
};

export default HexToText;
