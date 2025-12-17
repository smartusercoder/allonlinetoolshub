import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function PaybackPeriodCalculator() {
  const [investment, setInvestment] = useState("50000");
  const [annualReturn, setAnnualReturn] = useState("15000");

  const calculate = () => {
    const inv = parseFloat(investment);
    const ret = parseFloat(annualReturn);

    const years = inv / ret;
    const months = years * 12;

    return {
      years: years.toFixed(2),
      months: months.toFixed(0)
    };
  };

  const result = calculate();

  return (
    <ToolLayout title="Payback Period Calculator" description="Calculate investment payback period">
      <div className="space-y-4">
        <Card className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="investment">Initial Investment ($)</Label>
            <Input id="investment" type="number" value={investment} onChange={(e) => setInvestment(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="annual">Annual Cash Return ($)</Label>
            <Input id="annual" type="number" value={annualReturn} onChange={(e) => setAnnualReturn(e.target.value)} />
          </div>
        </Card>

        <Card className="p-6 bg-primary/10 text-center">
          <div className="text-sm text-muted-foreground mb-2">Payback Period</div>
          <div className="text-4xl font-bold text-primary mb-1">{result.years}</div>
          <div className="text-sm">years ({result.months} months)</div>
        </Card>
      </div>
    </ToolLayout>
  );
}
