import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { UsageGuide } from "@/components/UsageGuide";

export default function YamlValidator() {
  const [yaml, setYaml] = useState("");
  const [result, setResult] = useState<{ valid: boolean; message: string } | null>(null);
  const { toast } = useToast();

  const validateYaml = () => {
    try {
      // Basic YAML validation
      const lines = yaml.split('\n');
      let indentStack: number[] = [];
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (!line.trim() || line.trim().startsWith('#')) continue;
        
        const indent = line.search(/\S/);
        
        // Check for tabs
        if (line.includes('\t')) {
          throw new Error(`Line ${i + 1}: Tabs not allowed in YAML, use spaces`);
        }
        
        // Validate indentation
        if (indentStack.length > 0) {
          const lastIndent = indentStack[indentStack.length - 1];
          if (indent > lastIndent && (indent - lastIndent) % 2 !== 0) {
            throw new Error(`Line ${i + 1}: Invalid indentation`);
          }
        }
        
        if (line.includes(':')) {
          indentStack.push(indent);
        }
      }
      
      setResult({ valid: true, message: "Valid YAML syntax" });
    } catch (error: any) {
      setResult({ valid: false, message: error.message });
    }
  };

  return (
    <ToolLayout
      title="YAML Validator"
      description="Validate YAML syntax"
    >
      <UsageGuide
        steps={[
          "Paste YAML content into the input area",
          "Click \"Validate YAML\" to check syntax",
          "See validation results instantly",
          "Fix any errors shown in the message"
        ]}
        tips={[
          "YAML uses spaces for indentation, NOT tabs",
          "Indentation must be consistent (2 or 4 spaces)",
          "Colons must be followed by a space",
          "Great for checking config files before deployment"
        ]}
        note="This validator checks basic YAML syntax and indentation rules"
      />
      <Card className="p-6 mt-6">
        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium">YAML Input</label>
            <Textarea
              value={yaml}
              onChange={(e) => {
                setYaml(e.target.value);
                setResult(null);
              }}
              placeholder="key: value"
              rows={12}
              className="font-mono text-sm"
            />
          </div>

          <Button onClick={validateYaml} className="w-full">
            Validate YAML
          </Button>

          {result && (
            <div className={`p-6 rounded-lg ${result.valid ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
              <p className={`font-semibold ${result.valid ? 'text-green-600' : 'text-red-600'}`}>
                {result.valid ? '✓ Valid YAML' : '✗ Invalid YAML'}
              </p>
              {!result.valid && (
                <p className="text-sm text-muted-foreground mt-1">
                  {result.message}
                </p>
              )}
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
}
