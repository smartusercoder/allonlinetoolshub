import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BinaryToAscii = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const convert = () => {
    try {
      const binary = input.replace(/\s/g, "");
      let text = "";
      
      for (let i = 0; i < binary.length; i += 8) {
        const byte = binary.substr(i, 8);
        if (byte.length === 8) {
          text += String.fromCharCode(parseInt(byte, 2));
        }
      }
      
      setOutput(text);
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid binary input",
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
      title="Binary to ASCII"
      description="Convert binary representation to ASCII text"
    >
      <div className="space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Binary Input</label>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="01001000 01100101 01101100 01101100 01101111"
                rows={6}
                className="w-full font-mono text-sm"
              />
            </div>

            <Button onClick={convert} className="w-full">
              Convert to ASCII
            </Button>

            {output && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">ASCII Text</label>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <Textarea
                  value={output}
                  readOnly
                  rows={6}
                  className="w-full bg-muted"
                />
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6 bg-muted/50">
          <h3 className="font-semibold mb-3">Input Format</h3>
          <p className="text-sm text-muted-foreground mb-2">
            Enter binary code in 8-bit chunks (with or without spaces). Each 8-bit sequence represents one character.
          </p>
          <p className="text-sm text-muted-foreground">
            Example: 01001000 01100101 01101100 01101100 01101111 = "Hello"
          </p>
        </Card>
      </div>
    </ToolLayout>
  );
};

export default BinaryToAscii;