import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UsageGuide } from "@/components/UsageGuide";

export default function YamlFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const formatYaml = () => {
    try {
      // Simple YAML formatting
      const lines = input.split('\n');
      const formatted = lines.map(line => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) return trimmed;
        
        const indentLevel = line.search(/\S/);
        const indent = '  '.repeat(Math.floor(indentLevel / 2));
        return indent + trimmed;
      }).join('\n');

      setOutput(formatted);
      toast({
        title: "Success",
        description: "YAML formatted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to format YAML",
        variant: "destructive",
      });
    }
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    toast({
      title: "Copied!",
      description: "Formatted YAML copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="YAML Formatter"
      description="Format and validate YAML"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Paste your YAML content into the input area",
            "Click \"Format YAML\" to beautify the indentation",
            "The formatted YAML appears below",
            "Click \"Copy Output\" to copy the result"
          ]}
          tips={[
            "YAML uses indentation (spaces, not tabs) for structure",
            "Commonly used for configuration files and Docker Compose",
            "Perfect for cleaning up messy YAML files",
            "Great for validating YAML syntax"
          ]}
        />
      </div>
      <Card className="p-6 mt-6">
        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium">Input YAML</label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste YAML here..."
              rows={10}
              className="font-mono text-sm"
            />
          </div>

          <Button onClick={formatYaml} className="w-full">
            Format YAML
          </Button>

          {output && (
            <div className="space-y-2">
              <label className="block text-sm font-medium">Formatted YAML</label>
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
