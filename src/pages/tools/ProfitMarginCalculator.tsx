import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function ProfitMarginCalculator() {
  const [revenue, setRevenue] = useState("10000");
  const [cost, setCost] = useState("6000");

  const calculate = () => {
    const r = parseFloat(revenue);
    const c = parseFloat(cost);

    const profit = r - c;
    const margin = (profit / r) * 100;
    const markup = (profit / c) * 100;

    return {
      profit: profit.toFixed(2),
      margin: margin.toFixed(2),
      markup: markup.toFixed(2)
    };
  };

  const result = calculate();

  return (
    <ToolLayout title="Profit Margin Calculator" description="Calculate profit margins and markup">
      <div className="space-y-4">
        <Card className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="revenue">Revenue ($)</Label>
            <Input id="revenue" type="number" value={revenue} onChange={(e) => setRevenue(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cost">Cost ($)</Label>
            <Input id="cost" type="number" value={cost} onChange={(e) => setCost(e.target.value)} />
          </div>
        </Card>

        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Profit</div>
            <div className="text-2xl font-bold">${result.profit}</div>
          </Card>
          <Card className="p-4 bg-primary/10">
            <div className="text-sm text-muted-foreground">Profit Margin</div>
            <div className="text-2xl font-bold text-primary">{result.margin}%</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Markup</div>
            <div className="text-2xl font-bold">{result.markup}%</div>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
