import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function TimeComparison() {
  const [time1, setTime1] = useState("10:00");
  const [time2, setTime2] = useState("14:30");

  const compareTimes = () => {
    const [h1, m1] = time1.split(':').map(Number);
    const [h2, m2] = time2.split(':').map(Number);
    
    const minutes1 = h1 * 60 + m1;
    const minutes2 = h2 * 60 + m2;
    
    const diff = Math.abs(minutes2 - minutes1);
    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;
    
    return {
      hours,
      minutes,
      totalMinutes: diff,
      earlier: minutes1 < minutes2 ? time1 : time2,
      later: minutes1 < minutes2 ? time2 : time1
    };
  };

  const result = compareTimes();

  return (
    <ToolLayout
      title="Time Comparison"
      description="Compare two times and calculate difference"
    >
      <Card className="p-6 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="time1">First Time</Label>
            <Input
              id="time1"
              type="time"
              value={time1}
              onChange={(e) => setTime1(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="time2">Second Time</Label>
            <Input
              id="time2"
              type="time"
              value={time2}
              onChange={(e) => setTime2(e.target.value)}
            />
          </div>
        </div>

        <Card className="p-6 bg-primary/10 text-center">
          <div className="text-sm text-muted-foreground mb-2">Time Difference</div>
          <div className="text-4xl font-bold text-primary mb-4">
            {result.hours}h {result.minutes}m
          </div>
          <div className="text-sm">
            Total: {result.totalMinutes} minutes
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-4">
          <Card className="p-4 text-center">
            <div className="text-sm text-muted-foreground mb-2">Earlier</div>
            <div className="text-2xl font-bold text-primary">{result.earlier}</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-sm text-muted-foreground mb-2">Later</div>
            <div className="text-2xl font-bold text-primary">{result.later}</div>
          </Card>
        </div>
      </Card>
    </ToolLayout>
  );
}
