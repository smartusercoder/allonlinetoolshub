import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const HourlyToSalary = () => {
  const [hourlyRate, setHourlyRate] = useState("");
  const [hoursPerWeek, setHoursPerWeek] = useState("40");
  const [weeksPerYear, setWeeksPerYear] = useState("52");
  const [result, setResult] = useState<{
    annual: number;
    monthly: number;
    biweekly: number;
    weekly: number;
  } | null>(null);

  const calculate = () => {
    const rate = parseFloat(hourlyRate);
    const hours = parseFloat(hoursPerWeek);
    const weeks = parseFloat(weeksPerYear);
    
    if (isNaN(rate) || isNaN(hours) || isNaN(weeks)) return;
    
    const annual = rate * hours * weeks;
    const monthly = annual / 12;
    const biweekly = annual / 26;
    const weekly = annual / weeks;
    
    setResult({ annual, monthly, biweekly, weekly });
  };

  return (
    <ToolLayout
      title="Hourly to Salary Calculator"
      description="Convert hourly wage to annual salary and other pay periods"
    >
      <Card className="p-6">
        <div className="space-y-4 max-w-md mx-auto">
          <div>
            <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
            <Input
              id="hourlyRate"
              type="number"
              min="0"
              step="0.01"
              placeholder="e.g., 25"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="hoursPerWeek">Hours Per Week</Label>
            <Input
              id="hoursPerWeek"
              type="number"
              min="0"
              placeholder="e.g., 40"
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="weeksPerYear">Weeks Per Year</Label>
            <Input
              id="weeksPerYear"
              type="number"
              min="0"
              max="52"
              placeholder="e.g., 52"
              value={weeksPerYear}
              onChange={(e) => setWeeksPerYear(e.target.value)}
            />
          </div>
          
          <Button onClick={calculate} className="w-full">Calculate</Button>
          
          {result && (
            <div className="mt-6 space-y-4">
              <div className="p-4 bg-primary/10 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Annual Salary</p>
                <p className="text-4xl font-bold text-primary">${result.annual.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Monthly</p>
                  <p className="text-lg font-bold">${result.monthly.toFixed(2)}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Bi-weekly</p>
                  <p className="text-lg font-bold">${result.biweekly.toFixed(2)}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Weekly</p>
                  <p className="text-lg font-bold">${result.weekly.toFixed(2)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
};

export default HourlyToSalary;
