import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { differenceInDays, differenceInMonths, differenceInYears } from "date-fns";

const RelationshipCalculator = () => {
  const [startDate, setStartDate] = useState("");
  const [result, setResult] = useState<{ years: number; months: number; days: number; totalDays: number } | null>(null);

  const calculate = () => {
    if (!startDate) return;
    const start = new Date(startDate);
    const today = new Date();
    const years = differenceInYears(today, start);
    const totalMonths = differenceInMonths(today, start);
    const totalDays = differenceInDays(today, start);
    setResult({
      years,
      months: totalMonths % 12,
      days: totalDays % 30,
      totalDays
    });
  };

  return (
    <ToolLayout title="Relationship Calculator" description="Calculate how long you've been together">
      <Card className="p-6">
        <div className="space-y-4 max-w-md mx-auto">
          <div>
            <Label>Relationship Start Date</Label>
            <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <Button onClick={calculate} className="w-full">Calculate</Button>
          {result && (
            <div className="space-y-4 mt-4">
              <div className="p-6 bg-pink-500/10 rounded-lg text-center">
                <p className="text-4xl">❤️</p>
                <p className="text-2xl font-bold text-pink-600">{result.years} years, {result.months} months, {result.days} days</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-3xl font-bold">{result.totalDays.toLocaleString()}</p>
                <p className="text-muted-foreground">days together</p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
};

export default RelationshipCalculator;
