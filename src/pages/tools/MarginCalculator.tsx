import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function MarginCalculator() {
  const [cost, setCost] = useState("50");
  const [price, setPrice] = useState("100");

  const calculate = () => {
    const c = parseFloat(cost);
    const p = parseFloat(price);

    const profit = p - c;
    const margin = ((profit / p) * 100);
    const markup = ((profit / c) * 100);

    return {
      profit: profit.toFixed(2),
      margin: margin.toFixed(2),
      markup: markup.toFixed(2)
    };
  };

  const result = calculate();

  return (
    <ToolLayout title="Margin Calculator" description="Calculate profit margin and markup">
      <div className="space-y-4">
        <Card className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cost">Cost ($)</Label>
              <Input id="cost" type="number" step="0.01" value={cost} onChange={(e) => setCost(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Selling Price ($)</Label>
              <Input id="price" type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Profit</div>
            <div className="text-2xl font-bold">${result.profit}</div>
          </Card>
          <Card className="p-4 bg-primary/10">
            <div className="text-sm text-muted-foreground">Margin</div>
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
