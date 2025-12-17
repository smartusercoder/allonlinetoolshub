import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export default function JsonToYaml() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const convertToYaml = (obj: any, indent = 0): string => {
    const spaces = "  ".repeat(indent);
    let result = "";

    if (Array.isArray(obj)) {
      obj.forEach((item) => {
        if (typeof item === "object" && item !== null) {
          result += `${spaces}-\n${convertToYaml(item, indent + 1)}`;
        } else {
          result += `${spaces}- ${formatValue(item)}\n`;
        }
      });
    } else if (typeof obj === "object" && obj !== null) {
      Object.entries(obj).forEach(([key, value]) => {
        if (typeof value === "object" && value !== null) {
          if (Array.isArray(value)) {
            result += `${spaces}${key}:\n${convertToYaml(value, indent + 1)}`;
          } else {
            result += `${spaces}${key}:\n${convertToYaml(value, indent + 1)}`;
          }
        } else {
          result += `${spaces}${key}: ${formatValue(value)}\n`;
        }
      });
    }

    return result;
  };

  const formatValue = (value: any): string => {
    if (value === null) return "null";
    if (value === undefined) return "~";
    if (typeof value === "string") {
      if (value.includes(":") || value.includes("#") || value.includes("\n") || value.match(/^[\[\]{}&*!|>'"@`]/) || value.trim() !== value) {
        return `"${value.replace(/"/g, '\\"')}"`;
      }
      return value;
    }
    if (typeof value === "boolean") return value.toString();
    if (typeof value === "number") return value.toString();
    return String(value);
  };

  const convert = () => {
    try {
      const parsed = JSON.parse(input);
      const yaml = convertToYaml(parsed);
      setOutput(yaml);
      toast.success("Converted to YAML");
    } catch (error) {
      toast.error("Invalid JSON input");
    }
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    toast.success("Copied to clipboard");
  };

  return (
    <ToolLayout title="JSON to YAML" description="Convert JSON to YAML format">
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-4 space-y-4">
          <Label>JSON Input</Label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"key": "value"}'
            className="font-mono min-h-[400px]"
          />
          <Button onClick={convert} className="w-full">
            <RefreshCw className="mr-2 h-4 w-4" />
            Convert to YAML
          </Button>
        </Card>

        <Card className="p-4 space-y-4">
          <div className="flex justify-between items-center">
            <Label>YAML Output</Label>
            <Button variant="outline" size="sm" onClick={copyOutput} disabled={!output}>
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </Button>
          </div>
          <Textarea
            value={output}
            readOnly
            placeholder="YAML output will appear here..."
            className="font-mono min-h-[400px]"
          />
        </Card>
      </div>
    </ToolLayout>
  );
}
