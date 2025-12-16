import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ExportResults } from "@/components/ExportResults";

export default function CharacterRemover() {
  const [input, setInput] = useState("");
  const [chars, setChars] = useState("");
  const [output, setOutput] = useState("");

  const removeChars = () => {
    const regex = new RegExp(`[${chars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`, 'g');
    setOutput(input.replace(regex, ''));
  };

  return (
    <ToolLayout
      title="Character Remover"
      description="Remove specific characters from text"
      keywords={["remove characters", "delete characters", "strip characters", "character filter"]}
    >
      <div className="space-y-4">
        <Input
          value={chars}
          onChange={e => setChars(e.target.value)}
          placeholder="Characters to remove (e.g., @#$%)"
        />
        <Textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          rows={8}
          placeholder="Enter text..."
        />
        <Button onClick={removeChars} className="w-full">Remove Characters</Button>
        {output && (
          <>
            <Textarea value={output} readOnly rows={8} />
            <ExportResults data={output} filename="filtered-text" />
          </>
        )}
      </div>
    </ToolLayout>
  );
}
