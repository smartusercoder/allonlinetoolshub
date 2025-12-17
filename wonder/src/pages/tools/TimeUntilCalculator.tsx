import { useState, useEffect } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds, format } from "date-fns";

const TimeUntilCalculator = () => {
  const [targetDate, setTargetDate] = useState("");
  const [result, setResult] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

  useEffect(() => {
    if (!targetDate) return;
    const interval = setInterval(() => {
      const target = new Date(targetDate);
      const now = new Date();
      if (target <= now) {
        setResult({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setResult({
        days: differenceInDays(target, now),
        hours: differenceInHours(target, now) % 24,
        minutes: differenceInMinutes(target, now) % 60,
        seconds: differenceInSeconds(target, now) % 60
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <ToolLayout title="Time Until Calculator" description="Calculate time remaining until a specific date/time">
      <Card className="p-6">
        <div className="space-y-4 max-w-md mx-auto">
          <div>
            <Label>Target Date & Time</Label>
            <Input type="datetime-local" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} />
          </div>
          {result && (
            <div className="grid grid-cols-4 gap-2 mt-4">
              <div className="p-4 bg-primary/10 rounded-lg text-center">
                <p className="text-3xl font-bold text-primary">{result.days}</p>
                <p className="text-xs text-muted-foreground">days</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-3xl font-bold">{result.hours}</p>
                <p className="text-xs text-muted-foreground">hours</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-3xl font-bold">{result.minutes}</p>
                <p className="text-xs text-muted-foreground">min</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-3xl font-bold">{result.seconds}</p>
                <p className="text-xs text-muted-foreground">sec</p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
};

export default TimeUntilCalculator;
