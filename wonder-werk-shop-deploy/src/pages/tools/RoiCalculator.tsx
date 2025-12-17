import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { UsageGuide } from "@/components/UsageGuide";

export default function RoiCalculator() {
  const [investment, setInvestment] = useState("10000");
  const [returns, setReturns] = useState("15000");
  const [years, setYears] = useState("2");

  const calculate = () => {
    const inv = parseFloat(investment);
    const ret = parseFloat(returns);
    const yrs = parseFloat(years);

    const gain = ret - inv;
    const roi = (gain / inv) * 100;
    const annualized = ((Math.pow(ret / inv, 1 / yrs) - 1) * 100);

    return {
      gain: gain.toFixed(2),
      roi: roi.toFixed(2),
      annualized: annualized.toFixed(2)
    };
  };

  const result = calculate();
  const isPositive = parseFloat(result.roi) > 0;

  return (
    <ToolLayout title="ROI Calculator" description="Calculate return on investment">
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Enter your initial investment amount",
            "Enter the total returns you received",
            "Specify the time period in years",
            "View ROI percentage, gain/loss, and annualized return"
          ]}
          tips={[
            "ROI = (Returns - Investment) / Investment × 100",
            "Annualized ROI shows average yearly return",
            "Green indicates profit, red indicates loss",
            "Perfect for evaluating investment performance"
          ]}
          example="$10k invested → $15k returned over 2 years = 50% ROI"
        />
      </div>
      <div className="space-y-4 mt-6">
        <Card className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="investment">Initial Investment ($)</Label>
            <Input id="investment" type="number" value={investment} onChange={(e) => setInvestment(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="returns">Total Returns ($)</Label>
            <Input id="returns" type="number" value={returns} onChange={(e) => setReturns(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="years">Time Period (years)</Label>
            <Input id="years" type="number" value={years} onChange={(e) => setYears(e.target.value)} />
          </div>
        </Card>

        <Card className={`p-6 ${isPositive ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
          <div className="text-center space-y-4">
            <div>
              <div className="text-sm text-muted-foreground">ROI</div>
              <div className={`text-5xl font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {result.roi}%
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <div className="text-sm text-muted-foreground">Gain/Loss</div>
                <div className={`text-xl font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  ${result.gain}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Annualized ROI</div>
                <div className={`text-xl font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {result.annualized}%
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </ToolLayout>
  );
}
