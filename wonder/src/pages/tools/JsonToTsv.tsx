import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function JsonToTsv() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const convert = () => {
    try {
      const data = JSON.parse(input);
      
      if (!Array.isArray(data) || data.length === 0) {
        toast({
          title: "Error",
          description: "Input must be a non-empty array of objects",
          variant: "destructive",
        });
        return;
      }

      const headers = Object.keys(data[0]);
      const tsvLines = [
        headers.join('\t'),
        ...data.map(obj => headers.map(h => obj[h] || '').join('\t'))
      ];

      setOutput(tsvLines.join('\n'));
      toast({
        title: "Success",
        description: "JSON converted to TSV",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid JSON input",
        variant: "destructive",
      });
    }
  };

  return (
    <ToolLayout
      title="JSON to TSV"
      description="Convert JSON to Tab-Separated Values"
    >
      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <Label>JSON Data</Label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={10}
            placeholder='[{"name":"John","age":30},{"name":"Jane","age":25}]'
            className="font-mono"
          />
        </div>
        
        <Button onClick={convert} className="w-full">
          Convert to TSV
        </Button>
        
        {output && (
          <div className="space-y-2">
            <Label>TSV Output</Label>
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
