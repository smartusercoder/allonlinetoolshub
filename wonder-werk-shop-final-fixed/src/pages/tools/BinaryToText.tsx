import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight } from "lucide-react";

export default function BinaryToText() {
  const [binary, setBinary] = useState("");
  const [text, setText] = useState("");

  const binaryToText = () => {
    try {
      const result = binary.split(' ').map(bin => 
        String.fromCharCode(parseInt(bin, 2))
      ).join('');
      setText(result);
    } catch {
      setText("Invalid binary format");
    }
  };

  const textToBinary = () => {
    const result = text.split('').map(char => 
      char.charCodeAt(0).toString(2).padStart(8, '0')
    ).join(' ');
    setBinary(result);
  };

  return (
    <ToolLayout title="Binary to Text" description="Convert binary to text and vice versa">
      <div className="space-y-4">
        <Textarea value={binary} onChange={(e) => setBinary(e.target.value)} rows={6} placeholder="Binary..." />
        <div className="flex gap-2">
          <Button onClick={binaryToText} className="flex-1">Binary to Text</Button>
          <Button onClick={textToBinary} variant="outline" className="flex-1">
            <ArrowLeftRight className="w-4 h-4 mr-2" />
            Text to Binary
          </Button>
        </div>
        <Textarea value={text} onChange={(e) => setText(e.target.value)} rows={6} placeholder="Text..." />
      </div>
    </ToolLayout>
  );
}
