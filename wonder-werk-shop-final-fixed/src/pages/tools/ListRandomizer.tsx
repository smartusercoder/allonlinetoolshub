import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ListRandomizer() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const randomize = () => {
    const lines = input.split('\n').filter(line => line.trim());
    const shuffled = [...lines].sort(() => Math.random() - 0.5);
    setOutput(shuffled.join('\n'));
  };

  return (
    <ToolLayout
      title="List Randomizer"
      description="Randomly shuffle and reorder list items"
    >
      <div className="space-y-4">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={10}
          placeholder="Enter list items (one per line)..."
        />
        
        <Button onClick={randomize} className="w-full">
          Randomize List
        </Button>
        
        {output && (
          <Textarea value={output} readOnly rows={10} />
        )}
      </div>
    </ToolLayout>
  );
}
