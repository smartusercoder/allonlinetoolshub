import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Percent } from "lucide-react";

const MarkupCalculator = () => {
  const [cost, setCost] = useState("");
  const [markup, setMarkup] = useState("");

  const calculate = () => {
    const costPrice = parseFloat(cost) || 0;
    const markupPercent = parseFloat(markup) || 0;

    const markupAmount = costPrice * (markupPercent / 100);
    const sellingPrice = costPrice + markupAmount;
    const profit = markupAmount;
    const margin = sellingPrice > 0 ? (profit / sellingPrice) * 100 : 0;

    return { markupAmount, sellingPrice, profit, margin };
  };

  const { markupAmount, sellingPrice, profit, margin } = calculate();

  return (
    <ToolLayout
      title="Markup Calculator"
      description="Calculate markup, margin, and selling price"
    >
      <Card className="p-6 space-y-4">
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="cost">Cost Price ($)</Label>
            <Input
              id="cost"
              type="number"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              placeholder="100.00"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="markup">Markup (%)</Label>
            <Input
              id="markup"
              type="number"
              value={markup}
              onChange={(e) => setMarkup(e.target.value)}
              placeholder="50"
            />
          </div>
        </div>

        {cost && markup && (
          <div className="space-y-3 pt-4 border-t">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Markup Amount</p>
                <p className="text-lg font-semibold">${markupAmount.toFixed(2)}</p>
              </div>
              <div className="p-3 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Profit</p>
                <p className="text-lg font-semibold">${profit.toFixed(2)}</p>
              </div>
              <div className="p-3 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Profit Margin</p>
                <p className="text-lg font-semibold">{margin.toFixed(2)}%</p>
              </div>
              <div className="col-span-2 p-4 bg-primary/10 rounded-md">
                <p className="text-sm text-muted-foreground">Selling Price</p>
                <p className="text-2xl font-bold">${sellingPrice.toFixed(2)}</p>
              </div>
            </div>
          </div>
        )}
      </Card>
    </ToolLayout>
  );
};

export default MarkupCalculator;
