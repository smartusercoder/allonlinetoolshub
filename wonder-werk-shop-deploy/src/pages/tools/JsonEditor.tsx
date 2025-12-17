import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const JsonEditor = () => {
  const [input, setInput] = useState("");
  const [formatted, setFormatted] = useState("");
  const [error, setError] = useState("");
  const { toast } = useToast();

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      const beautified = JSON.stringify(parsed, null, 2);
      setFormatted(beautified);
      setError("");
    } catch (e) {
      setError("Invalid JSON: " + (e as Error).message);
      setFormatted("");
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setFormatted(minified);
      setError("");
    } catch (e) {
      setError("Invalid JSON: " + (e as Error).message);
      setFormatted("");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formatted);
    toast({
      title: "Copied!",
      description: "JSON copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="JSON Editor"
      description="Edit, format, and minify JSON data"
    >
      <div className="space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">JSON Input</label>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='{"name":"John","age":30}'
                rows={8}
                className="w-full font-mono text-sm"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={formatJson} className="flex-1">
                <Save className="w-4 h-4 mr-2" />
                Format JSON
              </Button>
              <Button onClick={minifyJson} variant="outline" className="flex-1">
                Minify JSON
              </Button>
            </div>

            {error && (
              <div className="p-3 bg-destructive/10 text-destructive rounded-lg text-sm">
                {error}
              </div>
            )}

            {formatted && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">Output</label>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <Textarea
                  value={formatted}
                  readOnly
                  rows={12}
                  className="w-full bg-muted font-mono text-sm"
                />
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6 bg-muted/50">
          <h3 className="font-semibold mb-3">Features</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>Format JSON with proper indentation</li>
            <li>Minify JSON to save space</li>
            <li>Validate JSON syntax</li>
            <li>Copy formatted output</li>
          </ul>
        </Card>
      </div>
    </ToolLayout>
  );
};

export default JsonEditor;
