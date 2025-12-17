import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UsageGuide } from "@/components/UsageGuide";

const BinaryToDecimal = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const convert = () => {
    const binary = input.replace(/\s/g, "");
    if (!/^[01]+$/.test(binary)) {
      toast({
        title: "Error",
        description: "Please enter a valid binary number (only 0s and 1s)",
        variant: "destructive",
      });
      return;
    }
    setOutput(parseInt(binary, 2).toString());
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    toast({
      title: "Copied!",
      description: "Number copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="Binary to Decimal"
      description="Convert binary numbers to decimal representation"
    >
      <UsageGuide
        steps={[
          "Enter a binary number (only 0s and 1s)",
          "Click \"Convert to Decimal\"",
          "The decimal value appears below",
          "Click copy to copy the result"
        ]}
        tips={[
          "Binary uses base-2 (only 0 and 1)",
          "Used in computer science and programming",
          "Each digit represents a power of 2",
          "Great for understanding computer data"
        ]}
        example="1010 (binary) = 10 (decimal)"
      />
      <div className="space-y-6 mt-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Binary Number</label>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="101010"
                className="w-full font-mono"
              />
            </div>

            <Button onClick={convert} className="w-full">
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
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-3xl font-bold">{output}</p>
                </div>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6 bg-muted/50">
          <h3 className="font-semibold mb-3">Examples</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground font-mono">
            <li>1010 → 10</li>
            <li>101010 → 42</li>
            <li>11111111 → 255</li>
          </ul>
        </Card>
      </div>
    </ToolLayout>
  );
};

export default BinaryToDecimal;