import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator } from "lucide-react";

const PriceCalculator = () => {
  const [originalPrice, setOriginalPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [tax, setTax] = useState("");

  const calculate = () => {
    const price = parseFloat(originalPrice) || 0;
    const disc = parseFloat(discount) || 0;
    const taxRate = parseFloat(tax) || 0;

    const discounted = price - (price * disc / 100);
    const final = discounted + (discounted * taxRate / 100);
    const saved = price - discounted;

    return { discounted, final, saved };
  };

  const { discounted, final, saved } = calculate();

  return (
    <ToolLayout
      title="Price Calculator"
      description="Calculate final price with discount and tax"
    >
      <Card className="p-6 space-y-4">
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="price">Original Price ($)</Label>
            <Input
              id="price"
              type="number"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              placeholder="100.00"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="discount">Discount (%)</Label>
            <Input
              id="discount"
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              placeholder="20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tax">Tax Rate (%)</Label>
            <Input
              id="tax"
              type="number"
              value={tax}
              onChange={(e) => setTax(e.target.value)}
              placeholder="8.5"
            />
          </div>
        </div>

        {originalPrice && (
          <div className="space-y-3 pt-4 border-t">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">After Discount</p>
                <p className="text-lg font-semibold">${discounted.toFixed(2)}</p>
              </div>
              <div className="p-3 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">You Save</p>
                <p className="text-lg font-semibold text-green-500">${saved.toFixed(2)}</p>
              </div>
              <div className="col-span-2 p-4 bg-primary/10 rounded-md">
                <p className="text-sm text-muted-foreground">Final Price (with tax)</p>
                <p className="text-2xl font-bold">${final.toFixed(2)}</p>
              </div>
            </div>
          </div>
        )}
      </Card>
    </ToolLayout>
  );
};

export default PriceCalculator;
