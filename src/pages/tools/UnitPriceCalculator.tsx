import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator } from "lucide-react";

const UnitPriceCalculator = () => {
  const [price1, setPrice1] = useState("");
  const [quantity1, setQuantity1] = useState("");
  const [price2, setPrice2] = useState("");
  const [quantity2, setQuantity2] = useState("");

  const calculate = (price: string, quantity: string) => {
    const p = parseFloat(price) || 0;
    const q = parseFloat(quantity) || 0;
    return q > 0 ? p / q : 0;
  };

  const unitPrice1 = calculate(price1, quantity1);
  const unitPrice2 = calculate(price2, quantity2);
  const betterDeal = unitPrice1 > 0 && unitPrice2 > 0 
    ? (unitPrice1 < unitPrice2 ? "Option 1" : unitPrice2 < unitPrice1 ? "Option 2" : "Equal")
    : null;

  return (
    <ToolLayout
      title="Unit Price Calculator"
      description="Compare unit prices to find the best deal"
    >
      <Card className="p-6 space-y-4">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4 p-4 border rounded-lg">
            <h3 className="font-semibold">Option 1</h3>
            <div className="space-y-2">
              <Label htmlFor="price1">Price ($)</Label>
              <Input
                id="price1"
                type="number"
                value={price1}
                onChange={(e) => setPrice1(e.target.value)}
                placeholder="10.00"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity1">Quantity/Weight</Label>
              <Input
                id="quantity1"
                type="number"
                value={quantity1}
                onChange={(e) => setQuantity1(e.target.value)}
                placeholder="500"
              />
            </div>
            {unitPrice1 > 0 && (
              <div className="p-3 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Unit Price</p>
                <p className="text-xl font-bold">${unitPrice1.toFixed(4)}/unit</p>
              </div>
            )}
          </div>

          <div className="space-y-4 p-4 border rounded-lg">
            <h3 className="font-semibold">Option 2</h3>
            <div className="space-y-2">
              <Label htmlFor="price2">Price ($)</Label>
              <Input
                id="price2"
                type="number"
                value={price2}
                onChange={(e) => setPrice2(e.target.value)}
                placeholder="15.00"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity2">Quantity/Weight</Label>
              <Input
                id="quantity2"
                type="number"
                value={quantity2}
                onChange={(e) => setQuantity2(e.target.value)}
                placeholder="750"
              />
            </div>
            {unitPrice2 > 0 && (
              <div className="p-3 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Unit Price</p>
                <p className="text-xl font-bold">${unitPrice2.toFixed(4)}/unit</p>
              </div>
            )}
          </div>
        </div>

        {betterDeal && (
          <div className="p-4 bg-primary/10 border border-primary/20 rounded-md text-center">
            <Calculator className="h-8 w-8 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Better Deal</p>
            <p className="text-2xl font-bold">{betterDeal}</p>
          </div>
        )}
      </Card>
    </ToolLayout>
  );
};

export default UnitPriceCalculator;
