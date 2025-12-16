import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SalaryToHourly = () => {
  const [annualSalary, setAnnualSalary] = useState("");
  const [hoursPerWeek, setHoursPerWeek] = useState("40");
  const [weeksPerYear, setWeeksPerYear] = useState("52");
  const [result, setResult] = useState<{
    hourly: number;
    daily: number;
    weekly: number;
    monthly: number;
  } | null>(null);

  const calculate = () => {
    const salary = parseFloat(annualSalary);
    const hours = parseFloat(hoursPerWeek);
    const weeks = parseFloat(weeksPerYear);
    
    if (isNaN(salary) || isNaN(hours) || isNaN(weeks) || hours === 0 || weeks === 0) return;
    
    const hourly = salary / (hours * weeks);
    const daily = hourly * (hours / 5);
    const weekly = salary / weeks;
    const monthly = salary / 12;
    
    setResult({ hourly, daily, weekly, monthly });
  };

  return (
    <ToolLayout
      title="Salary to Hourly Calculator"
      description="Convert annual salary to hourly wage and other pay periods"
    >
      <Card className="p-6">
        <div className="space-y-4 max-w-md mx-auto">
          <div>
            <Label htmlFor="annualSalary">Annual Salary ($)</Label>
            <Input
              id="annualSalary"
              type="number"
              min="0"
              placeholder="e.g., 52000"
              value={annualSalary}
              onChange={(e) => setAnnualSalary(e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="hoursPerWeek">Hours Per Week</Label>
            <Input
              id="hoursPerWeek"
              type="number"
              min="1"
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
              min="1"
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
                <p className="text-sm text-muted-foreground">Hourly Rate</p>
                <p className="text-4xl font-bold text-primary">${result.hourly.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">per hour</p>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Daily</p>
                  <p className="text-lg font-bold">${result.daily.toFixed(2)}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Weekly</p>
                  <p className="text-lg font-bold">${result.weekly.toFixed(2)}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Monthly</p>
                  <p className="text-lg font-bold">${result.monthly.toFixed(2)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
};

export default SalaryToHourly;
