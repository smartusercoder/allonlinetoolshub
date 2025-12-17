import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SqlToJson = () => {
  const [sql, setSql] = useState("");
  const [json, setJson] = useState("");
  const { toast } = useToast();

  const convertToJson = () => {
    try {
      // Simple SQL INSERT parser
      const insertMatch = sql.match(/INSERT INTO (\w+)\s*\((.*?)\)\s*VALUES\s*\((.*?)\)/i);
      
      if (insertMatch) {
        const table = insertMatch[1];
        const columns = insertMatch[2].split(',').map(c => c.trim());
        const values = insertMatch[3].split(',').map(v => v.trim().replace(/'/g, ''));
        
        const obj: any = { table };
        columns.forEach((col, i) => {
          obj[col] = values[i];
        });
        
        setJson(JSON.stringify(obj, null, 2));
        toast({
          title: "Success",
          description: "SQL converted to JSON",
        });
      } else {
        toast({
          title: "Error",
          description: "Invalid SQL INSERT format",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to convert SQL",
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
      title="SQL to JSON Converter"
      description="Convert SQL INSERT statements to JSON"
    >
      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="sql">SQL INSERT Statement</Label>
          <Textarea
            id="sql"
            value={sql}
            onChange={(e) => setSql(e.target.value)}
            placeholder="INSERT INTO users (name, email) VALUES ('John', 'john@example.com')"
            rows={6}
          />
        </div>

        <Button onClick={convertToJson}>
          Convert to JSON
        </Button>

        {json && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>JSON Output</Label>
              <Button size="sm" variant="outline" onClick={copyToClipboard}>
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </Button>
            </div>
            <Textarea value={json} readOnly rows={10} />
          </div>
        )}
      </Card>
    </ToolLayout>
  );
};

export default SqlToJson;
