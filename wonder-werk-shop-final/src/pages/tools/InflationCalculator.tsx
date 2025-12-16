import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const InflationCalculator = () => {
  const [originalAmount, setOriginalAmount] = useState("");
  const [inflationRate, setInflationRate] = useState("3");
  const [years, setYears] = useState("10");
  const [result, setResult] = useState<{
    futureValue: number;
    purchasingPower: number;
    totalInflation: number;
  } | null>(null);

  const calculate = () => {
    const amount = parseFloat(originalAmount);
    const rate = parseFloat(inflationRate) / 100;
    const numYears = parseInt(years);
    
    if (isNaN(amount) || isNaN(rate) || isNaN(numYears)) return;
    
    const futureValue = amount * Math.pow(1 + rate, numYears);
    const purchasingPower = amount / Math.pow(1 + rate, numYears);
    const totalInflation = ((futureValue - amount) / amount) * 100;
    
    setResult({ futureValue, purchasingPower, totalInflation });
  };

  return (
    <ToolLayout
      title="Inflation Calculator"
      description="Calculate the impact of inflation on your money over time"
    >
      <Card className="p-6">
        <div className="space-y-4 max-w-md mx-auto">
          <div>
            <Label htmlFor="amount">Amount ($)</Label>
            <Input
              id="amount"
              type="number"
              min="0"
              placeholder="e.g., 1000"
              value={originalAmount}
              onChange={(e) => setOriginalAmount(e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="rate">Annual Inflation Rate (%)</Label>
            <Input
              id="rate"
              type="number"
              step="0.1"
              placeholder="e.g., 3"
              value={inflationRate}
              onChange={(e) => setInflationRate(e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="years">Number of Years</Label>
            <Input
              id="years"
              type="number"
              min="1"
              placeholder="e.g., 10"
              value={years}
              onChange={(e) => setYears(e.target.value)}
            />
          </div>
          
          <Button onClick={calculate} className="w-full">Calculate</Button>
          
          {result && (
            <div className="mt-6 space-y-4">
              <div className="p-4 bg-destructive/10 rounded-lg">
                <p className="text-sm text-muted-foreground">Future Cost (same item in {years} years)</p>
                <p className="text-3xl font-bold text-destructive">${result.futureValue.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  What costs ${originalAmount} today will cost ${result.futureValue.toFixed(2)} in {years} years
                </p>
              </div>
              
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-muted-foreground">Purchasing Power of ${originalAmount} in {years} years</p>
                <p className="text-3xl font-bold text-primary">${result.purchasingPower.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  ${originalAmount} will only buy what ${result.purchasingPower.toFixed(2)} buys today
                </p>
              </div>
              
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Total Inflation Over {years} Years</p>
                <p className="text-2xl font-bold">{result.totalInflation.toFixed(1)}%</p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
};

export default InflationCalculator;
