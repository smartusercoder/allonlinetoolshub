import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function GstCalculator() {
  const [amount, setAmount] = useState("100");
  const [gstRate, setGstRate] = useState("18");
  const [mode, setMode] = useState<"add" | "remove">("add");

  const calculate = () => {
    const amt = parseFloat(amount);
    const rate = parseFloat(gstRate);

    if (mode === "add") {
      const gst = (amt * rate) / 100;
      const total = amt + gst;
      return {
        base: amt.toFixed(2),
        gst: gst.toFixed(2),
        total: total.toFixed(2)
      };
    } else {
      const base = amt / (1 + rate / 100);
      const gst = amt - base;
      return {
        base: base.toFixed(2),
        gst: gst.toFixed(2),
        total: amt.toFixed(2)
      };
    }
  };

  const result = calculate();

  return (
    <ToolLayout title="GST Calculator" description="Calculate GST (Goods and Services Tax)">
      <div className="space-y-4">
        <Card className="p-6 space-y-4">
          <div className="space-y-2">
            <Label>Mode</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={mode === "add" ? "default" : "outline"}
                onClick={() => setMode("add")}
              >
                Add GST
              </Button>
              <Button
                variant={mode === "remove" ? "default" : "outline"}
                onClick={() => setMode("remove")}
              >
                Remove GST
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">{mode === "add" ? "Amount (before GST)" : "Amount (with GST)"}</Label>
              <Input id="amount" type="number" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rate">GST Rate (%)</Label>
              <Input id="rate" type="number" step="0.1" value={gstRate} onChange={(e) => setGstRate(e.target.value)} />
            </div>
          </div>
        </Card>

        <Card className="p-6 space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Base Amount:</span>
            <span className="font-semibold">${result.base}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">GST ({gstRate}%):</span>
            <span className="font-semibold">${result.gst}</span>
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
