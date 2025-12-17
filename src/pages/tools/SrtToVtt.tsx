import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function SrtToVtt() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const convert = () => {
    try {
      // Remove sequence numbers
      let vtt = input.replace(/^\d+\s*$/gm, '');
      
      // Convert timestamp format from 00:00:00,000 --> 00:00:00,000 to 00:00:00.000 --> 00:00:00.000
      vtt = vtt.replace(/(\d{2}):(\d{2}):(\d{2}),(\d{3})\s*-->\s*(\d{2}):(\d{2}):(\d{2}),(\d{3})/g,
        '$1:$2:$3.$4 --> $5:$6:$7.$8');
      
      // Add WEBVTT header
      vtt = 'WEBVTT\n\n' + vtt.trim();
      
      // Clean up extra blank lines
      vtt = vtt.replace(/\n{3,}/g, '\n\n');
      
      setOutput(vtt);
      toast({
        title: "Success",
        description: "SRT converted to VTT",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to convert SRT",
        variant: "destructive",
      });
    }
  };

  return (
    <ToolLayout
      title="SRT to VTT Converter"
      description="Convert SRT subtitles to WebVTT format"
    >
      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <Label>SRT Content</Label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={12}
            placeholder="1&#10;00:00:01,000 --> 00:00:04,000&#10;Hello World"
            className="font-mono"
          />
        </div>
        
        <Button onClick={convert} className="w-full">
          Convert to VTT
        </Button>
        
        {output && (
          <div className="space-y-2">
            <Label>VTT Output</Label>
            <Textarea
              value={output}
              readOnly
              rows={12}
              className="font-mono"
            />
          </div>
        )}
      </Card>
    </ToolLayout>
  );
}
