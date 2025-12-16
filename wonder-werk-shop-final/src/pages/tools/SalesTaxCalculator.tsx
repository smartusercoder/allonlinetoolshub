import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { UsageGuide } from "@/components/UsageGuide";

export default function SalesTaxCalculator() {
  const [price, setPrice] = useState("100");
  const [taxRate, setTaxRate] = useState("8.5");

  const calculate = () => {
    const p = parseFloat(price);
    const r = parseFloat(taxRate);

    const tax = (p * r) / 100;
    const total = p + tax;

    return {
      subtotal: p.toFixed(2),
      tax: tax.toFixed(2),
      total: total.toFixed(2)
    };
  };

  const result = calculate();

  return (
    <ToolLayout title="Sales Tax Calculator" description="Calculate sales tax and total price">
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Enter the price before tax",
            "Enter your local sales tax rate percentage",
            "View subtotal, tax amount, and total price"
          ]}
          tips={[
            "Sales tax rates vary by state/country",
            "US states range from 0% (no tax) to 7%+",
            "Some cities add additional local taxes",
            "Perfect for budgeting purchases and shopping"
          ]}
          example="$100 item + 8.5% tax = $8.50 tax, $108.50 total"
        />
      </div>
      <div className="space-y-4 mt-6">
        <Card className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="price">Price Before Tax ($)</Label>
            <Input id="price" type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="taxRate">Tax Rate (%)</Label>
            <Input id="taxRate" type="number" step="0.1" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} />
          </div>
        </Card>

        <Card className="p-6 space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal:</span>
            <span className="font-semibold">${result.subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tax ({taxRate}%):</span>
            <span className="font-semibold">${result.tax}</span>
          </div>
          <div className="flex justify-between pt-3 border-t">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-2xl font-bold text-primary">${result.total}</span>
          </div>
        </Card>
      </div>
    </ToolLayout>
  );
}
