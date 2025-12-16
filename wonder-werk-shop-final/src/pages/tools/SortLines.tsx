import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UsageGuide } from "@/components/UsageGuide";

const SortLines = () => {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"asc" | "desc" | "length">("asc");
  const { toast } = useToast();

  const sortLines = () => {
    const lines = input.split("\n").filter(line => line.trim());
    
    switch (mode) {
      case "asc":
        return lines.sort((a, b) => a.localeCompare(b)).join("\n");
      case "desc":
        return lines.sort((a, b) => b.localeCompare(a)).join("\n");
      case "length":
        return lines.sort((a, b) => a.length - b.length).join("\n");
      default:
        return input;
    }
  };

  const output = sortLines();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    toast({
      title: "Copied!",
      description: "Sorted lines copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="Sort Lines"
      description="Sort text lines alphabetically or by length"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Paste your text with each item on a separate line",
            "Select a sorting method: A→Z, Z→A, or By Length",
            "The sorted result appears instantly below",
            "Copy the sorted output using the copy button"
          ]}
          tips={[
            "Perfect for organizing lists, names, or data",
            "A→Z sorts alphabetically ascending",
            "Z→A sorts alphabetically descending",
            "By Length sorts from shortest to longest line",
            "Empty lines are automatically removed"
          ]}
        />

        <div className="space-y-2">
          <Label>Input Text</Label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter lines to sort..."
            rows={10}
          />
        </div>

        <div className="space-y-2">
          <Label>Sort Mode</Label>
          <div className="flex gap-2">
            <Button
              onClick={() => setMode("asc")}
              variant={mode === "asc" ? "default" : "outline"}
            >
              A → Z
            </Button>
            <Button
              onClick={() => setMode("desc")}
              variant={mode === "desc" ? "default" : "outline"}
            >
              Z → A
            </Button>
            <Button
              onClick={() => setMode("length")}
              variant={mode === "length" ? "default" : "outline"}
            >
              By Length
            </Button>
          </div>
        </div>

        {output && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Sorted Output</Label>
              <Button onClick={copyToClipboard} variant="ghost" size="sm">
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
            <Textarea value={output} readOnly rows={10} className="bg-muted" />
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default SortLines;