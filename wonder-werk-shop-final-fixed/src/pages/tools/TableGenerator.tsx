import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TableGenerator() {
  const [rows, setRows] = useState("3");
  const [cols, setCols] = useState("3");
  const [headers, setHeaders] = useState<string[]>([]);
  const [data, setData] = useState<string[][]>([]);

  const generateTable = () => {
    const r = parseInt(rows) || 3;
    const c = parseInt(cols) || 3;
    
    setHeaders(Array(c).fill("").map((_, i) => `Header ${i + 1}`));
    setData(Array(r).fill(null).map(() => Array(c).fill("")));
  };

  const getMarkdown = () => {
    let md = "| " + headers.join(" | ") + " |\n";
    md += "| " + headers.map(() => "---").join(" | ") + " |\n";
    data.forEach(row => {
      md += "| " + row.map(cell => cell || " ").join(" | ") + " |\n";
    });
    return md;
  };

  const getHTML = () => {
    let html = "<table>\n  <thead>\n    <tr>\n";
    headers.forEach(h => html += `      <th>${h}</th>\n`);
    html += "    </tr>\n  </thead>\n  <tbody>\n";
    data.forEach(row => {
      html += "    <tr>\n";
      row.forEach(cell => html += `      <td>${cell || ""}</td>\n`);
      html += "    </tr>\n";
    });
    html += "  </tbody>\n</table>";
    return html;
  };

  return (
    <ToolLayout
      title="Table Generator"
      description="Generate HTML and Markdown tables"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Rows</Label>
            <Input
              type="number"
              value={rows}
              onChange={(e) => setRows(e.target.value)}
              min="1"
              max="20"
            />
          </div>
          <div>
            <Label>Columns</Label>
            <Input
              type="number"
              value={cols}
              onChange={(e) => setCols(e.target.value)}
              min="1"
              max="10"
            />
          </div>
        </div>

        <Button onClick={generateTable} className="w-full">
          Generate Table
        </Button>

        {headers.length > 0 && (
          <>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border">
                <thead>
                  <tr>
                    {headers.map((h, i) => (
                      <th key={i} className="border p-2">
                        <Input
                          value={h}
                          onChange={(e) => {
                            const newHeaders = [...headers];
                            newHeaders[i] = e.target.value;
                            setHeaders(newHeaders);
                          }}
                        />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, ri) => (
                    <tr key={ri}>
                      {row.map((cell, ci) => (
                        <td key={ci} className="border p-2">
                          <Input
                            value={cell}
                            onChange={(e) => {
                              const newData = [...data];
                              newData[ri][ci] = e.target.value;
                              setData(newData);
                            }}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Tabs defaultValue="markdown">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="markdown">Markdown</TabsTrigger>
                <TabsTrigger value="html">HTML</TabsTrigger>
              </TabsList>
              <TabsContent value="markdown">
                <Textarea value={getMarkdown()} readOnly rows={10} />
              </TabsContent>
              <TabsContent value="html">
                <Textarea value={getHTML()} readOnly rows={10} />
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </ToolLayout>
  );
}
