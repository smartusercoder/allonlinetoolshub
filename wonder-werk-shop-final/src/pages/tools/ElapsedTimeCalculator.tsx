import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ElapsedTimeCalculator = () => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [result, setResult] = useState<{ hours: number; minutes: number; totalMinutes: number } | null>(null);

  const calculate = () => {
    if (!startTime || !endTime) return;
    const [startH, startM] = startTime.split(":").map(Number);
    const [endH, endM] = endTime.split(":").map(Number);
    
    let totalMinutes = (endH * 60 + endM) - (startH * 60 + startM);
    if (totalMinutes < 0) totalMinutes += 24 * 60; // Handle overnight
    
    setResult({
      hours: Math.floor(totalMinutes / 60),
      minutes: totalMinutes % 60,
      totalMinutes
    });
  };

  return (
    <ToolLayout title="Elapsed Time Calculator" description="Calculate time elapsed between two times">
      <Card className="p-6">
        <div className="space-y-4 max-w-md mx-auto">
          <div>
            <Label>Start Time</Label>
            <Input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
          </div>
          <div>
            <Label>End Time</Label>
            <Input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
          </div>
          <Button onClick={calculate} className="w-full">Calculate Elapsed Time</Button>
          {result && (
            <div className="p-4 bg-primary/10 rounded-lg text-center">
              <p className="text-3xl font-bold text-primary">{result.hours}h {result.minutes}m</p>
              <p className="text-muted-foreground">{result.totalMinutes} total minutes</p>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
};

export default ElapsedTimeCalculator;
