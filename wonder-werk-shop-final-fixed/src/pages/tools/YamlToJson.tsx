import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeftRight, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UsageGuide } from "@/components/UsageGuide";

const YamlToJson = () => {
  const [yaml, setYaml] = useState("");
  const [json, setJson] = useState("");
  const { toast } = useToast();

  const convertYamlToJson = () => {
    try {
      // Simple YAML to JSON converter (basic implementation)
      const lines = yaml.split('\n');
      const result: any = {};
      
      lines.forEach(line => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const match = trimmed.match(/^(\w+):\s*(.+)$/);
          if (match) {
            const [, key, value] = match;
            result[key] = value.replace(/["']/g, '');
          }
        }
      });

      setJson(JSON.stringify(result, null, 2));
      toast({
        title: "Success",
        description: "YAML converted to JSON",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to convert YAML",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(json);
    toast({
      title: "Copied!",
      description: "JSON copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="YAML to JSON Converter"
      description="Convert YAML to JSON format"
    >
      <UsageGuide
        steps={[
          "Paste YAML content in the input area",
          "Click \"Convert to JSON\"",
          "JSON output appears below",
          "Click \"Copy\" to copy the result"
        ]}
        tips={[
          "YAML is more human-readable than JSON",
          "Great for converting config files",
          "JSON is easier for APIs and JavaScript",
          "Preserves key-value structure"
        ]}
        example='name: John → {"name": "John"}'
      />
      <Card className="p-6 space-y-4 mt-6">
        <div className="space-y-2">
          <Label htmlFor="yaml">YAML Input</Label>
          <Textarea
            id="yaml"
            value={yaml}
            onChange={(e) => setYaml(e.target.value)}
            placeholder="name: John&#10;email: john@example.com&#10;age: 30"
            rows={8}
          />
        </div>

        <Button onClick={convertYamlToJson}>
          <ArrowLeftRight className="mr-2 h-4 w-4" />
          Convert to JSON
        </Button>

        {json && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>JSON Output</Label>
              <Button size="sm" variant="outline" onClick={copyToClipboard}>
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </Button>
            </div>
            <Textarea value={json} readOnly rows={8} />
          </div>
        )}
      </Card>
    </ToolLayout>
  );
};

export default YamlToJson;
