import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UsageGuide } from "@/components/UsageGuide";

const CommaSeparator = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const addCommas = () => {
    const lines = input.split("\n").filter(line => line.trim());
    setOutput(lines.join(", "));
  };

  const removeCommas = () => {
    const items = input.split(",").map(item => item.trim()).filter(item => item);
    setOutput(items.join("\n"));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    toast({
      title: "Copied!",
      description: "Text copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="Comma Separator"
      description="Add or remove commas from your text"
    >
      <UsageGuide
        steps={[
          "Choose 'Add Commas' to join lines with commas",
          "Or choose 'Remove Commas' to split comma-separated items into lines",
          "Paste your text in the appropriate format",
          "Click the conversion button and copy the result"
        ]}
        tips={[
          "Perfect for converting lists to/from CSV format",
          "Automatically trims whitespace",
          "Great for data transformation",
          "Two-way conversion tool"
        ]}
        example="Line by line → Item 1, Item 2, Item 3"
      />
      <div className="space-y-6">
        <Card className="p-6">
          <Tabs defaultValue="add" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="add">Add Commas</TabsTrigger>
              <TabsTrigger value="remove">Remove Commas</TabsTrigger>
            </TabsList>

            <TabsContent value="add" className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Input (one item per line)</label>
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Item 1&#10;Item 2&#10;Item 3"
                  rows={6}
                  className="w-full"
                />
              </div>

              <Button onClick={addCommas} className="w-full">
                Add Commas
              </Button>
            </TabsContent>

            <TabsContent value="remove" className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Input (comma-separated)</label>
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Item 1, Item 2, Item 3"
                  rows={6}
                  className="w-full"
                />
              </div>

              <Button onClick={removeCommas} className="w-full">
                Remove Commas
              </Button>
            </TabsContent>
          </Tabs>

          {output && (
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium">Output</label>
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
        </Card>

        <Card className="p-6 bg-muted/50">
          <h3 className="font-semibold mb-3">Features</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>Convert line-separated items to comma-separated</li>
            <li>Convert comma-separated items to line-separated</li>
            <li>Automatically trims whitespace</li>
          </ul>
        </Card>
      </div>
    </ToolLayout>
  );
};

export default CommaSeparator;