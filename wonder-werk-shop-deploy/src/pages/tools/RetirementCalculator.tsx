import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function RetirementCalculator() {
  const [age, setAge] = useState("30");
  const [retirement, setRetirement] = useState("65");
  const [savings, setSavings] = useState("50000");
  const [monthly, setMonthly] = useState("500");
  const [rate, setRate] = useState("7");

  const years = parseInt(retirement) - parseInt(age);
  const months = years * 12;
  const r = parseFloat(rate) / 100 / 12;
  const current = parseFloat(savings);
  const contribution = parseFloat(monthly);

  const future = current * Math.pow(1 + r, months) + contribution * ((Math.pow(1 + r, months) - 1) / r);

  return (
    <ToolLayout title="Retirement Calculator" description="Plan your retirement savings">
      <div className="space-y-4">
        <Input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="Current Age" />
        <Input type="number" value={retirement} onChange={e => setRetirement(e.target.value)} placeholder="Retirement Age" />
        <Input type="number" value={savings} onChange={e => setSavings(e.target.value)} placeholder="Current Savings" />
        <Input type="number" value={monthly} onChange={e => setMonthly(e.target.value)} placeholder="Monthly Contribution" />
        <Input type="number" value={rate} onChange={e => setRate(e.target.value)} placeholder="Annual Return %" />
        <Card className="p-6 text-center bg-primary/10">
          <div className="text-sm text-muted-foreground">Estimated at Retirement</div>
          <div className="text-4xl font-bold text-primary">${future.toLocaleString(undefined, {maximumFractionDigits: 0})}</div>
        </Card>
      </div>
    </ToolLayout>
  );
}
