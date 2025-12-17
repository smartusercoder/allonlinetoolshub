import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function TextAlternator() {
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");

  const alternateCase = () => {
    const result = text
      .split('')
      .map((char, i) => 
        i % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
      )
      .join('');
    setOutput(result);
  };

  return (
    <ToolLayout
      title="Alternating Case Generator"
      description="Create alternating case text (aLtErNaTiNg CaSe)"
    >
      <div className="space-y-4">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
          placeholder="Enter text..."
        />
        
        <Button onClick={alternateCase} className="w-full">
          Generate Alternating Case
        </Button>
        
        {output && (
          <Textarea value={output} readOnly rows={6} />
        )}
      </div>
    </ToolLayout>
  );
}
