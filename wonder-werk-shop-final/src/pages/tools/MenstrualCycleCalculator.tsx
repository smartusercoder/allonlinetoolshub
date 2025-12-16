import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addDays, format } from "date-fns";

const MenstrualCycleCalculator = () => {
  const [lastPeriod, setLastPeriod] = useState("");
  const [cycleLength, setCycleLength] = useState("28");
  const [periodLength, setPeriodLength] = useState("5");
  const [result, setResult] = useState<{ nextPeriod: Date; periodEnd: Date; ovulation: Date }[] | null>(null);

  const calculate = () => {
    if (!lastPeriod) return;
    const lmp = new Date(lastPeriod);
    const cycle = parseInt(cycleLength) || 28;
    const period = parseInt(periodLength) || 5;
    
    const predictions = [];
    for (let i = 1; i <= 6; i++) {
      const nextPeriod = addDays(lmp, cycle * i);
      predictions.push({
        nextPeriod,
        periodEnd: addDays(nextPeriod, period),
        ovulation: addDays(nextPeriod, -14)
      });
    }
    setResult(predictions);
  };

  return (
    <ToolLayout title="Menstrual Cycle Calculator" description="Track and predict your menstrual cycle">
      <Card className="p-6">
        <div className="space-y-4 max-w-md mx-auto">
          <div>
            <Label>First Day of Last Period</Label>
            <Input type="date" value={lastPeriod} onChange={(e) => setLastPeriod(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Cycle Length (days)</Label>
              <Input type="number" value={cycleLength} onChange={(e) => setCycleLength(e.target.value)} min="21" max="35" />
            </div>
            <div>
              <Label>Period Length (days)</Label>
              <Input type="number" value={periodLength} onChange={(e) => setPeriodLength(e.target.value)} min="2" max="10" />
            </div>
          </div>
          <Button onClick={calculate} className="w-full">Predict Next 6 Cycles</Button>
          {result && (
            <div className="space-y-2 mt-4">
              {result.map((r, i) => (
                <div key={i} className="p-3 bg-muted rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{format(r.nextPeriod, "MMM d")} - {format(r.periodEnd, "MMM d")}</p>
                    <p className="text-xs text-muted-foreground">Ovulation ~{format(r.ovulation, "MMM d")}</p>
                  </div>
                  <span className="text-muted-foreground">Cycle {i + 1}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
};

export default MenstrualCycleCalculator;
