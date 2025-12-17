import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function SavingsGoal() {
  const [goal, setGoal] = useState("10000");
  const [current, setCurrent] = useState("2000");
  const [monthly, setMonthly] = useState("500");

  const remaining = parseFloat(goal) - parseFloat(current);
  const months = Math.ceil(remaining / parseFloat(monthly));
  const progress = (parseFloat(current) / parseFloat(goal)) * 100;

  return (
    <ToolLayout title="Savings Goal Calculator" description="Track savings progress">
      <div className="space-y-4">
        <Input type="number" value={goal} onChange={e => setGoal(e.target.value)} placeholder="Goal Amount" />
        <Input type="number" value={current} onChange={e => setCurrent(e.target.value)} placeholder="Current Savings" />
        <Input type="number" value={monthly} onChange={e => setMonthly(e.target.value)} placeholder="Monthly Savings" />
        <Card className="p-6 space-y-4">
          <div className="w-full bg-muted rounded-full h-4">
            <div className="bg-primary h-4 rounded-full transition-all" style={{width: `${Math.min(100, progress)}%`}} />
          </div>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">${remaining.toFixed(2)}</div>
              <div className="text-sm">Remaining</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{months}</div>
              <div className="text-sm">Months to Goal</div>
            </div>
          </div>
        </Card>
      </div>
    </ToolLayout>
  );
}
