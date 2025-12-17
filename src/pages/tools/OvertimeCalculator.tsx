import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const OvertimeCalculator = () => {
  const [hourlyRate, setHourlyRate] = useState("");
  const [regularHours, setRegularHours] = useState("40");
  const [overtimeHours, setOvertimeHours] = useState("");
  const [overtimeMultiplier, setOvertimeMultiplier] = useState("1.5");
  const [result, setResult] = useState<{
    regularPay: number;
    overtimePay: number;
    totalPay: number;
    overtimeRate: number;
  } | null>(null);

  const calculate = () => {
    const rate = parseFloat(hourlyRate);
    const regular = parseFloat(regularHours);
    const overtime = parseFloat(overtimeHours);
    const multiplier = parseFloat(overtimeMultiplier);
    
    if (isNaN(rate) || isNaN(regular) || isNaN(overtime) || isNaN(multiplier)) return;
    
    const regularPay = rate * regular;
    const overtimeRate = rate * multiplier;
    const overtimePay = overtimeRate * overtime;
    const totalPay = regularPay + overtimePay;
    
    setResult({ regularPay, overtimePay, totalPay, overtimeRate });
  };

  return (
    <ToolLayout
      title="Overtime Calculator"
      description="Calculate overtime pay and total earnings"
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
            <Label htmlFor="regularHours">Regular Hours</Label>
            <Input
              id="regularHours"
              type="number"
              min="0"
              placeholder="e.g., 40"
              value={regularHours}
              onChange={(e) => setRegularHours(e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="overtimeHours">Overtime Hours</Label>
            <Input
              id="overtimeHours"
              type="number"
              min="0"
              step="0.5"
              placeholder="e.g., 10"
              value={overtimeHours}
              onChange={(e) => setOvertimeHours(e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="multiplier">Overtime Multiplier</Label>
            <Input
              id="multiplier"
              type="number"
              min="1"
              step="0.1"
              placeholder="e.g., 1.5"
              value={overtimeMultiplier}
              onChange={(e) => setOvertimeMultiplier(e.target.value)}
            />
          </div>
          
          <Button onClick={calculate} className="w-full">Calculate</Button>
          
          {result && (
            <div className="mt-6 space-y-4">
              <div className="p-4 bg-primary/10 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Total Pay</p>
                <p className="text-4xl font-bold text-primary">${result.totalPay.toFixed(2)}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Regular Pay</p>
                  <p className="text-xl font-bold">${result.regularPay.toFixed(2)}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Overtime Pay</p>
                  <p className="text-xl font-bold">${result.overtimePay.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Overtime Rate</p>
                <p className="text-xl font-bold">${result.overtimeRate.toFixed(2)}/hour</p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
};

export default OvertimeCalculator;
