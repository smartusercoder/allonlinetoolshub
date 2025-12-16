import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UsageGuide } from "@/components/UsageGuide";

export default function DiacriticRemover() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const removeDiacritics = () => {
    const normalized = input.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    setOutput(normalized);
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    toast({
      title: "Copied!",
      description: "Output copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="Remove Accents & Diacritics"
      description="Remove accents and diacritical marks from text"
    >
      <UsageGuide
        steps={[
          "Paste text with accented characters",
          "Click 'Remove Accents'",
          "Get plain ASCII text without diacritics",
          "Copy the result to use it"
        ]}
        tips={[
          "Converts café → cafe, naïve → naive",
          "Great for creating URL slugs",
          "Useful for database compatibility",
          "Perfect for ASCII-only systems"
        ]}
        example='"Señor José Pérez" → "Senor Jose Perez"'
      />
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium">Input Text</label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text with accents (e.g., café, naïve, señor)..."
              rows={8}
            />
          </div>

          <Button onClick={removeDiacritics} className="w-full">
            Remove Accents
          </Button>

          {output && (
            <div className="space-y-2">
              <label className="block text-sm font-medium">Output</label>
              <Textarea
                value={output}
                readOnly
                rows={8}
                className="bg-muted"
              />
              <Button onClick={copyOutput} variant="outline" className="w-full">
                <Copy className="w-4 h-4 mr-2" />
                Copy Output
              </Button>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
}
