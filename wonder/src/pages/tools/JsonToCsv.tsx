import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const JsonToCsv = () => {
  const [json, setJson] = useState("");
  const [csv, setCsv] = useState("");
  const { toast } = useToast();

  const convert = () => {
    try {
      const data = JSON.parse(json);
      const array = Array.isArray(data) ? data : [data];
      
      if (array.length === 0) {
        toast({
          title: "Error",
          description: "JSON array is empty",
          variant: "destructive",
        });
        return;
      }

      // Get headers
      const headers = Object.keys(array[0]);
      
      // Create CSV
      const csvRows = [headers.join(",")];
      
      array.forEach(row => {
        const values = headers.map(header => {
          const value = row[header];
          const escaped = String(value).replace(/"/g, '""');
          return `"${escaped}"`;
        });
        csvRows.push(values.join(","));
      });
      
      setCsv(csvRows.join("\n"));
    } catch (error) {
      toast({
        title: "Invalid JSON",
        description: "Please enter valid JSON",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(csv);
    toast({
      title: "Copied!",
      description: "CSV copied to clipboard",
    });
  };

  const downloadCsv = () => {
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast({
      title: "Downloaded!",
      description: "CSV file downloaded",
    });
  };

  return (
    <ToolLayout
      title="JSON to CSV"
      description="Convert JSON to CSV format"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>JSON Input</Label>
          <Textarea
            value={json}
            onChange={(e) => setJson(e.target.value)}
            placeholder='[{"name": "John", "age": 30}, {"name": "Jane", "age": 25}]'
            rows={10}
            className="font-mono text-sm"
          />
        </div>

        <Button onClick={convert} className="w-full">
          Convert to CSV
        </Button>

        {csv && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>CSV Output</Label>
              <div className="flex gap-2">
                <Button onClick={copyToClipboard} variant="ghost" size="sm">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
                <Button onClick={downloadCsv} variant="ghost" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
            <Textarea
              value={csv}
              readOnly
              rows={10}
              className="font-mono text-sm bg-muted"
            />
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default JsonToCsv;