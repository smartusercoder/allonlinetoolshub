import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function JsDeobfuscator() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const deobfuscate = () => {
    try {
      // Basic beautification
      let code = input;
      
      // Add line breaks after semicolons
      code = code.replace(/;/g, ';\n');
      
      // Add line breaks after opening braces
      code = code.replace(/{/g, '{\n');
      
      // Add line breaks before closing braces
      code = code.replace(/}/g, '\n}');
      
      // Add indentation
      const lines = code.split('\n');
      let indent = 0;
      const formatted = lines.map(line => {
        const trimmed = line.trim();
        if (trimmed.startsWith('}')) indent = Math.max(0, indent - 1);
        const result = '  '.repeat(indent) + trimmed;
        if (trimmed.endsWith('{')) indent++;
        return result;
      }).join('\n');
      
      setOutput(formatted);
    } catch {
      setOutput("Error deobfuscating code");
    }
  };

  return (
    <ToolLayout
      title="JavaScript DeObfuscator"
      description="Beautify and deobfuscate JavaScript code"
    >
      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <Label>Obfuscated JavaScript</Label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={10}
            placeholder="Paste obfuscated JavaScript..."
            className="font-mono"
          />
        </div>
        
        <Button onClick={deobfuscate} className="w-full">
          Deobfuscate
        </Button>
        
        {output && (
          <div className="space-y-2">
            <Label>Deobfuscated Code</Label>
            <Textarea
              value={output}
              readOnly
              rows={15}
              className="font-mono"
            />
          </div>
        )}
      </Card>
    </ToolLayout>
  );
}
