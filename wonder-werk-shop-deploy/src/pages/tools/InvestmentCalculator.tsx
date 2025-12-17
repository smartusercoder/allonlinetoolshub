import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function InvestmentCalculator() {
  const [initial, setInitial] = useState("10000");
  const [monthly, setMonthly] = useState("500");
  const [rate, setRate] = useState("7");
  const [years, setYears] = useState("10");

  const initialAmount = parseFloat(initial) || 0;
  const monthlyContribution = parseFloat(monthly) || 0;
  const annualRate = parseFloat(rate) / 100;
  const months = parseFloat(years) * 12;
  const monthlyRate = annualRate / 12;

  // Future value calculation
  const futureValue = initialAmount * Math.pow(1 + monthlyRate, months) +
    monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

  const totalContributed = initialAmount + (monthlyContribution * months);
  const totalEarnings = futureValue - totalContributed;

  return (
    <ToolLayout
      title="Investment Calculator"
      description="Calculate investment returns with compound interest"
    >
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium">Initial Investment ($)</label>
            <Input
              type="number"
              value={initial}
              onChange={(e) => setInitial(e.target.value)}
              min="0"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Monthly Contribution ($)</label>
            <Input
              type="number"
              value={monthly}
              onChange={(e) => setMonthly(e.target.value)}
              min="0"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Expected Annual Return (%)</label>
            <Input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              min="0"
              step="0.1"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Investment Period (Years)</label>
            <Input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              min="1"
            />
          </div>

          <div className="space-y-4 pt-4 border-t">
            <div className="p-4 bg-primary/10 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Future Value</div>
              <div className="text-3xl font-bold text-primary">
                ${futureValue.toLocaleString(undefined, {maximumFractionDigits: 2})}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Total Contributed</div>
                <div className="text-xl font-bold">
                  ${totalContributed.toLocaleString(undefined, {maximumFractionDigits: 2})}
                </div>
              </div>
              
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Total Earnings</div>
                <div className="text-xl font-bold text-green-600">
                  ${totalEarnings.toLocaleString(undefined, {maximumFractionDigits: 2})}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </ToolLayout>
  );
}
