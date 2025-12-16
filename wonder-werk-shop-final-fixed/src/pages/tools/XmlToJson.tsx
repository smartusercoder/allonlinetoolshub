import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UsageGuide } from "@/components/UsageGuide";

export default function XmlToJson() {
  const [xml, setXml] = useState("");
  const [json, setJson] = useState("");
  const { toast } = useToast();

  const convertToJson = () => {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xml, "text/xml");
      
      if (xmlDoc.querySelector("parsererror")) {
        throw new Error("Invalid XML");
      }

      const xmlToObject = (node: any): any => {
        const obj: any = {};
        
        if (node.nodeType === 1) {
          if (node.attributes.length > 0) {
            obj["@attributes"] = {};
            for (let i = 0; i < node.attributes.length; i++) {
              const attr = node.attributes[i];
              obj["@attributes"][attr.nodeName] = attr.nodeValue;
            }
          }
        } else if (node.nodeType === 3) {
          return node.nodeValue;
        }

        if (node.hasChildNodes()) {
          for (let i = 0; i < node.childNodes.length; i++) {
            const child = node.childNodes[i];
            const nodeName = child.nodeName;
            
            if (child.nodeType === 3 && child.nodeValue?.trim()) {
              return child.nodeValue;
            }
            
            if (obj[nodeName] === undefined) {
              obj[nodeName] = xmlToObject(child);
            } else {
              if (!Array.isArray(obj[nodeName])) {
                obj[nodeName] = [obj[nodeName]];
              }
              obj[nodeName].push(xmlToObject(child));
            }
          }
        }
        
        return obj;
      };

      const result = xmlToObject(xmlDoc.documentElement);
      setJson(JSON.stringify(result, null, 2));
      
      toast({
        title: "Success",
        description: "XML converted to JSON",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid XML format",
        variant: "destructive",
      });
    }
  };

  const copyJson = () => {
    navigator.clipboard.writeText(json);
    toast({
      title: "Copied!",
      description: "JSON copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="XML to JSON Converter"
      description="Convert XML to JSON format"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Paste your XML in the input field",
            "Click \"Convert to JSON\"",
            "View the formatted JSON output",
            "Copy the JSON for use in your project"
          ]}
          tips={[
            "Converts XML structure to JSON objects",
            "Preserves XML attributes as @attributes",
            "Great for working with APIs that need JSON",
            "Useful for data migration and transformation",
            "Validates XML before conversion"
          ]}
        />
      </div>
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium">XML Input</label>
            <Textarea
              value={xml}
              onChange={(e) => setXml(e.target.value)}
              placeholder="<root>...</root>"
              rows={10}
              className="font-mono text-sm"
            />
          </div>

          <Button onClick={convertToJson} className="w-full">
            Convert to JSON
          </Button>

          {json && (
            <div className="space-y-2">
              <label className="block text-sm font-medium">JSON Output</label>
              <Textarea
                value={json}
                readOnly
                rows={10}
                className="bg-muted font-mono text-sm"
              />
              <Button onClick={copyJson} variant="outline" className="w-full">
                <Copy className="w-4 h-4 mr-2" />
                Copy JSON
              </Button>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
}
