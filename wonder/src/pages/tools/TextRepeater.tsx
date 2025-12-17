import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UsageGuide } from "@/components/UsageGuide";

const TextRepeater = () => {
  const [text, setText] = useState("");
  const [count, setCount] = useState(2);
  const [separator, setSeparator] = useState("");
  const { toast } = useToast();

  const output = text ? Array(count).fill(text).join(separator) : "";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    toast({
      title: "Copied!",
      description: "Repeated text copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="Text Repeater"
      description="Repeat text multiple times with optional separator"
    >
      <UsageGuide
        steps={[
          "Enter text you want to repeat",
          "Set the repeat count (1-1000)",
          "Optionally add a separator (comma, space, newline)",
          "Repeated text appears automatically below"
        ]}
        tips={[
          "Great for creating test data",
          "Useful for filling templates",
          "Add newline separator (\\n) for line-by-line",
          "Shows total character count in output"
        ]}
        example="'Hello' × 3 with ', ' separator → 'Hello, Hello, Hello'"
      />
      <div className="space-y-6 mt-6">
        <div className="space-y-2">
          <Label>Text to Repeat</Label>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to repeat..."
            rows={4}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Repeat Count</Label>
            <Input
              type="number"
              value={count}
              onChange={(e) => setCount(Math.max(1, Number(e.target.value)))}
              min="1"
              max="1000"
            />
          </div>
          <div className="space-y-2">
            <Label>Separator (optional)</Label>
            <Input
              value={separator}
              onChange={(e) => setSeparator(e.target.value)}
              placeholder="e.g., , or space"
            />
          </div>
        </div>

        {output && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Output ({output.length} characters)</Label>
              <Button onClick={copyToClipboard} variant="ghost" size="sm">
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
            <Textarea value={output} readOnly rows={8} className="bg-muted font-mono text-sm" />
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default TextRepeater;