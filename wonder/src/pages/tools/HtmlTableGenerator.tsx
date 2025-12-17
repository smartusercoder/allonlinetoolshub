import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

export default function HtmlTableGenerator() {
  const [rows, setRows] = useState("3");
  const [cols, setCols] = useState("3");

  const generateTable = () => {
    const r = parseInt(rows);
    const c = parseInt(cols);
    
    let html = '<table border="1">\n';
    html += '  <thead>\n    <tr>\n';
    for (let i = 0; i < c; i++) {
      html += `      <th>Header ${i + 1}</th>\n`;
    }
    html += '    </tr>\n  </thead>\n  <tbody>\n';
    
    for (let i = 0; i < r; i++) {
      html += '    <tr>\n';
      for (let j = 0; j < c; j++) {
        html += `      <td>Cell ${i + 1}-${j + 1}</td>\n`;
      }
      html += '    </tr>\n';
    }
    html += '  </tbody>\n</table>';
    return html;
  };

  const tableHtml = generateTable();

  return (
    <ToolLayout
      title="HTML Table Generator"
      description="Generate HTML table code"
    >
      <Card className="p-6 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="rows">Rows: {rows}</Label>
            <Input
              id="rows"
              type="number"
              min="1"
              max="20"
              value={rows}
              onChange={(e) => setRows(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cols">Columns: {cols}</Label>
            <Input
              id="cols"
              type="number"
              min="1"
              max="10"
              value={cols}
              onChange={(e) => setCols(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Preview</Label>
          <div className="border rounded-lg p-4 overflow-auto" dangerouslySetInnerHTML={{ __html: tableHtml }} />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>HTML Code</Label>
            <Button onClick={() => {
              navigator.clipboard.writeText(tableHtml);
              toast.success("Copied!");
            }} size="sm">
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </Button>
          </div>
          <Textarea value={tableHtml} readOnly rows={12} className="font-mono text-xs" />
        </div>
      </Card>
    </ToolLayout>
  );
}
