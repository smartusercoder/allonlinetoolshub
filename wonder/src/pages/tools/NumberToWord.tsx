import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const NumberToWord = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const ones = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
  const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
  const teens = ["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];

  const convertToWords = (num: number): string => {
    if (num === 0) return "zero";
    if (num < 0) return "negative " + convertToWords(Math.abs(num));

    if (num < 10) return ones[num];
    if (num < 20) return teens[num - 10];
    if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? " " + ones[num % 10] : "");
    if (num < 1000) return ones[Math.floor(num / 100)] + " hundred" + (num % 100 !== 0 ? " " + convertToWords(num % 100) : "");
    if (num < 1000000) return convertToWords(Math.floor(num / 1000)) + " thousand" + (num % 1000 !== 0 ? " " + convertToWords(num % 1000) : "");
    if (num < 1000000000) return convertToWords(Math.floor(num / 1000000)) + " million" + (num % 1000000 !== 0 ? " " + convertToWords(num % 1000000) : "");
    
    return "number too large";
  };

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
    setOutput(convertToWords(num));
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
      title="Number to Word Converter"
      description="Convert numbers to their word representation"
    >
      <div className="space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Enter Number</label>
              <Input
                type="number"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="123"
                className="w-full"
              />
            </div>

            <Button onClick={convert} className="w-full">
              Convert to Words
            </Button>

            {output && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">Result</label>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-lg font-medium capitalize">{output}</p>
                </div>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6 bg-muted/50">
          <h3 className="font-semibold mb-3">Examples</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>123 → one hundred twenty three</li>
            <li>1000 → one thousand</li>
            <li>999999 → nine hundred ninety nine thousand nine hundred ninety nine</li>
          </ul>
        </Card>
      </div>
    </ToolLayout>
  );
};

export default NumberToWord;