import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { differenceInYears, differenceInMonths, differenceInDays, differenceInHours, differenceInMinutes } from "date-fns";

const ChronologicalAgeCalculator = () => {
  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState<{ years: number; months: number; days: number; totalDays: number; hours: number } | null>(null);

  const calculate = () => {
    if (!birthDate) return;
    const birth = new Date(birthDate);
    const today = new Date();
    const years = differenceInYears(today, birth);
    const months = differenceInMonths(today, birth) % 12;
    const totalDays = differenceInDays(today, birth);
    const days = totalDays % 30;
    const hours = differenceInHours(today, birth);
    setResult({ years, months, days, totalDays, hours });
  };

  return (
    <ToolLayout title="Chronological Age Calculator" description="Calculate your exact age">
      <Card className="p-6">
        <div className="space-y-4 max-w-md mx-auto">
          <div>
            <Label>Date of Birth</Label>
            <Input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
          </div>
          <Button onClick={calculate} className="w-full">Calculate Exact Age</Button>
          {result && (
            <div className="space-y-4 mt-4">
              <div className="p-4 bg-primary/10 rounded-lg text-center">
                <p className="text-3xl font-bold text-primary">{result.years} years, {result.months} months, {result.days} days</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-2xl font-bold">{result.totalDays.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">total days</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-2xl font-bold">{result.hours.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">total hours</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
};

export default ChronologicalAgeCalculator;
