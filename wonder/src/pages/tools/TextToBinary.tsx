import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeftRight } from "lucide-react";

const TextToBinary = () => {
  const [text, setText] = useState("");
  const [binary, setBinary] = useState("");

  const textToBinary = () => {
    const binaryResult = text
      .split('')
      .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
      .join(' ');
    setBinary(binaryResult);
  };

  const binaryToText = () => {
    try {
      const textResult = binary
        .split(' ')
        .map(bin => String.fromCharCode(parseInt(bin, 2)))
        .join('');
      setText(textResult);
    } catch (error) {
      setText('Invalid binary input');
    }
  };

  return (
    <ToolLayout
      title="Text to Binary Converter"
      description="Convert text to binary code and vice versa"
    >
      <Card className="p-6 space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="text">Text</Label>
            <Textarea
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text..."
              rows={6}
            />
            <Button onClick={textToBinary}>
              Convert to Binary
            </Button>
          </div>

          <div className="flex justify-center">
            <ArrowLeftRight className="h-6 w-6 text-muted-foreground" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="binary">Binary Code</Label>
            <Textarea
              id="binary"
              value={binary}
              onChange={(e) => setBinary(e.target.value)}
              placeholder="Enter binary code (space-separated 8-bit sequences)..."
              rows={6}
            />
            <Button onClick={binaryToText}>
              Convert to Text
            </Button>
          </div>
        </div>
      </Card>
    </ToolLayout>
  );
};

export default TextToBinary;
