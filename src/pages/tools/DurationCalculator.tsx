import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function DurationCalculator() {
  const [hours, setHours] = useState("2");
  const [minutes, setMinutes] = useState("30");
  const [seconds, setSeconds] = useState("45");

  const calculate = () => {
    const h = parseInt(hours) || 0;
    const m = parseInt(minutes) || 0;
    const s = parseInt(seconds) || 0;

    const totalSeconds = h * 3600 + m * 60 + s;
    const totalMinutes = totalSeconds / 60;
    const totalHours = totalSeconds / 3600;
    const totalDays = totalSeconds / 86400;

    return {
      seconds: totalSeconds,
      minutes: totalMinutes.toFixed(2),
      hours: totalHours.toFixed(2),
      days: totalDays.toFixed(2)
    };
  };

  const result = calculate();

  return (
    <ToolLayout
      title="Duration Calculator"
      description="Convert time duration to different units"
    >
      <Card className="p-6 space-y-4">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="hours">Hours</Label>
            <Input
              id="hours"
              type="number"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              placeholder="0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="minutes">Minutes</Label>
            <Input
              id="minutes"
              type="number"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              placeholder="0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="seconds">Seconds</Label>
            <Input
              id="seconds"
              type="number"
              value={seconds}
              onChange={(e) => setSeconds(e.target.value)}
              placeholder="0"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Card className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Total Seconds</div>
            <div className="text-2xl font-bold text-primary">{result.seconds}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Total Minutes</div>
            <div className="text-2xl font-bold text-primary">{result.minutes}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Total Hours</div>
            <div className="text-2xl font-bold text-primary">{result.hours}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Total Days</div>
            <div className="text-2xl font-bold text-primary">{result.days}</div>
          </Card>
        </div>
      </Card>
    </ToolLayout>
  );
}
