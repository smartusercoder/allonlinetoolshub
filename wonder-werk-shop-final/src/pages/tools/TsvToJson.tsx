import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function TsvToJson() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const convert = () => {
    try {
      const lines = input.trim().split('\n');
      if (lines.length === 0) {
        toast({
          title: "Error",
          description: "Please enter TSV data",
          variant: "destructive",
        });
        return;
      }

      const headers = lines[0].split('\t');
      const data = lines.slice(1).map(line => {
        const values = line.split('\t');
        const obj: Record<string, string> = {};
        headers.forEach((header, index) => {
          obj[header.trim()] = values[index]?.trim() || '';
        });
        return obj;
      });

      setOutput(JSON.stringify(data, null, 2));
      toast({
        title: "Success",
        description: "TSV converted to JSON",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to convert TSV",
        variant: "destructive",
      });
    }
  };

  return (
    <ToolLayout
      title="TSV to JSON"
      description="Convert Tab-Separated Values to JSON"
    >
      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <Label>TSV Data</Label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={10}
            placeholder="name	age	city&#10;John	30	NYC&#10;Jane	25	LA"
            className="font-mono"
          />
        </div>
        
        <Button onClick={convert} className="w-full">
          Convert to JSON
        </Button>
        
        {output && (
          <div className="space-y-2">
            <Label>JSON Output</Label>
            <Textarea
              value={output}
              readOnly
              rows={10}
              className="font-mono"
            />
          </div>
        )}
      </Card>
    </ToolLayout>
  );
}
