import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function NumberExtractor() {
  const [input, setInput] = useState("");
  const [numbers, setNumbers] = useState<string[]>([]);
  const { toast } = useToast();

  const extractNumbers = () => {
    const numberRegex = /-?\d+\.?\d*/g;
    const found = input.match(numberRegex) || [];
    setNumbers(found);
    
    toast({
      title: "Success",
      description: `Found ${found.length} number(s)`,
    });
  };

  const copyAll = () => {
    navigator.clipboard.writeText(numbers.join('\n'));
    toast({
      title: "Copied!",
      description: "All numbers copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="Number Extractor"
      description="Extract numbers from text"
    >
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium">Input Text</label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste text containing numbers..."
              rows={8}
            />
          </div>

          <Button onClick={extractNumbers} className="w-full">
            Extract Numbers
          </Button>

          {numbers.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">
                  Found {numbers.length} number(s)
                </label>
                <Button onClick={copyAll} variant="outline" size="sm">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy All
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {numbers.map((num, index) => (
                  <Badge key={index} variant="secondary" className="font-mono">
                    {num}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
}
