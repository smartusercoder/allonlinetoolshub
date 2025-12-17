import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, ArrowLeftRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DecimalToText = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const convert = () => {
    try {
      const decimals = input.split(/\s+/).filter(d => d);
      if (decimals.length === 0) {
        toast({
          title: "Error",
          description: "Please enter valid decimal numbers",
          variant: "destructive",
        });
        return;
      }

      const text = decimals
        .map(decimal => String.fromCharCode(parseInt(decimal)))
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
      title="Decimal to Text Converter"
      description="Convert decimal to text"
    >
      <div className="space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Decimal Input (space-separated)
              </label>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g., 72 101 108 108 111"
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

export default DecimalToText;
