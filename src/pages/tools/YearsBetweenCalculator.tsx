import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { differenceInYears, differenceInMonths, differenceInDays } from "date-fns";

const YearsBetweenCalculator = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [result, setResult] = useState<{ years: number; months: number; days: number } | null>(null);

  const calculate = () => {
    if (!startDate || !endDate) return;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const totalMonths = Math.abs(differenceInMonths(end, start));
    setResult({
      years: Math.abs(differenceInYears(end, start)),
      months: totalMonths % 12,
      days: Math.abs(differenceInDays(end, start))
    });
  };

  return (
    <ToolLayout title="Years Between Calculator" description="Calculate years between two dates">
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
              <p className="text-4xl font-bold text-primary">{result.years} years</p>
              <p className="text-muted-foreground">{result.years} years, {result.months} months ({result.days} days total)</p>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
};

export default YearsBetweenCalculator;
