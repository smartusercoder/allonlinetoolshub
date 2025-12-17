import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UsageGuide } from "@/components/UsageGuide";

const FindReplace = () => {
  const [input, setInput] = useState("");
  const [find, setFind] = useState("");
  const [replace, setReplace] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [useRegex, setUseRegex] = useState(false);
  const { toast } = useToast();

  const performReplace = () => {
    if (!find) return input;

    try {
      if (useRegex) {
        const flags = caseSensitive ? "g" : "gi";
        const regex = new RegExp(find, flags);
        return input.replace(regex, replace);
      } else {
        const flags = caseSensitive ? "g" : "gi";
        const regex = new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), flags);
        return input.replace(regex, replace);
      }
    } catch {
      toast({
        title: "Invalid regex",
        description: "Please check your regular expression syntax",
        variant: "destructive",
      });
      return input;
    }
  };

  const output = performReplace();
  const matchCount = input.split(new RegExp(find, caseSensitive ? "g" : "gi")).length - 1;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    toast({
      title: "Copied!",
      description: "Result copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="Find and Replace"
      description="Find and replace text in bulk"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Paste your text in the input area",
            "Enter the text you want to find",
            "Enter the replacement text",
            "Enable options if needed (case sensitive or regex)",
            "The replaced text appears automatically below"
          ]}
          tips={[
            "Case sensitive treats \"Hello\" and \"hello\" as different",
            "Use regex for advanced patterns (e.g., \\d+ for numbers)",
            "Shows how many matches were found",
            "Leave replacement empty to delete all matches",
            "Great for bulk text editing and cleanup"
          ]}
          example='Find: "old" → Replace: "new"'
        />

        <div className="space-y-2">
          <Label>Input Text</Label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text..."
            rows={8}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Find</Label>
            <Input
              value={find}
              onChange={(e) => setFind(e.target.value)}
              placeholder="Text to find..."
            />
          </div>
          <div className="space-y-2">
            <Label>Replace with</Label>
            <Input
              value={replace}
              onChange={(e) => setReplace(e.target.value)}
              placeholder="Replacement text..."
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
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
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="useRegex"
              checked={useRegex}
              onChange={(e) => setUseRegex(e.target.checked)}
              className="rounded"
            />
            <Label htmlFor="useRegex" className="cursor-pointer">
              Use regex
            </Label>
          </div>
        </div>

        {find && (
          <div className="p-4 bg-primary/5 border-l-4 border-primary rounded">
            <div className="text-sm font-semibold">
              Found {matchCount} match{matchCount !== 1 ? 'es' : ''}
            </div>
          </div>
        )}

        {output && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Output</Label>
              <Button onClick={copyToClipboard} variant="ghost" size="sm">
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
            <Textarea value={output} readOnly rows={8} className="bg-muted" />
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default FindReplace;