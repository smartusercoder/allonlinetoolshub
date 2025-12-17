import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CommissionCalculator = () => {
  const [salesAmount, setSalesAmount] = useState("");
  const [commissionRate, setCommissionRate] = useState("");
  const [baseSalary, setBaseSalary] = useState("");
  const [result, setResult] = useState<{
    commission: number;
    totalEarnings: number;
  } | null>(null);

  const calculate = () => {
    const sales = parseFloat(salesAmount) || 0;
    const rate = parseFloat(commissionRate) || 0;
    const base = parseFloat(baseSalary) || 0;
    
    const commission = sales * (rate / 100);
    const totalEarnings = base + commission;
    
    setResult({ commission, totalEarnings });
  };

  return (
    <ToolLayout
      title="Commission Calculator"
      description="Calculate sales commission and total earnings"
    >
      <Card className="p-6">
        <div className="space-y-4 max-w-md mx-auto">
          <div>
            <Label htmlFor="sales">Total Sales ($)</Label>
            <Input
              id="sales"
              type="number"
              min="0"
              placeholder="e.g., 10000"
              value={salesAmount}
              onChange={(e) => setSalesAmount(e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="rate">Commission Rate (%)</Label>
            <Input
              id="rate"
              type="number"
              min="0"
              step="0.1"
              placeholder="e.g., 10"
              value={commissionRate}
              onChange={(e) => setCommissionRate(e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="base">Base Salary (optional)</Label>
            <Input
              id="base"
              type="number"
              min="0"
              placeholder="e.g., 2000"
              value={baseSalary}
              onChange={(e) => setBaseSalary(e.target.value)}
            />
          </div>
          
          <Button onClick={calculate} className="w-full">Calculate</Button>
          
          {result && (
            <div className="mt-6 space-y-4">
              <div className="p-4 bg-primary/10 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Total Earnings</p>
                <p className="text-4xl font-bold text-primary">${result.totalEarnings.toFixed(2)}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Commission</p>
                  <p className="text-xl font-bold">${result.commission.toFixed(2)}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Base Salary</p>
                  <p className="text-xl font-bold">${parseFloat(baseSalary || "0").toFixed(2)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
};

export default CommissionCalculator;
