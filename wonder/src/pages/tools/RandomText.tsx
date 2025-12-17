import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Copy, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UsageGuide } from "@/components/UsageGuide";

export default function RandomText() {
  const [length, setLength] = useState(100);
  const [text, setText] = useState("");
  const { toast } = useToast();

  const generateRandomText = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setText(result);
  };

  const copyText = () => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Random text copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="Random Text Generator"
      description="Generate random text and strings"
    >
      <UsageGuide
        steps={[
          "Adjust the slider to set length (10-1000 characters)",
          "Click 'Generate Random Text'",
          "Get random alphanumeric text with spaces",
          "Click 'Copy Text' to use it"
        ]}
        tips={[
          "Perfect for testing form inputs",
          "Great for placeholder data",
          "Contains letters, numbers, and spaces",
          "Useful for stress testing character limits"
        ]}
      />
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium">
              Length: {length} characters
            </label>
            <Input
              type="range"
              min="10"
              max="1000"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
            />
          </div>

          <Button onClick={generateRandomText} className="w-full">
            <RefreshCw className="w-4 h-4 mr-2" />
            Generate Random Text
          </Button>

          {text && (
            <div className="space-y-2">
              <label className="block text-sm font-medium">Generated Text</label>
              <Textarea
                value={text}
                readOnly
                rows={8}
                className="bg-muted font-mono text-sm"
              />
              <Button onClick={copyText} variant="outline" className="w-full">
                <Copy className="w-4 h-4 mr-2" />
                Copy Text
              </Button>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
}
