import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UsageGuide } from "@/components/UsageGuide";

const CompoundInterest = () => {
  const [principal, setPrincipal] = useState("10000");
  const [rate, setRate] = useState("5");
  const [time, setTime] = useState("10");
  const [frequency, setFrequency] = useState("12");

  const calculateCompoundInterest = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);
    const n = parseFloat(frequency);

    if (!p || !r || !t || !n) return null;

    const amount = p * Math.pow(1 + r / n, n * t);
    const interest = amount - p;

    return {
      finalAmount: amount.toFixed(2),
      totalInterest: interest.toFixed(2),
      principal: p.toFixed(2)
    };
  };

  const result = calculateCompoundInterest();

  return (
    <ToolLayout
      title="Compound Interest Calculator"
      description="Calculate compound interest and future value"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Enter your principal (starting) amount",
            "Set the annual interest rate percentage",
            "Choose how long you'll invest (years)",
            "Select how often interest compounds"
          ]}
          tips={[
            "More frequent compounding = higher returns",
            "Long-term investing benefits most from compound interest",
            "Great for retirement planning and savings goals",
            "\"The 8th wonder of the world\" - Albert Einstein"
          ]}
          example="$10k at 5% for 10 years (monthly) = $16,470.09 total"
        />
      </div>
      <Card className="mt-6">
        <CardContent className="pt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Principal Amount ($)</Label>
              <Input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                placeholder="10000"
              />
            </div>

            <div className="space-y-2">
              <Label>Annual Interest Rate (%)</Label>
              <Input
                type="number"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                placeholder="5"
                step="0.1"
              />
            </div>

            <div className="space-y-2">
              <Label>Time Period (years)</Label>
              <Input
                type="number"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="10"
              />
            </div>

            <div className="space-y-2">
              <Label>Compound Frequency</Label>
              <Select value={frequency} onValueChange={setFrequency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Annually</SelectItem>
                  <SelectItem value="2">Semi-annually</SelectItem>
                  <SelectItem value="4">Quarterly</SelectItem>
                  <SelectItem value="12">Monthly</SelectItem>
                  <SelectItem value="52">Weekly</SelectItem>
                  <SelectItem value="365">Daily</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {result && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Principal</p>
                <p className="text-2xl font-semibold">${result.principal}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Total Interest</p>
                <p className="text-2xl font-semibold text-green-600">${result.totalInterest}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Final Amount</p>
                <p className="text-2xl font-semibold text-primary">${result.finalAmount}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </ToolLayout>
  );
};

export default CompoundInterest;
