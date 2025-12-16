import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ExportResults } from "@/components/ExportResults";

export default function TextSplitter() {
  const [input, setInput] = useState("");
  const [delimiter, setDelimiter] = useState(",");
  const [output, setOutput] = useState("");

  const splitText = () => {
    const parts = input.split(delimiter).filter(p => p.trim());
    setOutput(parts.map(p => p.trim()).join("\n"));
  };

  return (
    <ToolLayout
      title="Text Splitter"
      description="Split text by delimiter into separate lines"
      keywords={["split text", "text splitter", "divide text", "separate text", "delimiter"]}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Delimiter</Label>
          <Input
            value={delimiter}
            onChange={e => setDelimiter(e.target.value)}
            placeholder=","
          />
        </div>
        <Textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          rows={6}
          placeholder="Enter text to split..."
        />
        <Button onClick={splitText} className="w-full">Split Text</Button>
        {output && (
          <>
            <Textarea value={output} readOnly rows={8} />
            <ExportResults data={output} filename="split-text" />
          </>
        )}
      </div>
    </ToolLayout>
  );
}
