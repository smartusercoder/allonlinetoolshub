import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UsageGuide } from "@/components/UsageGuide";

const CssMinifier = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const minify = () => {
    let result = input;
    
    // Remove comments
    result = result.replace(/\/\*[\s\S]*?\*\//g, '');
    
    // Remove whitespace
    result = result.replace(/\s+/g, ' ');
    result = result.replace(/\s*{\s*/g, '{');
    result = result.replace(/\s*}\s*/g, '}');
    result = result.replace(/\s*:\s*/g, ':');
    result = result.replace(/\s*;\s*/g, ';');
    result = result.replace(/\s*,\s*/g, ',');
    
    // Remove last semicolon in blocks
    result = result.replace(/;}/g, '}');
    
    setOutput(result.trim());
  };

  const beautify = () => {
    let result = input;
    result = result.replace(/}/g, '}\n');
    result = result.replace(/{/g, ' {\n  ');
    result = result.replace(/;/g, ';\n  ');
    result = result.replace(/,/g, ', ');
    
    // Fix indentation
    const lines = result.split('\n');
    let indent = 0;
    result = lines.map(line => {
      line = line.trim();
      if (line.includes('}')) indent = Math.max(0, indent - 1);
      const indented = '  '.repeat(indent) + line;
      if (line.includes('{')) indent++;
      return indented;
    }).join('\n');
    
    setOutput(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    toast({
      title: "Copied!",
      description: "CSS copied to clipboard",
    });
  };

  const savingsPercent = input && output 
    ? (((input.length - output.length) / input.length) * 100).toFixed(1)
    : "0";

  return (
    <ToolLayout
      title="CSS Minifier/Beautifier"
      description="Minify or beautify CSS code"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Paste your CSS code",
            "Click \"Minify\" to compress or \"Beautify\" to format",
            "View file size savings percentage",
            "Copy the processed output"
          ]}
          tips={[
            "Minifying reduces CSS file size dramatically",
            "Removes comments, whitespace, and unnecessary semicolons",
            "Speeds up page load times",
            "Beautify when you need to edit minified CSS"
          ]}
        />
        <div className="space-y-2">
          <Label>Input CSS</Label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter CSS code..."
            rows={12}
            className="font-mono text-sm"
          />
        </div>

        <div className="flex gap-3">
          <Button onClick={minify} className="flex-1">
            Minify CSS
          </Button>
          <Button onClick={beautify} variant="secondary" className="flex-1">
            Beautify CSS
          </Button>
        </div>

        {output && (
          <>
            <div className="flex items-center gap-4 text-sm">
              <div className="text-muted-foreground">
                Original: <span className="font-semibold text-foreground">{input.length}</span> chars
              </div>
              <div className="text-muted-foreground">
                Result: <span className="font-semibold text-foreground">{output.length}</span> chars
              </div>
              <div className="text-green-600 dark:text-green-400 font-semibold">
                Saved {savingsPercent}%
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Output CSS</Label>
                <Button onClick={copyToClipboard} variant="ghost" size="sm">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
              </div>
              <Textarea
                value={output}
                readOnly
                rows={12}
                className="font-mono text-sm bg-muted"
              />
            </div>
          </>
        )}
      </div>
    </ToolLayout>
  );
};

export default CssMinifier;