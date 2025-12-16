import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UsageGuide } from "@/components/UsageGuide";

const JsMinifier = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const minify = () => {
    let result = input;
    
    // Remove single-line comments
    result = result.replace(/\/\/.*$/gm, '');
    
    // Remove multi-line comments
    result = result.replace(/\/\*[\s\S]*?\*\//g, '');
    
    // Remove extra whitespace
    result = result.replace(/\s+/g, ' ');
    result = result.replace(/\s*([{}()[\];,:])\s*/g, '$1');
    
    // Remove spaces around operators
    result = result.replace(/\s*([+\-*/%=<>!&|])\s*/g, '$1');
    
    setOutput(result.trim());
  };

  const beautify = () => {
    let result = input;
    let indent = 0;
    let formatted = '';
    
    for (let i = 0; i < result.length; i++) {
      const char = result[i];
      const nextChar = result[i + 1];
      
      if (char === '{' || char === '[') {
        formatted += char + '\n' + '  '.repeat(++indent);
      } else if (char === '}' || char === ']') {
        formatted += '\n' + '  '.repeat(--indent) + char;
      } else if (char === ';') {
        formatted += char + '\n' + '  '.repeat(indent);
      } else if (char === ',' && nextChar !== ' ') {
        formatted += char + ' ';
      } else {
        formatted += char;
      }
    }
    
    setOutput(formatted);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    toast({
      title: "Copied!",
      description: "JavaScript copied to clipboard",
    });
  };

  const savingsPercent = input && output 
    ? (((input.length - output.length) / input.length) * 100).toFixed(1)
    : "0";

  return (
    <ToolLayout
      title="JavaScript Minifier/Beautifier"
      description="Minify or beautify JavaScript code"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Paste your JavaScript code",
            "Click \"Minify\" to compress or \"Beautify\" to format",
            "See file size reduction percentage",
            "Copy the output code"
          ]}
          tips={[
            "Minifying reduces bundle size significantly",
            "Removes comments and unnecessary whitespace",
            "Perfect for production deployments",
            "Beautify helps when debugging minified code"
          ]}
        />
        <div className="space-y-2">
          <Label>Input JavaScript</Label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter JavaScript code..."
            rows={12}
            className="font-mono text-sm"
          />
        </div>

        <div className="flex gap-3">
          <Button onClick={minify} className="flex-1">
            Minify JS
          </Button>
          <Button onClick={beautify} variant="secondary" className="flex-1">
            Beautify JS
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
              {parseFloat(savingsPercent) > 0 && (
                <div className="text-green-600 dark:text-green-400 font-semibold">
                  Saved {savingsPercent}%
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Output JavaScript</Label>
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

export default JsMinifier;