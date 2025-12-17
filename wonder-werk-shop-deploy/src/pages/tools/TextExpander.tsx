import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

interface Abbreviation {
  short: string;
  full: string;
}

export default function TextExpander() {
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");
  const [abbreviations, setAbbreviations] = useState<Abbreviation[]>([
    { short: "btw", full: "by the way" },
    { short: "fyi", full: "for your information" },
    { short: "asap", full: "as soon as possible" }
  ]);
  const [newShort, setNewShort] = useState("");
  const [newFull, setNewFull] = useState("");

  const addAbbreviation = () => {
    if (newShort && newFull) {
      setAbbreviations([...abbreviations, { short: newShort, full: newFull }]);
      setNewShort("");
      setNewFull("");
    }
  };

  const removeAbbreviation = (index: number) => {
    setAbbreviations(abbreviations.filter((_, i) => i !== index));
  };

  const expandText = () => {
    let result = text;
    abbreviations.forEach(({ short, full }) => {
      const regex = new RegExp(`\\b${short}\\b`, 'gi');
      result = result.replace(regex, full);
    });
    setOutput(result);
  };

  return (
    <ToolLayout
      title="Text Expander"
      description="Expand abbreviated text into full words or phrases"
    >
      <div className="space-y-6">
        <Card className="p-4">
          <h3 className="font-semibold mb-3">Abbreviations</h3>
          <div className="space-y-2 mb-4">
            {abbreviations.map((abbr, index) => (
              <div key={index} className="flex items-center gap-2">
                <code className="bg-muted px-2 py-1 rounded text-sm flex-1">
                  {abbr.short} → {abbr.full}
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeAbbreviation(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
          
          <div className="flex gap-2">
            <Input
              placeholder="Short form (e.g., btw)"
              value={newShort}
              onChange={(e) => setNewShort(e.target.value)}
            />
            <Input
              placeholder="Full form (e.g., by the way)"
              value={newFull}
              onChange={(e) => setNewFull(e.target.value)}
            />
            <Button onClick={addAbbreviation}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </Card>

        <div className="space-y-2">
          <Label>Input Text</Label>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={8}
            placeholder="Enter text with abbreviations..."
          />
        </div>

        <Button onClick={expandText} className="w-full">
          Expand Text
        </Button>

        {output && (
          <div className="space-y-2">
            <Label>Expanded Text</Label>
            <Textarea value={output} readOnly rows={8} />
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
