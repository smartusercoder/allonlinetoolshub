import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UsageGuide } from "@/components/UsageGuide";

const HtmlMinifier = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const minify = () => {
    let result = input;
    
    // Remove HTML comments
    result = result.replace(/<!--[\s\S]*?-->/g, '');
    
    // Remove extra whitespace between tags
    result = result.replace(/>\s+</g, '><');
    
    // Remove extra whitespace
    result = result.replace(/\s+/g, ' ');
    
    setOutput(result.trim());
  };

  const beautify = () => {
    let result = input;
    let indent = 0;
    let formatted = '';
    let inTag = false;
    
    for (let i = 0; i < result.length; i++) {
      const char = result[i];
      const nextChar = result[i + 1];
      
      if (char === '<') {
        if (nextChar === '/') {
          indent = Math.max(0, indent - 1);
          formatted += '\n' + '  '.repeat(indent);
        } else if (nextChar !== '!') {
          formatted += '\n' + '  '.repeat(indent);
        }
        inTag = true;
      }
      
      formatted += char;
      
      if (char === '>') {
        inTag = false;
        if (result[i - 1] !== '/' && !result.substring(i - 6, i + 1).includes('</')) {
          if (!['br', 'hr', 'img', 'input', 'meta', 'link'].some(tag => 
            result.substring(Math.max(0, i - 20), i).includes('<' + tag)
          )) {
            indent++;
          }
        }
      }
    }
    
    setOutput(formatted.trim());
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    toast({
      title: "Copied!",
      description: "HTML copied to clipboard",
    });
  };

  const savingsPercent = input && output 
    ? (((input.length - output.length) / input.length) * 100).toFixed(1)
    : "0";

  return (
    <ToolLayout
      title="HTML Minifier/Beautifier"
      description="Minify or beautify HTML code"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Paste your HTML code in the input field",
            "Click \"Minify\" to compress or \"Beautify\" to format",
            "View file size reduction percentage",
            "Copy the processed output"
          ]}
          tips={[
            "Minify reduces file size for faster loading",
            "Beautify makes code readable for editing",
            "Removes comments and extra whitespace when minifying",
            "Great for optimizing production HTML"
          ]}
        />
        <div className="space-y-2">
          <Label>Input HTML</Label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter HTML code..."
            rows={12}
            className="font-mono text-sm"
          />
        </div>

        <div className="flex gap-3">
          <Button onClick={minify} className="flex-1">
            Minify HTML
          </Button>
          <Button onClick={beautify} variant="secondary" className="flex-1">
            Beautify HTML
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
                <Label>Output HTML</Label>
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

export default HtmlMinifier;