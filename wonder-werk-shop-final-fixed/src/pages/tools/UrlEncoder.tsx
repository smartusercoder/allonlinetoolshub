import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, ArrowRightLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UsageGuide } from "@/components/UsageGuide";

const UrlEncoder = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const encode = () => {
    try {
      setOutput(encodeURIComponent(input));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to encode URL",
        variant: "destructive",
      });
    }
  };

  const decode = () => {
    try {
      setOutput(decodeURIComponent(input));
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid encoded URL",
        variant: "destructive",
      });
    }
  };

  const swap = () => {
    setInput(output);
    setOutput(input);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    toast({
      title: "Copied!",
      description: "Output copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="URL Encoder/Decoder"
      description="Encode and decode URLs and URI components"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Paste your URL or text in the input field",
            "Click \"Encode URL\" to convert special characters to percent-encoded format",
            "Click \"Decode URL\" to convert back to readable text",
            "Use the swap button to exchange input and output"
          ]}
          tips={[
            "Encoding is necessary for URLs with special characters like spaces, &, ?, etc.",
            "Spaces become %20, & becomes %26",
            "Use encoding when passing data in URL parameters",
            "Perfect for sharing URLs or building query strings"
          ]}
          example="Hello World! → Hello%20World%21"
        />
        <div className="space-y-2">
          <Label>Input</Label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter URL or text to encode/decode..."
            rows={6}
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <Button onClick={encode} className="flex-1 min-w-[140px]">
            Encode URL
          </Button>
          <Button onClick={decode} variant="secondary" className="flex-1 min-w-[140px]">
            Decode URL
          </Button>
          <Button onClick={swap} variant="outline" size="icon">
            <ArrowRightLeft className="w-4 h-4" />
          </Button>
        </div>

        {output && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Output</Label>
              <Button onClick={copyToClipboard} variant="ghost" size="sm">
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
            <Textarea
              value={output}
              readOnly
              rows={6}
              className="font-mono text-sm bg-muted"
            />
          </div>
        )}

        <div className="text-sm text-muted-foreground space-y-2">
          <p><strong>Encoding:</strong> Converts special characters to percent-encoded format (%20 for space, etc.)</p>
          <p><strong>Decoding:</strong> Converts percent-encoded characters back to original format</p>
        </div>
      </div>
    </ToolLayout>
  );
};

export default UrlEncoder;