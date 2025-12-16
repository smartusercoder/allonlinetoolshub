import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const BonusCalculator = () => {
  const [salary, setSalary] = useState("");
  const [bonusPercent, setBonusPercent] = useState("");
  const [bonusAmount, setBonusAmount] = useState("");
  const [taxRate, setTaxRate] = useState("22");
  const [result, setResult] = useState<{ grossBonus: number; netBonus: number; taxes: number } | null>(null);

  const calculate = () => {
    const sal = parseFloat(salary);
    const percent = parseFloat(bonusPercent);
    const amount = parseFloat(bonusAmount);
    const tax = parseFloat(taxRate) / 100;
    
    let grossBonus = 0;
    if (!isNaN(amount) && amount > 0) {
      grossBonus = amount;
    } else if (!isNaN(sal) && !isNaN(percent)) {
      grossBonus = sal * (percent / 100);
    }
    
    if (grossBonus <= 0) return;
    
    const taxes = grossBonus * tax;
    setResult({
      grossBonus,
      netBonus: grossBonus - taxes,
      taxes
    });
  };

  return (
    <ToolLayout title="Bonus Calculator" description="Calculate your bonus after taxes">
      <Card className="p-6">
        <div className="space-y-4 max-w-md mx-auto">
          <div>
            <Label>Annual Salary ($) - for percentage calculation</Label>
            <Input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="e.g., 75000" />
          </div>
          <div>
            <Label>Bonus Percentage (%)</Label>
            <Input type="number" value={bonusPercent} onChange={(e) => setBonusPercent(e.target.value)} placeholder="e.g., 10" />
          </div>
          <div className="text-center text-muted-foreground">— or —</div>
          <div>
            <Label>Fixed Bonus Amount ($)</Label>
            <Input type="number" value={bonusAmount} onChange={(e) => setBonusAmount(e.target.value)} placeholder="e.g., 5000" />
          </div>
          <div>
            <Label>Tax Rate (%)</Label>
            <Input type="number" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} />
          </div>
          <Button onClick={calculate} className="w-full">Calculate Bonus</Button>
          {result && (
            <div className="space-y-4 mt-4">
              <div className="p-4 bg-primary/10 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Net Bonus (After Tax)</p>
                <p className="text-3xl font-bold text-primary">${result.netBonus.toFixed(2)}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Gross</p>
                  <p className="font-bold">${result.grossBonus.toFixed(2)}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Taxes</p>
                  <p className="font-bold">-${result.taxes.toFixed(2)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
};

export default BonusCalculator;
