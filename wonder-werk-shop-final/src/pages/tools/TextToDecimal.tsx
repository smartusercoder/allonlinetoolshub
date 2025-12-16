import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, ArrowLeftRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TextToDecimal = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const convert = () => {
    try {
      if (!input) {
        toast({
          title: "Error",
          description: "Please enter some text",
          variant: "destructive",
        });
        return;
      }

      const decimal = input
        .split('')
        .map(char => char.charCodeAt(0).toString())
        .join(' ');
      
      setOutput(decimal);
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
      description: "Decimal copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="Text to Decimal Converter"
      description="Convert text to decimal representation"
    >
      <div className="space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Text Input</label>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter your text here..."
                rows={4}
                className="w-full"
              />
            </div>

            <Button onClick={convert} className="w-full">
              <ArrowLeftRight className="w-4 h-4 mr-2" />
              Convert to Decimal
            </Button>

            {output && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">Decimal Output</label>
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

export default TextToDecimal;
