import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DollarSign } from "lucide-react";
import { UsageGuide } from "@/components/UsageGuide";

const VatCalculator = () => {
  const [amount, setAmount] = useState("");
  const [vatRate, setVatRate] = useState("20");

  const calculate = () => {
    const price = parseFloat(amount) || 0;
    const rate = parseFloat(vatRate) || 0;

    const vatAmount = price * (rate / 100);
    const total = price + vatAmount;
    const priceWithoutVat = total / (1 + rate / 100);

    return { vatAmount, total, priceWithoutVat };
  };

  const { vatAmount, total, priceWithoutVat } = calculate();

  return (
    <ToolLayout
      title="VAT Calculator"
      description="Calculate VAT/GST/Sales Tax amounts"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Enter the net amount (price before tax)",
            "Set the VAT/tax rate percentage",
            "View VAT amount, price without VAT, and total"
          ]}
          tips={[
            "Common VAT rates: UK 20%, EU 15-25%, Canada 5-15%",
            "Also works for GST and sales tax calculations",
            "Useful for invoicing and price quotes",
            "Helps understand tax breakdown in receipts"
          ]}
          example="$100 + 20% VAT = $20 tax, $120 total"
        />
      </div>
      <Card className="p-6 space-y-4 mt-6">
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Net Amount ($)</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="100.00"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="vat">VAT Rate (%)</Label>
            <Input
              id="vat"
              type="number"
              value={vatRate}
              onChange={(e) => setVatRate(e.target.value)}
              placeholder="20"
            />
          </div>
        </div>

        {amount && (
          <div className="space-y-3 pt-4 border-t">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">VAT Amount</p>
                <p className="text-lg font-semibold">${vatAmount.toFixed(2)}</p>
              </div>
              <div className="p-3 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Price without VAT</p>
                <p className="text-lg font-semibold">${priceWithoutVat.toFixed(2)}</p>
              </div>
              <div className="col-span-2 p-4 bg-primary/10 rounded-md">
                <p className="text-sm text-muted-foreground">Total (incl. VAT)</p>
                <p className="text-2xl font-bold">${total.toFixed(2)}</p>
              </div>
            </div>
          </div>
        )}
      </Card>
    </ToolLayout>
  );
};

export default VatCalculator;
