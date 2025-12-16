import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const VacationDaysCalculator = () => {
  const [totalDays, setTotalDays] = useState("");
  const [usedDays, setUsedDays] = useState("");
  const [plannedDays, setPlannedDays] = useState("");
  const [result, setResult] = useState<{ remaining: number; available: number } | null>(null);

  const calculate = () => {
    const total = parseFloat(totalDays) || 0;
    const used = parseFloat(usedDays) || 0;
    const planned = parseFloat(plannedDays) || 0;
    setResult({
      remaining: total - used,
      available: total - used - planned
    });
  };

  return (
    <ToolLayout title="Vacation Days Calculator" description="Track your vacation day balance">
      <Card className="p-6">
        <div className="space-y-4 max-w-md mx-auto">
          <div>
            <Label>Total Annual Vacation Days</Label>
            <Input type="number" value={totalDays} onChange={(e) => setTotalDays(e.target.value)} placeholder="e.g., 20" />
          </div>
          <div>
            <Label>Days Already Used</Label>
            <Input type="number" value={usedDays} onChange={(e) => setUsedDays(e.target.value)} placeholder="e.g., 5" />
          </div>
          <div>
            <Label>Days Planned/Scheduled</Label>
            <Input type="number" value={plannedDays} onChange={(e) => setPlannedDays(e.target.value)} placeholder="e.g., 3" />
          </div>
          <Button onClick={calculate} className="w-full">Calculate</Button>
          {result && (
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="p-4 bg-primary/10 rounded-lg text-center">
                <p className="text-3xl font-bold text-primary">{result.remaining}</p>
                <p className="text-sm text-muted-foreground">days remaining</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-3xl font-bold">{result.available}</p>
                <p className="text-sm text-muted-foreground">available to plan</p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
};

export default VacationDaysCalculator;
