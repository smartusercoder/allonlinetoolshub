import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { UsageGuide } from "@/components/UsageGuide";

const JsonFormatter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const { toast } = useToast();

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setError("");
      toast({
        title: "Success",
        description: "JSON formatted successfully",
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
      toast({
        title: "Error",
        description: "Invalid JSON format",
        variant: "destructive",
      });
    }
  };

  const handleMinify = () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError("");
      toast({
        title: "Success",
        description: "JSON minified successfully",
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
      toast({
        title: "Error",
        description: "Invalid JSON format",
        variant: "destructive",
      });
    }
  };

  return (
    <ToolLayout
      title="JSON Formatter"
      description="Format, validate and minify JSON data"
      keywords={["json formatter", "json beautifier", "json validator", "format json online"]}
      category="DevelopmentTools"
      howToSteps={[
        {
          name: "Paste JSON Code",
          text: "Copy and paste your JSON data into the input text area. The JSON can be minified, poorly formatted, or have any structure."
        },
        {
          name: "Choose Format or Minify",
          text: "Click 'Format JSON' to beautify and indent the JSON with proper spacing for readability, or click 'Minify JSON' to compress it by removing unnecessary whitespace."
        },
        {
          name: "Review Output",
          text: "The formatted or minified JSON will appear in the output area. The tool will also validate your JSON and show any syntax errors if present."
        },
        {
          name: "Copy Formatted JSON",
          text: "Copy the formatted or minified JSON from the output area to use in your code, API requests, or configuration files."
        }
      ]}
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Paste your JSON data into the input text area",
            "Click \"Format JSON\" to beautify with proper indentation",
            "Or click \"Minify JSON\" to compress into a single line",
            "The result will appear below with syntax validation"
          ]}
          tips={[
            "Formatted JSON is easier to read and debug",
            "Minified JSON reduces file size for transmission",
            "Validator will show detailed error messages for invalid JSON",
            "Use for API responses, configuration files, and data inspection"
          ]}
          example='{"name":"John","age":30,"city":"New York"}'
        />

        <div>
          <label className="text-sm font-medium mb-2 block">Input JSON</label>
          <Textarea
            placeholder='{"key": "value"}'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[200px] font-mono text-sm"
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={handleFormat} className="flex-1" variant="hero">
            Format JSON
          </Button>
          <Button onClick={handleMinify} className="flex-1">
            Minify JSON
          </Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
            {error}
          </div>
        )}

        {output && !error && (
          <div>
            <label className="text-sm font-medium mb-2 block">Output</label>
            <Textarea
              value={output}
              readOnly
              className="min-h-[200px] bg-muted/30 font-mono text-sm"
            />
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default JsonFormatter;
