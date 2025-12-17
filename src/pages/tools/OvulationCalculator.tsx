import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addDays, format } from "date-fns";

const OvulationCalculator = () => {
  const [lastPeriod, setLastPeriod] = useState("");
  const [cycleLength, setCycleLength] = useState("28");
  const [result, setResult] = useState<{ ovulationDate: Date; fertileStart: Date; fertileEnd: Date } | null>(null);

  const calculate = () => {
    if (!lastPeriod) return;
    const lmp = new Date(lastPeriod);
    const cycle = parseInt(cycleLength) || 28;
    const ovulationDay = cycle - 14;
    const ovulationDate = addDays(lmp, ovulationDay);
    setResult({
      ovulationDate,
      fertileStart: addDays(ovulationDate, -5),
      fertileEnd: addDays(ovulationDate, 1)
    });
  };

  return (
    <ToolLayout title="Ovulation Calculator" description="Calculate your ovulation window">
      <Card className="p-6">
        <div className="space-y-4 max-w-md mx-auto">
          <div>
            <Label>First Day of Last Period</Label>
            <Input type="date" value={lastPeriod} onChange={(e) => setLastPeriod(e.target.value)} />
          </div>
          <div>
            <Label>Average Cycle Length (days)</Label>
            <Input type="number" value={cycleLength} onChange={(e) => setCycleLength(e.target.value)} min="21" max="35" />
          </div>
          <Button onClick={calculate} className="w-full">Calculate</Button>
          {result && (
            <div className="space-y-4 mt-4">
              <div className="p-4 bg-pink-500/10 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Estimated Ovulation</p>
                <p className="text-2xl font-bold text-pink-600">{format(result.ovulationDate, "MMMM d, yyyy")}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Fertile Window</p>
                <p className="font-semibold">{format(result.fertileStart, "MMM d")} - {format(result.fertileEnd, "MMM d, yyyy")}</p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
};

export default OvulationCalculator;
