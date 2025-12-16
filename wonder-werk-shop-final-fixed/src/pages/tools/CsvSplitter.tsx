import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function CsvSplitter() {
  const [input, setInput] = useState("");
  const [rowsPerFile, setRowsPerFile] = useState(100);
  const { toast } = useToast();

  const splitCsv = () => {
    try {
      const lines = input.trim().split('\n');
      if (lines.length === 0) {
        toast({
          title: "Error",
          description: "Please enter CSV data",
          variant: "destructive",
        });
        return;
      }

      const header = lines[0];
      const dataLines = lines.slice(1);
      const chunks: string[][] = [];
      
      for (let i = 0; i < dataLines.length; i += rowsPerFile) {
        const chunk = [header, ...dataLines.slice(i, i + rowsPerFile)];
        chunks.push(chunk);
      }

      chunks.forEach((chunk, index) => {
        const csvContent = chunk.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `split-${index + 1}.csv`;
        a.click();
        URL.revokeObjectURL(url);
      });

      toast({
        title: "Success",
        description: `CSV split into ${chunks.length} files`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to split CSV",
        variant: "destructive",
      });
    }
  };

  return (
    <ToolLayout
      title="Split CSV"
      description="Split large CSV files into smaller chunks"
    >
      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="rows">Rows per file</Label>
          <Input
            id="rows"
            type="number"
            value={rowsPerFile}
            onChange={(e) => setRowsPerFile(Number(e.target.value))}
            min="1"
          />
        </div>

        <div className="space-y-2">
          <Label>CSV Data</Label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={15}
            placeholder="Paste CSV data..."
            className="font-mono"
          />
        </div>
        
        <Button onClick={splitCsv} className="w-full">
          <Download className="mr-2 h-4 w-4" />
          Split and Download Files
        </Button>
      </Card>
    </ToolLayout>
  );
}
