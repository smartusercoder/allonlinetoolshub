import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const WordToNumber = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const wordToNum: Record<string, number> = {
    zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9,
    ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16,
    seventeen: 17, eighteen: 18, nineteen: 19, twenty: 20, thirty: 30, forty: 40, fifty: 50,
    sixty: 60, seventy: 70, eighty: 80, ninety: 90, hundred: 100, thousand: 1000, million: 1000000
  };

  const convert = () => {
    const words = input.toLowerCase().trim().split(/\s+/);
    let result = 0;
    let current = 0;

    try {
      for (const word of words) {
        if (word === "hundred") {
          current *= 100;
        } else if (word === "thousand") {
          current *= 1000;
          result += current;
          current = 0;
        } else if (word === "million") {
          current *= 1000000;
          result += current;
          current = 0;
        } else if (wordToNum[word] !== undefined) {
          current += wordToNum[word];
        } else {
          toast({
            title: "Error",
            description: `Unknown word: ${word}`,
            variant: "destructive",
          });
          return;
        }
      }
      result += current;
      setOutput(result.toString());
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to convert. Check your input.",
        variant: "destructive",
      });
    }
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
      title="Word to Number Converter"
      description="Convert number words to their numeric representation"
    >
      <div className="space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Enter Number in Words</label>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="one hundred twenty three"
                className="w-full"
              />
            </div>

            <Button onClick={convert} className="w-full">
              Convert to Number
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
                  <p className="text-2xl font-bold">{output}</p>
                </div>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6 bg-muted/50">
          <h3 className="font-semibold mb-3">Examples</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>"one hundred twenty three" → 123</li>
            <li>"five thousand" → 5000</li>
            <li>"two million" → 2000000</li>
          </ul>
        </Card>
      </div>
    </ToolLayout>
  );
};

export default WordToNumber;