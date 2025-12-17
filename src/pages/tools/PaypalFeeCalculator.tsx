import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { UsageGuide } from "@/components/UsageGuide";

export default function PaypalFeeCalculator() {
  const [amount, setAmount] = useState("100");
  const [feeRate, setFeeRate] = useState("2.9");
  const [fixedFee, setFixedFee] = useState("0.30");

  const calculate = () => {
    const amt = parseFloat(amount);
    const rate = parseFloat(feeRate);
    const fixed = parseFloat(fixedFee);

    const fee = (amt * rate / 100) + fixed;
    const received = amt - fee;
    const sendAmount = (amt + fixed) / (1 - rate / 100);

    return {
      fee: fee.toFixed(2),
      received: received.toFixed(2),
      sendAmount: sendAmount.toFixed(2)
    };
  };

  const result = calculate();

  return (
    <ToolLayout title="PayPal Fee Calculator" description="Calculate PayPal fees and net amount">
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Enter the transaction amount",
            "Adjust fee rate (default: 2.9% for PayPal)",
            "Set fixed fee (default: $0.30)",
            "View PayPal fee, amount you receive, and amount to request"
          ]}
          tips={[
            "Default rates: 2.9% + $0.30 for PayPal domestic",
            "International fees are typically higher",
            "Use \"To Receive\" amount when invoicing clients",
            "Perfect for freelancers and small businesses"
          ]}
          example="$100 sale = $2.90 + $0.30 fee, you receive $96.80"
        />
      </div>
      <div className="space-y-4 mt-6">
        <Card className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount ($)</Label>
            <Input id="amount" type="number" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rate">Fee Rate (%)</Label>
              <Input id="rate" type="number" step="0.1" value={feeRate} onChange={(e) => setFeeRate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fixed">Fixed Fee ($)</Label>
              <Input id="fixed" type="number" step="0.01" value={fixedFee} onChange={(e) => setFixedFee(e.target.value)} />
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">PayPal Fee</div>
            <div className="text-2xl font-bold text-red-600">${result.fee}</div>
          </Card>
          <Card className="p-4 bg-green-50 border-green-200">
            <div className="text-sm text-muted-foreground">You Receive</div>
            <div className="text-2xl font-bold text-green-600">${result.received}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">To Receive ${amount}</div>
            <div className="text-2xl font-bold">${result.sendAmount}</div>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
