import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function BreakEvenCalculator() {
  const [fixedCosts, setFixedCosts] = useState("10000");
  const [variableCost, setVariableCost] = useState("20");
  const [sellingPrice, setSellingPrice] = useState("50");

  const calculate = () => {
    const fc = parseFloat(fixedCosts);
    const vc = parseFloat(variableCost);
    const sp = parseFloat(sellingPrice);

    const contributionMargin = sp - vc;
    const breakEvenUnits = fc / contributionMargin;
    const breakEvenRevenue = breakEvenUnits * sp;
    const marginPercentage = (contributionMargin / sp) * 100;

    return {
      units: Math.ceil(breakEvenUnits),
      revenue: breakEvenRevenue.toFixed(2),
      margin: marginPercentage.toFixed(2)
    };
  };

  const result = calculate();

  return (
    <ToolLayout title="Break Even Calculator" description="Calculate break-even point">
      <div className="space-y-4">
        <Card className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fixed">Fixed Costs ($)</Label>
            <Input id="fixed" type="number" value={fixedCosts} onChange={(e) => setFixedCosts(e.target.value)} />
            <p className="text-xs text-muted-foreground">Rent, salaries, insurance, etc.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="variable">Variable Cost per Unit ($)</Label>
            <Input id="variable" type="number" value={variableCost} onChange={(e) => setVariableCost(e.target.value)} />
            <p className="text-xs text-muted-foreground">Materials, labor, shipping, etc.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="selling">Selling Price per Unit ($)</Label>
            <Input id="selling" type="number" value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} />
          </div>
        </Card>

        <Card className="p-6 bg-primary/10">
          <div className="text-center space-y-4">
            <div>
              <div className="text-sm text-muted-foreground">Break-Even Point</div>
              <div className="text-4xl font-bold text-primary">{result.units}</div>
              <div className="text-sm">units</div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <div className="text-sm text-muted-foreground">Revenue Needed</div>
                <div className="text-xl font-bold">${result.revenue}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Margin</div>
                <div className="text-xl font-bold">{result.margin}%</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </ToolLayout>
  );
}
