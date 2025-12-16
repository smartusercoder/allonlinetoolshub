import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, ArrowLeftRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UsageGuide } from "@/components/UsageGuide";

const TextReverser = () => {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"text" | "words" | "lines">("text");
  const { toast } = useToast();

  const reverse = () => {
    switch (mode) {
      case "text":
        return input.split("").reverse().join("");
      case "words":
        return input.split(" ").reverse().join(" ");
      case "lines":
        return input.split("\n").reverse().join("\n");
      default:
        return input;
    }
  };

  const output = reverse();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    toast({
      title: "Copied!",
      description: "Reversed text copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="Text Reverser"
      description="Reverse text, words, or lines"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Enter or paste your text in the input area",
            "Choose how you want to reverse: Characters, Words, or Lines",
            "The reversed text will appear automatically below",
            "Click \"Copy\" to copy the result to your clipboard"
          ]}
          tips={[
            "Characters: reverses every character (\"hello\" → \"olleh\")",
            "Words: reverses word order (\"hello world\" → \"world hello\")",
            "Lines: reverses line order (useful for lists)",
            "Fun for creating mirror text or puzzle games"
          ]}
        />

        <div className="space-y-2">
          <Label>Input Text</Label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to reverse..."
            rows={8}
          />
        </div>

        <div className="space-y-2">
          <Label>Reverse Mode</Label>
          <div className="flex gap-2">
            <Button
              onClick={() => setMode("text")}
              variant={mode === "text" ? "default" : "outline"}
            >
              Characters
            </Button>
            <Button
              onClick={() => setMode("words")}
              variant={mode === "words" ? "default" : "outline"}
            >
              Words
            </Button>
            <Button
              onClick={() => setMode("lines")}
              variant={mode === "lines" ? "default" : "outline"}
            >
              Lines
            </Button>
          </div>
        </div>

        {output && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Reversed Text</Label>
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

export default TextReverser;