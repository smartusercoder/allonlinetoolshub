import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ExportResults } from "@/components/ExportResults";

export default function TextJoiner() {
  const [input, setInput] = useState("");
  const [separator, setSeparator] = useState(", ");
  const [output, setOutput] = useState("");

  const joinLines = () => {
    const lines = input.split("\n").filter(l => l.trim());
    setOutput(lines.join(separator));
  };

  return (
    <ToolLayout
      title="Text Joiner"
      description="Join multiple lines with custom separator"
      keywords={["join text", "merge lines", "combine text", "line joiner", "text combiner"]}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Separator</Label>
          <Input
            value={separator}
            onChange={e => setSeparator(e.target.value)}
            placeholder=", "
          />
        </div>
        <Textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          rows={8}
          placeholder="Enter lines to join..."
        />
        <Button onClick={joinLines} className="w-full">Join Lines</Button>
        {output && (
          <>
            <Textarea value={output} readOnly rows={4} />
            <ExportResults data={output} filename="joined-text" />
          </>
        )}
      </div>
    </ToolLayout>
  );
}
