import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function AverageCalculator() {
  const [numbers, setNumbers] = useState("10, 20, 30, 40, 50");

  const calculate = () => {
    const nums = numbers.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
    
    if (nums.length === 0) return { mean: 0, median: 0, mode: '-', count: 0, sum: 0 };

    const sum = nums.reduce((a, b) => a + b, 0);
    const mean = sum / nums.length;
    
    const sorted = [...nums].sort((a, b) => a - b);
    const median = nums.length % 2 === 0
      ? (sorted[nums.length / 2 - 1] + sorted[nums.length / 2]) / 2
      : sorted[Math.floor(nums.length / 2)];
    
    const frequency: Record<number, number> = {};
    nums.forEach(n => frequency[n] = (frequency[n] || 0) + 1);
    const maxFreq = Math.max(...Object.values(frequency));
    const mode = maxFreq > 1 
      ? Object.keys(frequency).filter(k => frequency[Number(k)] === maxFreq).join(', ')
      : '-';

    return {
      mean: mean.toFixed(2),
      median: median.toFixed(2),
      mode,
      count: nums.length,
      sum: sum.toFixed(2)
    };
  };

  const result = calculate();

  return (
    <ToolLayout title="Average Calculator" description="Calculate mean, median, and mode">
      <div className="space-y-4">
        <Card className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="numbers">Numbers (comma separated)</Label>
            <Input
              id="numbers"
              value={numbers}
              onChange={(e) => setNumbers(e.target.value)}
              placeholder="10, 20, 30, 40, 50"
            />
          </div>
        </Card>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Card className="p-4 bg-primary/10">
            <div className="text-sm text-muted-foreground">Mean (Average)</div>
            <div className="text-2xl font-bold text-primary">{result.mean}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Median</div>
            <div className="text-2xl font-bold">{result.median}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Mode</div>
            <div className="text-2xl font-bold">{result.mode}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Count</div>
            <div className="text-2xl font-bold">{result.count}</div>
          </Card>
          <Card className="p-4 col-span-2">
            <div className="text-sm text-muted-foreground">Sum</div>
            <div className="text-2xl font-bold">{result.sum}</div>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
