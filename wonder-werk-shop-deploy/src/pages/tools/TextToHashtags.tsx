import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TextToHashtags = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const convertToHashtags = () => {
    const words = input
      .split(/\s+/)
      .filter(word => word.length > 0)
      .map(word => `#${word.replace(/[^a-zA-Z0-9]/g, '')}`);
    setOutput(words.join(" "));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    toast({
      title: "Copied!",
      description: "Hashtags copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="Text to Hashtags Converter"
      description="Convert your text into social media hashtags"
    >
      <div className="space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Input Text</label>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter words to convert to hashtags..."
                rows={6}
                className="w-full"
              />
            </div>

            <Button onClick={convertToHashtags} className="w-full">
              Convert to Hashtags
            </Button>

            {output && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">Hashtags</label>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <Textarea
                  value={output}
                  readOnly
                  rows={6}
                  className="w-full bg-muted"
                />
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6 bg-muted/50">
          <h3 className="font-semibold mb-3">Features</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>Automatically adds # to each word</li>
            <li>Removes special characters</li>
            <li>Perfect for social media posts</li>
          </ul>
        </Card>
      </div>
    </ToolLayout>
  );
};

export default TextToHashtags;