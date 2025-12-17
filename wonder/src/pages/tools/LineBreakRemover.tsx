import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ExportResults } from "@/components/ExportResults";

export default function LineBreakRemover() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const removeBreaks = () => {
    setOutput(input.replace(/\n/g, " ").replace(/\s+/g, " ").trim());
  };

  const replaceWithSpace = () => {
    setOutput(input.replace(/\n+/g, " "));
  };

  return (
    <ToolLayout
      title="Line Break Remover"
      description="Remove line breaks from text"
      keywords={["remove line breaks", "delete line breaks", "remove newlines", "join lines"]}
    >
      <div className="space-y-4">
        <Textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          rows={8}
          placeholder="Paste text with line breaks..."
        />
        <div className="flex gap-2">
          <Button onClick={removeBreaks} className="flex-1">Remove All Breaks</Button>
          <Button onClick={replaceWithSpace} className="flex-1">Replace with Space</Button>
        </div>
        {output && (
          <>
            <Textarea value={output} readOnly rows={8} />
            <ExportResults data={output} filename="text-no-breaks" />
          </>
        )}
      </div>
    </ToolLayout>
  );
}
