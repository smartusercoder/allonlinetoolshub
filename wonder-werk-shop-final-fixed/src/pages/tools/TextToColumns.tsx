import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function TextToColumns() {
  const [text, setText] = useState("");
  const [delimiter, setDelimiter] = useState(",");
  const [output, setOutput] = useState<string[][]>([]);

  const split = () => {
    const lines = text.split('\n');
    const result = lines.map(line => 
      line.split(delimiter).map(col => col.trim())
    );
    setOutput(result);
  };

  return (
    <ToolLayout
      title="Text to Columns"
      description="Split text into columns using delimiters"
    >
      <div className="space-y-4">
        <div>
          <Label>Input Text</Label>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={8}
            placeholder="Enter text to split..."
          />
        </div>
        
        <div>
          <Label>Delimiter</Label>
          <Input
            value={delimiter}
            onChange={(e) => setDelimiter(e.target.value)}
            placeholder="Enter delimiter (comma, tab, etc.)"
          />
        </div>
        
        <Button onClick={split} className="w-full">Split Text</Button>
        
        {output.length > 0 && (
          <div className="overflow-auto">
            <table className="w-full border-collapse border">
              <tbody>
                {output.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j} className="border p-2 text-sm">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
