import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calculator } from "lucide-react";

const ProbabilityCalculator = () => {
  const [favorableOutcomes, setFavorableOutcomes] = useState("");
  const [totalOutcomes, setTotalOutcomes] = useState("");
  const [result, setResult] = useState<{ probability: number; percentage: number; odds: string } | null>(null);

  const calculate = () => {
    const favorable = parseFloat(favorableOutcomes);
    const total = parseFloat(totalOutcomes);

    if (isNaN(favorable) || isNaN(total) || total <= 0 || favorable < 0 || favorable > total) {
      return;
    }

    const probability = favorable / total;
    const percentage = probability * 100;
    const oddsFor = favorable;
    const oddsAgainst = total - favorable;

    setResult({
      probability,
      percentage,
      odds: `${oddsFor}:${oddsAgainst}`
    });
  };

  return (
    <ToolLayout
      title="Probability Calculator"
      description="Calculate probability, percentage, and odds"
    >
      <div className="space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Favorable Outcomes</label>
              <Input
                type="number"
                value={favorableOutcomes}
                onChange={(e) => setFavorableOutcomes(e.target.value)}
                placeholder="e.g., 1 (rolling a 6 on a die)"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Total Possible Outcomes</label>
              <Input
                type="number"
                value={totalOutcomes}
                onChange={(e) => setTotalOutcomes(e.target.value)}
                placeholder="e.g., 6 (total sides on a die)"
                min="1"
              />
            </div>

            <Button onClick={calculate} className="w-full">
              <Calculator className="w-4 h-4 mr-2" />
              Calculate Probability
            </Button>

            {result && (
              <div className="space-y-3 mt-4">
                <div className="grid grid-cols-1 gap-3">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Probability (Decimal)</p>
                    <p className="text-2xl font-bold">{result.probability.toFixed(4)}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Probability (Percentage)</p>
                    <p className="text-2xl font-bold">{result.percentage.toFixed(2)}%</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Odds (For:Against)</p>
                    <p className="text-2xl font-bold">{result.odds}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6 bg-muted/50">
          <h3 className="font-semibold mb-3">Examples</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>Rolling a 6 on a die: 1 favorable, 6 total = 16.67%</li>
            <li>Flipping heads on a coin: 1 favorable, 2 total = 50%</li>
            <li>Drawing an ace from a deck: 4 favorable, 52 total = 7.69%</li>
          </ul>
        </Card>
      </div>
    </ToolLayout>
  );
};

export default ProbabilityCalculator;
