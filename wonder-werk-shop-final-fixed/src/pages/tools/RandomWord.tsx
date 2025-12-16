import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UsageGuide } from "@/components/UsageGuide";

const words = ["abstract", "account", "achieve", "address", "advance", "advice", "airport", "amazing", "ancient", "another", "anxiety", "approach", "arrange", "article", "average", "balance", "battery", "believe", "benefit", "billion", "captain", "capture", "careful", "century", "certain", "chapter", "charity", "chicken", "climate", "collect", "college", "combine", "comfort", "command", "comment", "company", "compare", "compete", "complex", "concept", "concern", "confirm", "connect", "consider", "contain", "content", "contest", "context", "control", "convert", "correct", "counter", "country", "courage", "creating", "crystal", "culture", "current", "customer", "decline", "default", "defense", "deliver", "density", "deposit", "describe", "deserve", "despite", "destroy", "develop", "diamond", "digital", "discuss", "disease", "display", "distance", "divorce", "eastern", "economy", "edition", "element", "emotion", "emperor", "endless", "enforce", "enhance", "evening", "examine", "example", "excited", "explain", "explore", "express", "extreme", "factory", "failure", "fashion", "feature", "feeling", "fiction", "fifteen", "finance", "formula", "fortune", "forward", "founder", "freedom", "gallery", "general", "genetic", "genuine", "gesture"];

const RandomWord = () => {
  const [count, setCount] = useState(5);
  const [result, setResult] = useState<string[]>([]);
  const { toast } = useToast();

  const generateWords = () => {
    const generated: string[] = [];
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * words.length);
      generated.push(words[randomIndex]);
    }
    setResult(generated);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result.join(", "));
    toast({
      title: "Copied!",
      description: "Words copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="Random Word Generator"
      description="Generate random words for testing, brainstorming, or creative writing"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Set how many random words you need (1-50)",
            "Click \"Generate Random Words\"",
            "View the list of generated words",
            "Click \"Copy\" to copy all words to clipboard"
          ]}
          tips={[
            "Great for placeholder text in designs",
            "Use for brainstorming and creative writing prompts",
            "Perfect for testing forms and applications",
            "Generate test data quickly"
          ]}
        />
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Number of Words</label>
              <Input
                type="number"
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                min="1"
                max="50"
                className="w-full"
              />
            </div>

            <Button onClick={generateWords} className="w-full">
              Generate Random Words
            </Button>

            {result.length > 0 && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">Generated Words</label>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm">{result.join(", ")}</p>
                </div>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6 bg-muted/50">
          <h3 className="font-semibold mb-3">Use Cases</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>Generate test data for applications</li>
            <li>Brainstorm ideas or creative writing</li>
            <li>Create random passwords or codes</li>
          </ul>
        </Card>
      </div>
    </ToolLayout>
  );
};

export default RandomWord;