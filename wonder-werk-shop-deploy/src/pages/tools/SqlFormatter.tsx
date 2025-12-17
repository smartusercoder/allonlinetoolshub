import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UsageGuide } from "@/components/UsageGuide";

export default function SqlFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const formatSql = () => {
    try {
      const keywords = ['SELECT', 'FROM', 'WHERE', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER', 'ON', 'AND', 'OR', 'ORDER BY', 'GROUP BY', 'HAVING', 'LIMIT', 'OFFSET', 'INSERT', 'UPDATE', 'DELETE', 'CREATE', 'ALTER', 'DROP', 'TABLE', 'DATABASE', 'INDEX', 'VIEW'];
      
      let formatted = input;
      keywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
        formatted = formatted.replace(regex, `\n${keyword}`);
      });

      formatted = formatted
        .split('\n')
        .map(line => line.trim())
        .filter(line => line)
        .join('\n');

      setOutput(formatted);
      toast({
        title: "Success",
        description: "SQL formatted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to format SQL",
        variant: "destructive",
      });
    }
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    toast({
      title: "Copied!",
      description: "Formatted SQL copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="SQL Formatter"
      description="Format SQL queries"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Paste your SQL query into the input area",
            "Click \"Format SQL\" to beautify the query",
            "Keywords are placed on new lines for readability",
            "Click \"Copy Output\" to copy the formatted query"
          ]}
          tips={[
            "Makes long, minified SQL queries readable",
            "Perfect for debugging complex queries",
            "Each major keyword starts on a new line",
            "Great for code reviews and documentation"
          ]}
          example="SELECT * FROM users WHERE age > 18 → formatted with line breaks"
        />
      </div>
      <Card className="p-6 mt-6">
        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium">Input SQL</label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste SQL query here..."
              rows={10}
              className="font-mono text-sm"
            />
          </div>

          <Button onClick={formatSql} className="w-full">
            Format SQL
          </Button>

          {output && (
            <div className="space-y-2">
              <label className="block text-sm font-medium">Formatted SQL</label>
              <Textarea
                value={output}
                readOnly
                rows={10}
                className="bg-muted font-mono text-sm"
              />
              <Button onClick={copyOutput} variant="outline" className="w-full">
                <Copy className="w-4 h-4 mr-2" />
                Copy Output
              </Button>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
}
