import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UsageGuide } from "@/components/UsageGuide";

const DecimalToBinary = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const convert = () => {
    const num = parseInt(input);
    if (isNaN(num)) {
      toast({
        title: "Error",
        description: "Please enter a valid number",
        variant: "destructive",
      });
      return;
    }
    setOutput(num.toString(2));
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
      title="Decimal to Binary"
      description="Convert decimal numbers to binary representation"
    >
      <UsageGuide
        steps={[
          "Enter a decimal number (0-9 digits)",
          "Click \"Convert to Binary\"",
          "Binary representation appears below",
          "Copy the result to your clipboard"
        ]}
        tips={[
          "Decimal is base-10 (our normal number system)",
          "Binary is base-2 (how computers represent data)",
          "Useful for computer science and programming",
          "Each binary digit is called a 'bit'"
        ]}
        example="42 (decimal) = 101010 (binary)"
      />
      <div className="space-y-6 mt-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Decimal Number</label>
              <Input
                type="number"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="42"
                className="w-full"
              />
            </div>

            <Button onClick={convert} className="w-full">
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
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-mono font-bold break-all">{output}</p>
                </div>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6 bg-muted/50">
          <h3 className="font-semibold mb-3">Examples</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground font-mono">
            <li>10 → 1010</li>
            <li>42 → 101010</li>
            <li>255 → 11111111</li>
          </ul>
        </Card>
      </div>
    </ToolLayout>
  );
};

export default DecimalToBinary;