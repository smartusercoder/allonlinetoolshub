import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { differenceInDays, differenceInWeeks, differenceInMonths, format, isBefore } from "date-fns";

const DaysUntilCalculator = () => {
  const [targetDate, setTargetDate] = useState("");
  const [result, setResult] = useState<{
    days: number;
    weeks: number;
    months: number;
    isPast: boolean;
  } | null>(null);

  const calculate = () => {
    if (!targetDate) return;
    
    const target = new Date(targetDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);
    
    const isPast = isBefore(target, today);
    const days = Math.abs(differenceInDays(target, today));
    const weeks = Math.abs(differenceInWeeks(target, today));
    const months = Math.abs(differenceInMonths(target, today));
    
    setResult({ days, weeks, months, isPast });
  };

  return (
    <ToolLayout
      title="Days Until Calculator"
      description="Calculate how many days until a specific date"
    >
      <Card className="p-6">
        <div className="space-y-4 max-w-md mx-auto">
          <div>
            <Label htmlFor="targetDate">Target Date</Label>
            <Input
              id="targetDate"
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
            />
          </div>
          
          <Button onClick={calculate} className="w-full">Calculate</Button>
          
          {result && targetDate && (
            <div className="mt-6 p-4 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-2">
                {result.isPast ? "Days since" : "Days until"} {format(new Date(targetDate), "MMMM d, yyyy")}
              </p>
              <p className="text-4xl font-bold text-primary">{result.days}</p>
              <p className="text-lg text-muted-foreground">days</p>
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold">{result.weeks}</p>
                  <p className="text-muted-foreground">weeks</p>
                </div>
                <div>
                  <p className="font-semibold">{result.months}</p>
                  <p className="text-muted-foreground">months</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
};

export default DaysUntilCalculator;
