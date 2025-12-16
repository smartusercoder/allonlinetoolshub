import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function VttToSrt() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const convert = () => {
    try {
      // Remove WEBVTT header and metadata
      let srt = input.replace(/WEBVTT.*?\n\n/s, '');
      
      // Convert timestamp format from 00:00:00.000 --> 00:00:00.000 to 00:00:00,000 --> 00:00:00,000
      srt = srt.replace(/(\d{2}):(\d{2}):(\d{2})\.(\d{3})\s*-->\s*(\d{2}):(\d{2}):(\d{2})\.(\d{3})/g,
        '$1:$2:$3,$4 --> $5:$6:$7,$8');
      
      // Add sequence numbers
      const blocks = srt.trim().split('\n\n');
      const numbered = blocks.map((block, index) => {
        if (!block.trim()) return '';
        return `${index + 1}\n${block}`;
      }).filter(b => b).join('\n\n');
      
      setOutput(numbered);
      toast({
        title: "Success",
        description: "VTT converted to SRT",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to convert VTT",
        variant: "destructive",
      });
    }
  };

  return (
    <ToolLayout
      title="VTT to SRT Converter"
      description="Convert WebVTT subtitles to SRT format"
    >
      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <Label>VTT Content</Label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={12}
            placeholder="WEBVTT&#10;&#10;00:00:01.000 --> 00:00:04.000&#10;Hello World"
            className="font-mono"
          />
        </div>
        
        <Button onClick={convert} className="w-full">
          Convert to SRT
        </Button>
        
        {output && (
          <div className="space-y-2">
            <Label>SRT Output</Label>
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
