import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const RaiseCalculator = () => {
  const [currentSalary, setCurrentSalary] = useState("");
  const [raisePercent, setRaisePercent] = useState("");
  const [raiseAmount, setRaiseAmount] = useState("");
  const [result, setResult] = useState<{ newSalary: number; increase: number; percentIncrease: number } | null>(null);

  const calculate = () => {
    const current = parseFloat(currentSalary);
    if (isNaN(current)) return;
    
    const percent = parseFloat(raisePercent);
    const amount = parseFloat(raiseAmount);
    
    let increase = 0;
    if (!isNaN(amount) && amount > 0) {
      increase = amount;
    } else if (!isNaN(percent)) {
      increase = current * (percent / 100);
    }
    
    const newSalary = current + increase;
    setResult({
      newSalary,
      increase,
      percentIncrease: (increase / current) * 100
    });
  };

  return (
    <ToolLayout title="Raise Calculator" description="Calculate your new salary after a raise">
      <Card className="p-6">
        <div className="space-y-4 max-w-md mx-auto">
          <div>
            <Label>Current Salary ($)</Label>
            <Input type="number" value={currentSalary} onChange={(e) => setCurrentSalary(e.target.value)} placeholder="e.g., 60000" />
          </div>
          <div>
            <Label>Raise Percentage (%)</Label>
            <Input type="number" value={raisePercent} onChange={(e) => setRaisePercent(e.target.value)} placeholder="e.g., 5" />
          </div>
          <div className="text-center text-muted-foreground">— or —</div>
          <div>
            <Label>Raise Amount ($)</Label>
            <Input type="number" value={raiseAmount} onChange={(e) => setRaiseAmount(e.target.value)} placeholder="e.g., 3000" />
          </div>
          <Button onClick={calculate} className="w-full">Calculate New Salary</Button>
          {result && (
            <div className="space-y-4 mt-4">
              <div className="p-4 bg-primary/10 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">New Salary</p>
                <p className="text-3xl font-bold text-primary">${result.newSalary.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Increase</p>
                  <p className="font-bold text-green-600">+${result.increase.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Percent</p>
                  <p className="font-bold text-green-600">+{result.percentIncrease.toFixed(2)}%</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
};

export default RaiseCalculator;
