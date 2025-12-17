import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UsageGuide } from "@/components/UsageGuide";

const RemoveDuplicates = () => {
  const [input, setInput] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const { toast } = useToast();

  const removeDuplicates = () => {
    const lines = input.split("\n");
    const seen = new Set<string>();
    const unique: string[] = [];

    lines.forEach(line => {
      const key = caseSensitive ? line : line.toLowerCase();
      if (!seen.has(key) && line.trim()) {
        seen.add(key);
        unique.push(line);
      }
    });

    return unique.join("\n");
  };

  const output = removeDuplicates();
  const duplicateCount = input.split("\n").filter(l => l.trim()).length - output.split("\n").filter(l => l.trim()).length;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    toast({
      title: "Copied!",
      description: "Unique lines copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="Remove Duplicate Lines"
      description="Remove duplicate lines from text"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Paste your text with each item on a separate line",
            "Enable \"Case sensitive\" if you want to treat uppercase and lowercase differently",
            "Duplicate lines are automatically removed",
            "The tool shows how many duplicates were found"
          ]}
          tips={[
            "Perfect for cleaning up lists, emails, or data sets",
            "First occurrence of each line is kept",
            "Case insensitive by default (\"Apple\" = \"apple\")",
            "Empty lines are automatically removed",
            "Original order is preserved"
          ]}
        />

        <div className="space-y-2">
          <Label>Input Text</Label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text with duplicate lines..."
            rows={10}
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="caseSensitive"
            checked={caseSensitive}
            onChange={(e) => setCaseSensitive(e.target.checked)}
            className="rounded"
          />
          <Label htmlFor="caseSensitive" className="cursor-pointer">
            Case sensitive
          </Label>
        </div>

        {output && (
          <>
            <div className="p-4 bg-primary/5 border-l-4 border-primary rounded">
              <div className="text-sm font-semibold">
                Removed {duplicateCount} duplicate line{duplicateCount !== 1 ? 's' : ''}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Unique Lines</Label>
                <Button onClick={copyToClipboard} variant="ghost" size="sm">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
              </div>
              <Textarea value={output} readOnly rows={10} className="bg-muted" />
            </div>
          </>
        )}
      </div>
    </ToolLayout>
  );
};

export default RemoveDuplicates;