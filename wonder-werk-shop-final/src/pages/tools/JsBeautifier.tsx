import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UsageGuide } from "@/components/UsageGuide";

export default function JsBeautifier() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const beautify = () => {
    try {
      // Simple JS beautifier
      let formatted = input
        .replace(/\s*{\s*/g, ' {\n  ')
        .replace(/\s*}\s*/g, '\n}\n')
        .replace(/\s*;\s*/g, ';\n')
        .replace(/\s*,\s*/g, ', ')
        .trim();
      
      setOutput(formatted);
      toast({
        title: "Success",
        description: "JavaScript beautified successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to beautify JavaScript",
        variant: "destructive",
      });
    }
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    toast({
      title: "Copied!",
      description: "Beautified JavaScript copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="JavaScript Beautifier"
      description="Format and beautify JavaScript code"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Paste minified or compressed JavaScript code",
            "Click \"Beautify JavaScript\"",
            "View formatted code with proper indentation",
            "Copy the beautified output"
          ]}
          tips={[
            "Makes minified JS readable for debugging",
            "Useful for examining production bundles",
            "Great for reviewing third-party libraries",
            "Helps understand obfuscated code"
          ]}
        />
      </div>
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium">Input JavaScript</label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste minified JavaScript..."
              rows={10}
              className="font-mono text-sm"
            />
          </div>

          <Button onClick={beautify} className="w-full">
            Beautify JavaScript
          </Button>

          {output && (
            <div className="space-y-2">
              <label className="block text-sm font-medium">Beautified JavaScript</label>
              <Textarea
                value={output}
                readOnly
                rows={10}
                className="bg-muted font-mono text-sm"
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
