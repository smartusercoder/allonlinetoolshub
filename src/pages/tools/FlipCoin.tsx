import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shuffle } from "lucide-react";

export default function FlipCoin() {
  const [result, setResult] = useState<string | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [stats, setStats] = useState({ heads: 0, tails: 0 });

  const flipCoin = () => {
    setIsFlipping(true);
    
    setTimeout(() => {
      const outcome = Math.random() < 0.5 ? "Heads" : "Tails";
      setResult(outcome);
      setHistory(prev => [outcome, ...prev.slice(0, 9)]);
      setStats(prev => ({
        ...prev,
        [outcome.toLowerCase() as 'heads' | 'tails']: prev[outcome.toLowerCase() as 'heads' | 'tails'] + 1
      }));
      setIsFlipping(false);
    }, 600);
  };

  const reset = () => {
    setResult(null);
    setHistory([]);
    setStats({ heads: 0, tails: 0 });
  };

  return (
    <ToolLayout
      title="Coin Flipper"
      description="Flip a virtual coin for random decisions"
    >
      <Card className="p-6 space-y-6">
        <div className="text-center space-y-6">
          <div className={`text-8xl transition-transform duration-500 ${isFlipping ? 'animate-spin' : ''}`}>
            🪙
          </div>

          {result && !isFlipping && (
            <Card className="p-6 bg-primary/10">
              <div className="text-4xl font-bold text-primary">{result}!</div>
            </Card>
          )}

          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold">{stats.heads}</div>
              <div className="text-sm text-muted-foreground">Heads</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold">{stats.tails}</div>
              <div className="text-sm text-muted-foreground">Tails</div>
            </Card>
          </div>

          <div className="flex gap-2">
            <Button onClick={flipCoin} disabled={isFlipping} className="flex-1">
              <Shuffle className="w-4 h-4 mr-2" />
              {isFlipping ? "Flipping..." : "Flip Coin"}
            </Button>
            <Button onClick={reset} variant="outline">
              Reset
            </Button>
          </div>
        </div>

        {history.length > 0 && (
          <div className="space-y-2">
            <div className="text-sm font-medium">Flip History</div>
            <Card className="p-4">
              <div className="flex flex-wrap gap-2">
                {history.map((flip, index) => (
                  <div
                    key={index}
                    className={`px-3 py-1 rounded-full text-sm ${
                      flip === "Heads"
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                        : "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300"
                    }`}
                  >
                    {flip}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </Card>
    </ToolLayout>
  );
}