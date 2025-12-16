import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { UsageGuide } from "@/components/UsageGuide";

export default function TaxCalculator() {
  const [amount, setAmount] = useState("100");
  const [taxRate, setTaxRate] = useState("8.5");

  const subtotal = parseFloat(amount) || 0;
  const rate = parseFloat(taxRate) / 100;
  const taxAmount = subtotal * rate;
  const total = subtotal + taxAmount;

  return (
    <ToolLayout
      title="Tax Calculator"
      description="Calculate sales tax and total amount"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Enter the subtotal amount (before tax)",
            "Enter the tax rate percentage",
            "View tax amount and total automatically",
            "Results update in real-time as you type"
          ]}
          tips={[
            "Common US sales tax rates: 6-10%",
            "Perfect for shopping, invoices, and budgeting",
            "Helps calculate final price before checkout",
            "Great for comparing prices across different tax jurisdictions"
          ]}
          example="$100 subtotal with 8.5% tax = $108.50 total"
        />
      </div>
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium">Subtotal ($)</label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Tax Rate (%)</label>
            <Input
              type="number"
              value={taxRate}
              onChange={(e) => setTaxRate(e.target.value)}
              min="0"
              step="0.1"
            />
          </div>

          <div className="space-y-4 pt-4 border-t">
            <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
              <span className="font-medium">Subtotal:</span>
              <span className="text-xl font-bold">${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
              <span className="font-medium">Tax ({taxRate}%):</span>
              <span className="text-xl font-bold text-orange-600">${taxAmount.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center p-4 bg-primary/10 rounded-lg">
              <span className="font-medium">Total:</span>
              <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </Card>
    </ToolLayout>
  );
}
