import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Shuffle, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UsageGuide } from "@/components/UsageGuide";

const RandomNumber = () => {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [allowDuplicates, setAllowDuplicates] = useState(true);
  const [results, setResults] = useState<number[]>([]);
  const { toast } = useToast();

  const generate = () => {
    if (min > max) {
      toast({
        title: "Invalid range",
        description: "Minimum must be less than maximum",
        variant: "destructive",
      });
      return;
    }

    if (!allowDuplicates && count > (max - min + 1)) {
      toast({
        title: "Invalid count",
        description: "Count cannot exceed range size when duplicates are not allowed",
        variant: "destructive",
      });
      return;
    }

    const nums: number[] = [];
    const available = new Set<number>();
    
    if (!allowDuplicates) {
      for (let i = min; i <= max; i++) {
        available.add(i);
      }
    }

    for (let i = 0; i < count; i++) {
      if (allowDuplicates) {
        nums.push(Math.floor(Math.random() * (max - min + 1)) + min);
      } else {
        const arr = Array.from(available);
        const randomIndex = Math.floor(Math.random() * arr.length);
        const num = arr[randomIndex];
        nums.push(num);
        available.delete(num);
      }
    }

    setResults(nums);
  };

  const copyResults = () => {
    navigator.clipboard.writeText(results.join(", "));
    toast({
      title: "Copied!",
      description: "Results copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="Random Number Generator"
      description="Generate random numbers with customizable options"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Set minimum and maximum values",
            "Choose how many numbers to generate",
            "Toggle \"Allow duplicates\" if needed",
            "Click \"Generate\" to create random numbers",
            "Copy results with one click"
          ]}
          tips={[
            "Perfect for raffles, lotteries, and games",
            "Unique numbers mode prevents duplicates",
            "Great for random sampling",
            "Use for dice alternatives or random choices"
          ]}
          example="Min: 1, Max: 100, Count: 5"
        />
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Minimum</Label>
            <Input
              type="number"
              value={min}
              onChange={(e) => setMin(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label>Maximum</Label>
            <Input
              type="number"
              value={max}
              onChange={(e) => setMax(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>How many numbers?</Label>
          <Input
            type="number"
            value={count}
            onChange={(e) => setCount(Math.max(1, Number(e.target.value)))}
            min="1"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="duplicates"
            checked={allowDuplicates}
            onChange={(e) => setAllowDuplicates(e.target.checked)}
            className="rounded"
          />
          <Label htmlFor="duplicates" className="cursor-pointer">
            Allow duplicate numbers
          </Label>
        </div>

        <Button onClick={generate} className="w-full" size="lg">
          <Shuffle className="w-5 h-5 mr-2" />
          Generate Random Numbers
        </Button>

        {results.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Results</Label>
              <Button onClick={copyResults} variant="ghost" size="sm">
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
            <div className="p-6 bg-primary/5 border-2 border-primary/20 rounded-lg">
              <div className="flex flex-wrap gap-2 justify-center">
                {results.map((num, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-bold text-lg min-w-[60px] text-center"
                  >
                    {num}
                  </div>
                ))}
              </div>
            </div>
            <div className="text-sm text-muted-foreground text-center">
              Generated {results.length} number{results.length !== 1 ? 's' : ''}
              {!allowDuplicates && ' (unique)'}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default RandomNumber;