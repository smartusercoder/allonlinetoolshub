import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { differenceInMonths, differenceInDays, differenceInYears } from "date-fns";

const MonthsBetweenCalculator = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [result, setResult] = useState<{ months: number; years: number; days: number } | null>(null);

  const calculate = () => {
    if (!startDate || !endDate) return;
    const start = new Date(startDate);
    const end = new Date(endDate);
    setResult({
      months: Math.abs(differenceInMonths(end, start)),
      years: Math.abs(differenceInYears(end, start)),
      days: Math.abs(differenceInDays(end, start))
    });
  };

  return (
    <ToolLayout title="Months Between Calculator" description="Calculate months between two dates">
      <Card className="p-6">
        <div className="space-y-4 max-w-md mx-auto">
          <div>
            <Label>Start Date</Label>
            <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <div>
            <Label>End Date</Label>
            <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
          <Button onClick={calculate} className="w-full">Calculate</Button>
          {result && (
            <div className="p-4 bg-primary/10 rounded-lg text-center">
              <p className="text-4xl font-bold text-primary">{result.months} months</p>
              <p className="text-muted-foreground">{result.years} years and {result.days} days total</p>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
};

export default MonthsBetweenCalculator;
