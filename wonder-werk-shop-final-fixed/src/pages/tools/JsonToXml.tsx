import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Copy, Download, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export default function JsonToXml() {
  const [jsonInput, setJsonInput] = useState("");
  const [xmlOutput, setXmlOutput] = useState("");
  const [rootElement, setRootElement] = useState("root");
  const [prettyPrint, setPrettyPrint] = useState(true);
  const [includeDeclaration, setIncludeDeclaration] = useState(true);

  const jsonToXml = (obj: unknown, indent: number = 0): string => {
    const spaces = prettyPrint ? "  ".repeat(indent) : "";
    const newline = prettyPrint ? "\n" : "";
    
    if (obj === null || obj === undefined) {
      return "";
    }

    if (typeof obj === "string" || typeof obj === "number" || typeof obj === "boolean") {
      return String(obj);
    }

    if (Array.isArray(obj)) {
      return obj.map((item, i) => 
        `${spaces}<item index="${i}">${newline}${jsonToXml(item, indent + 1)}${newline}${spaces}</item>`
      ).join(newline);
    }

    if (typeof obj === "object") {
      return Object.entries(obj).map(([key, value]) => {
        const safeKey = key.replace(/[^a-zA-Z0-9_-]/g, "_");
        
        if (Array.isArray(value)) {
          return value.map((item) =>
            `${spaces}<${safeKey}>${newline}${jsonToXml(item, indent + 1)}${newline}${spaces}</${safeKey}>`
          ).join(newline);
        }
        
        if (typeof value === "object" && value !== null) {
          return `${spaces}<${safeKey}>${newline}${jsonToXml(value, indent + 1)}${newline}${spaces}</${safeKey}>`;
        }
        
        return `${spaces}<${safeKey}>${jsonToXml(value, indent + 1)}</${safeKey}>`;
      }).join(newline);
    }

    return "";
  };

  const convert = () => {
    if (!jsonInput.trim()) {
      toast.error("Please enter JSON to convert");
      return;
    }

    try {
      const parsed = JSON.parse(jsonInput);
      const newline = prettyPrint ? "\n" : "";
      
      let xml = "";
      if (includeDeclaration) {
        xml += `<?xml version="1.0" encoding="UTF-8"?>${newline}`;
      }
      
      xml += `<${rootElement}>${newline}`;
      xml += jsonToXml(parsed, 1);
      xml += `${newline}</${rootElement}>`;
      
      setXmlOutput(xml);
      toast.success("Converted successfully");
    } catch (error) {
      toast.error("Invalid JSON: " + (error instanceof Error ? error.message : "Parse error"));
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(xmlOutput);
    toast.success("Copied to clipboard");
  };

  const download = () => {
    const blob = new Blob([xmlOutput], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "converted.xml";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded");
  };

  const loadSample = () => {
    setJsonInput(JSON.stringify({
      person: {
        name: "John Doe",
        age: 30,
        email: "john@example.com",
        address: {
          street: "123 Main St",
          city: "New York",
          country: "USA"
        },
        hobbies: ["reading", "gaming", "coding"]
      }
    }, null, 2));
  };

  return (
    <ToolLayout title="JSON to XML Converter" description="Convert JSON data to XML format">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Label className="text-lg font-semibold">JSON Input</Label>
              <Button variant="outline" size="sm" onClick={loadSample}>
                Load Sample
              </Button>
            </div>
            <Textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder='{"key": "value"}'
              className="min-h-[400px] font-mono text-sm"
            />
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Options</h3>
            <div className="space-y-4">
              <div>
                <Label>Root Element Name</Label>
                <Input
                  value={rootElement}
                  onChange={(e) => setRootElement(e.target.value)}
                  placeholder="root"
                  className="mt-1"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="pretty"
                  checked={prettyPrint}
                  onCheckedChange={(c) => setPrettyPrint(!!c)}
                />
                <Label htmlFor="pretty">Pretty Print (formatted output)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="declaration"
                  checked={includeDeclaration}
                  onCheckedChange={(c) => setIncludeDeclaration(!!c)}
                />
                <Label htmlFor="declaration">Include XML Declaration</Label>
              </div>
            </div>
          </Card>

          <Button onClick={convert} className="w-full">
            <ArrowRight className="h-4 w-4 mr-2" /> Convert to XML
          </Button>
        </div>

        <div className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Label className="text-lg font-semibold">XML Output</Label>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={copy} disabled={!xmlOutput}>
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={download} disabled={!xmlOutput}>
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <pre className="bg-muted p-4 rounded-lg overflow-auto min-h-[400px] max-h-[600px] text-sm font-mono whitespace-pre-wrap">
              {xmlOutput || "XML output will appear here..."}
            </pre>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
