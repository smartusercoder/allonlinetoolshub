import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UsageGuide } from "@/components/UsageGuide";

export default function CssBeautifier() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const beautify = () => {
    try {
      // Simple CSS beautifier
      let formatted = input
        .replace(/\s*{\s*/g, ' {\n  ')
        .replace(/\s*}\s*/g, '\n}\n')
        .replace(/\s*;\s*/g, ';\n  ')
        .replace(/\s*,\s*/g, ', ')
        .replace(/:\s*/g, ': ')
        .trim();
      
      setOutput(formatted);
      toast({
        title: "Success",
        description: "CSS beautified successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to beautify CSS",
        variant: "destructive",
      });
    }
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    toast({
      title: "Copied!",
      description: "Beautified CSS copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="CSS Beautifier"
      description="Format and beautify CSS code"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Paste minified or unformatted CSS",
            "Click \"Beautify CSS\"",
            "View formatted CSS with proper indentation",
            "Copy the clean output"
          ]}
          tips={[
            "Makes compressed CSS readable",
            "Great for debugging production stylesheets",
            "Helps maintain consistent formatting",
            "Useful for code reviews"
          ]}
        />
      </div>
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium">Input CSS</label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste minified CSS..."
              rows={10}
              className="font-mono text-sm"
            />
          </div>

          <Button onClick={beautify} className="w-full">
            Beautify CSS
          </Button>

          {output && (
            <div className="space-y-2">
              <label className="block text-sm font-medium">Beautified CSS</label>
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
