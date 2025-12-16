import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

export default function CssGridGenerator() {
  const [columns, setColumns] = useState("3");
  const [rows, setRows] = useState("2");
  const [columnGap, setColumnGap] = useState("16");
  const [rowGap, setRowGap] = useState("16");

  const cssCode = `.grid-container {\n  display: grid;\n  grid-template-columns: repeat(${columns}, 1fr);\n  grid-template-rows: repeat(${rows}, 1fr);\n  column-gap: ${columnGap}px;\n  row-gap: ${rowGap}px;\n}`;

  return (
    <ToolLayout
      title="CSS Grid Generator"
      description="Create CSS Grid layouts visually"
    >
      <div className="space-y-4">
        <Card className="p-8 bg-muted">
          <div
            className="border-2 border-dashed border-border"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${columns}, 1fr)`,
              gridTemplateRows: `repeat(${rows}, 100px)`,
              columnGap: `${columnGap}px`,
              rowGap: `${rowGap}px`
            }}
          >
            {Array.from({ length: parseInt(columns) * parseInt(rows) }, (_, i) => (
              <div key={i} className="bg-primary text-primary-foreground p-4 rounded flex items-center justify-center">
                {i + 1}
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="columns">Columns: {columns}</Label>
              <Input
                id="columns"
                type="range"
                min="1"
                max="6"
                value={columns}
                onChange={(e) => setColumns(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rows">Rows: {rows}</Label>
              <Input
                id="rows"
                type="range"
                min="1"
                max="6"
                value={rows}
                onChange={(e) => setRows(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="columnGap">Column Gap: {columnGap}px</Label>
              <Input
                id="columnGap"
                type="range"
                min="0"
                max="48"
                step="4"
                value={columnGap}
                onChange={(e) => setColumnGap(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rowGap">Row Gap: {rowGap}px</Label>
              <Input
                id="rowGap"
                type="range"
                min="0"
                max="48"
                step="4"
                value={rowGap}
                onChange={(e) => setRowGap(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>CSS Code</Label>
              <Button onClick={() => {
                navigator.clipboard.writeText(cssCode);
                toast.success("Copied!");
              }} size="sm">
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </Button>
            </div>
            <Textarea value={cssCode} readOnly rows={7} className="font-mono text-xs" />
          </div>
        </Card>
      </div>
    </ToolLayout>
  );
}
