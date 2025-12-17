import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UsageGuide } from "@/components/UsageGuide";

export default function XmlFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const formatXml = () => {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(input, "text/xml");
      
      if (xmlDoc.querySelector("parsererror")) {
        throw new Error("Invalid XML");
      }

      const formatted = new XMLSerializer().serializeToString(xmlDoc);
      const pretty = formatted
        .replace(/></g, '>\n<')
        .split('\n')
        .map((line, index, arr) => {
          const indent = line.match(/^<\//g) ? arr.slice(0, index).filter(l => !l.match(/^<\//)).length - 1 : arr.slice(0, index).filter(l => !l.match(/^<\//)).length;
          return '  '.repeat(Math.max(0, indent)) + line;
        })
        .join('\n');

      setOutput(pretty);
      toast({
        title: "Success",
        description: "XML formatted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid XML format",
        variant: "destructive",
      });
    }
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    toast({
      title: "Copied!",
      description: "Formatted XML copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="XML Formatter"
      description="Format and validate XML"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Paste your minified or unformatted XML",
            "Click \"Format XML\"",
            "Formatted XML appears with proper indentation",
            "Copy the clean output"
          ]}
          tips={[
            "Also validates XML syntax",
            "Shows errors if XML is invalid",
            "Great for making compressed XML readable",
            "Useful for debugging API responses"
          ]}
        />
      </div>
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium">Input XML</label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste XML here..."
              rows={10}
              className="font-mono text-sm"
            />
          </div>

          <Button onClick={formatXml} className="w-full">
            Format XML
          </Button>

          {output && (
            <div className="space-y-2">
              <label className="block text-sm font-medium">Formatted XML</label>
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
