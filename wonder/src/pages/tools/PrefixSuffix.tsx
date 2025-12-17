import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function PrefixSuffix() {
  const [input, setInput] = useState("");
  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const applyPrefixSuffix = () => {
    const lines = input.split('\n');
    const modified = lines.map(line => `${prefix}${line}${suffix}`).join('\n');
    setOutput(modified);
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    toast({
      title: "Copied!",
      description: "Output copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="Add Prefix/Suffix"
      description="Add prefix or suffix to each line"
    >
      <Card className="p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium">Prefix</label>
              <Input
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
                placeholder="Enter prefix..."
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Suffix</label>
              <Input
                value={suffix}
                onChange={(e) => setSuffix(e.target.value)}
                placeholder="Enter suffix..."
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Input Text</label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text..."
              rows={8}
            />
          </div>

          <Button onClick={applyPrefixSuffix} className="w-full">
            Apply Prefix/Suffix
          </Button>

          {output && (
            <div className="space-y-2">
              <label className="block text-sm font-medium">Output</label>
              <Textarea
                value={output}
                readOnly
                rows={8}
                className="bg-muted"
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
