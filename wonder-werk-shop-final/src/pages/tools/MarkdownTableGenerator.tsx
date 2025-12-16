import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Plus, Minus, Grid3X3 } from "lucide-react";
import { toast } from "sonner";

const MarkdownTableGenerator = () => {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [data, setData] = useState<string[][]>(() => 
    Array(3).fill(null).map(() => Array(3).fill(""))
  );
  const [alignment, setAlignment] = useState<("left" | "center" | "right")[]>(
    Array(3).fill("left")
  );

  const updateCell = (row: number, col: number, value: string) => {
    const newData = [...data];
    newData[row][col] = value;
    setData(newData);
  };

  const addRow = () => {
    setRows(r => r + 1);
    setData(d => [...d, Array(cols).fill("")]);
  };

  const removeRow = () => {
    if (rows > 2) {
      setRows(r => r - 1);
      setData(d => d.slice(0, -1));
    }
  };

  const addCol = () => {
    setCols(c => c + 1);
    setData(d => d.map(row => [...row, ""]));
    setAlignment(a => [...a, "left"]);
  };

  const removeCol = () => {
    if (cols > 1) {
      setCols(c => c - 1);
      setData(d => d.map(row => row.slice(0, -1)));
      setAlignment(a => a.slice(0, -1));
    }
  };

  const updateAlignment = (col: number, value: "left" | "center" | "right") => {
    const newAlignment = [...alignment];
    newAlignment[col] = value;
    setAlignment(newAlignment);
  };

  const generateMarkdown = (): string => {
    const header = data[0];
    const headerRow = `| ${header.map(h => h || " ").join(" | ")} |`;
    
    const separatorRow = `| ${alignment.map(a => {
      switch (a) {
        case "center": return ":---:";
        case "right": return "---:";
        default: return "---";
      }
    }).join(" | ")} |`;

    const bodyRows = data.slice(1).map(row => 
      `| ${row.map(cell => cell || " ").join(" | ")} |`
    );

    return [headerRow, separatorRow, ...bodyRows].join("\n");
  };

  const markdown = generateMarkdown();

  const copyMarkdown = () => {
    navigator.clipboard.writeText(markdown);
    toast.success("Markdown table copied!");
  };

  return (
    <ToolLayout
      title="Markdown Table Generator"
      description="Create markdown tables with custom rows, columns, and alignment"
    >
      <div className="space-y-6">
        {/* Controls */}
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Label>Rows:</Label>
            <Button variant="outline" size="icon" onClick={removeRow}>
              <Minus className="w-4 h-4" />
            </Button>
            <span className="w-8 text-center">{rows}</span>
            <Button variant="outline" size="icon" onClick={addRow}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Label>Columns:</Label>
            <Button variant="outline" size="icon" onClick={removeCol}>
              <Minus className="w-4 h-4" />
            </Button>
            <span className="w-8 text-center">{cols}</span>
            <Button variant="outline" size="icon" onClick={addCol}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Column Alignment */}
        <div className="space-y-2">
          <Label>Column Alignment</Label>
          <div className="flex flex-wrap gap-2">
            {alignment.map((align, i) => (
              <Select key={i} value={align} onValueChange={(v) => updateAlignment(i, v as "left" | "center" | "right")}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
            ))}
          </div>
        </div>

        {/* Table Editor */}
        <div className="space-y-2">
          <Label>Table Data (first row is header)</Label>
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full">
              {data.map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-1 mb-1">
                  {row.map((cell, colIndex) => (
                    <Input
                      key={`${rowIndex}-${colIndex}`}
                      value={cell}
                      onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}
                      placeholder={rowIndex === 0 ? `Header ${colIndex + 1}` : `Cell ${rowIndex},${colIndex + 1}`}
                      className={`w-32 ${rowIndex === 0 ? "font-bold bg-muted" : ""}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="space-y-2">
          <Label>Preview</Label>
          <div className="p-4 bg-muted rounded-lg overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  {data[0].map((cell, i) => (
                    <th key={i} className={`px-4 py-2 border text-${alignment[i]}`}>
                      {cell || "-"}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.slice(1).map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, colIndex) => (
                      <td key={colIndex} className={`px-4 py-2 border text-${alignment[colIndex]}`}>
                        {cell || "-"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Markdown Output */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Markdown Code</Label>
            <Button variant="outline" size="sm" onClick={copyMarkdown}>
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
          </div>
          <Textarea
            value={markdown}
            readOnly
            className="min-h-[150px] font-mono text-sm"
          />
        </div>
      </div>
    </ToolLayout>
  );
};

export default MarkdownTableGenerator;
