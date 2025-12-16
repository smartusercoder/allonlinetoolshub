import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UsageGuide } from "@/components/UsageGuide";

const CsvToJson = () => {
  const [csv, setCsv] = useState("");
  const [json, setJson] = useState("");
  const { toast } = useToast();

  const convert = () => {
    try {
      const lines = csv.trim().split("\n");
      if (lines.length < 2) {
        toast({
          title: "Invalid CSV",
          description: "CSV must have at least a header row and one data row",
          variant: "destructive",
        });
        return;
      }

      const headers = lines[0].split(",").map(h => h.trim().replace(/^"|"$/g, ""));
      const result = [];

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(",").map(v => v.trim().replace(/^"|"$/g, ""));
        const obj: Record<string, any> = {};
        
        headers.forEach((header, index) => {
          const value = values[index] || "";
          // Try to parse as number
          obj[header] = isNaN(Number(value)) || value === "" ? value : Number(value);
        });
        
        result.push(obj);
      }

      setJson(JSON.stringify(result, null, 2));
    } catch (error) {
      toast({
        title: "Conversion Error",
        description: "Failed to convert CSV to JSON",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(json);
    toast({
      title: "Copied!",
      description: "JSON copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="CSV to JSON"
      description="Convert CSV to JSON format"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Paste your CSV data in the input field",
            "Ensure first row contains column headers",
            "Click \"Convert to JSON\" to transform the data",
            "Copy the JSON output to use in your project"
          ]}
          tips={[
            "First row must be headers (column names)",
            "Each subsequent row becomes a JSON object",
            "Numbers are automatically detected and converted",
            "Perfect for importing spreadsheet data into apps",
            "Great for API development and data transformation"
          ]}
          example="CSV: name,age\\nJohn,30\\nJane,25 → JSON array of objects"
        />
        <div className="space-y-2">
          <Label>CSV Input</Label>
          <Textarea
            value={csv}
            onChange={(e) => setCsv(e.target.value)}
            placeholder='name,age\nJohn,30\nJane,25'
            rows={10}
            className="font-mono text-sm"
          />
        </div>

        <Button onClick={convert} className="w-full">
          Convert to JSON
        </Button>

        {json && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>JSON Output</Label>
              <Button onClick={copyToClipboard} variant="ghost" size="sm">
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
            <Textarea
              value={json}
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

export default CsvToJson;