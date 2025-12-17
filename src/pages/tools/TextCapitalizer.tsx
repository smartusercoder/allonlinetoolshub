import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ExportResults } from "@/components/ExportResults";

export default function TextCapitalizer() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const capitalizeFirst = () => {
    const result = input.replace(/\b\w/g, c => c.toUpperCase());
    setOutput(result);
  };

  const capitalizeSentences = () => {
    const result = input.replace(/(^\w|\.\s+\w)/gm, c => c.toUpperCase());
    setOutput(result);
  };

  return (
    <ToolLayout
      title="Text Capitalizer"
      description="Capitalize first letters of words or sentences"
      keywords={["text capitalizer", "capitalize text", "capitalize words", "sentence case", "title case converter"]}
    >
      <div className="space-y-4">
        <Textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          rows={8}
          placeholder="Enter text to capitalize..."
        />
        <div className="flex gap-2">
          <Button onClick={capitalizeFirst} className="flex-1">Capitalize Words</Button>
          <Button onClick={capitalizeSentences} className="flex-1">Capitalize Sentences</Button>
        </div>
        {output && (
          <>
            <Textarea value={output} readOnly rows={8} />
            <ExportResults data={output} filename="capitalized-text" />
          </>
        )}
      </div>
    </ToolLayout>
  );
}
