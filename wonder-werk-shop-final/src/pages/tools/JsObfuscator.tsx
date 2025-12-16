import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function JsObfuscator() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const obfuscate = () => {
    try {
      // Simple obfuscation - variable renaming and minification
      let code = input;
      
      // Remove comments
      code = code.replace(/\/\*[\s\S]*?\*\//g, '');
      code = code.replace(/\/\/.*/g, '');
      
      // Remove extra whitespace
      code = code.replace(/\s+/g, ' ');
      
      // Simple variable name obfuscation
      const varNames = code.match(/\b(?:var|let|const)\s+(\w+)/g) || [];
      varNames.forEach((match, index) => {
        const varName = match.split(/\s+/)[1];
        const obfuscatedName = '_0x' + index.toString(16);
        const regex = new RegExp(`\\b${varName}\\b`, 'g');
        code = code.replace(regex, obfuscatedName);
      });
      
      setOutput(code);
    } catch {
      setOutput("Error obfuscating code");
    }
  };

  return (
    <ToolLayout
      title="JavaScript Obfuscator"
      description="Obfuscate JavaScript code (basic)"
    >
      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <Label>JavaScript Code</Label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={10}
            placeholder="function hello() { console.log('Hello'); }"
            className="font-mono"
          />
        </div>
        
        <Button onClick={obfuscate} className="w-full">
          Obfuscate
        </Button>
        
        {output && (
          <div className="space-y-2">
            <Label>Obfuscated Code</Label>
            <Textarea
              value={output}
              readOnly
              rows={10}
              className="font-mono"
            />
          </div>
        )}
      </Card>
    </ToolLayout>
  );
}
