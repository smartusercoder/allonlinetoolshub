import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const WorkHoursCalculator = () => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [breakMinutes, setBreakMinutes] = useState("30");
  const [hourlyRate, setHourlyRate] = useState("");
  const [result, setResult] = useState<{
    totalHours: number;
    netHours: number;
    earnings: number;
  } | null>(null);

  const calculate = () => {
    if (!startTime || !endTime) return;
    
    const [startHour, startMin] = startTime.split(":").map(Number);
    const [endHour, endMin] = endTime.split(":").map(Number);
    
    const startMinutes = startHour * 60 + startMin;
    let endMinutes = endHour * 60 + endMin;
    
    // Handle overnight shifts
    if (endMinutes < startMinutes) {
      endMinutes += 24 * 60;
    }
    
    const totalMinutes = endMinutes - startMinutes;
    const breakMins = parseInt(breakMinutes) || 0;
    const netMinutes = Math.max(0, totalMinutes - breakMins);
    
    const totalHours = totalMinutes / 60;
    const netHours = netMinutes / 60;
    const rate = parseFloat(hourlyRate) || 0;
    const earnings = netHours * rate;
    
    setResult({ totalHours, netHours, earnings });
  };

  return (
    <ToolLayout
      title="Work Hours Calculator"
      description="Calculate your work hours and earnings"
    >
      <Card className="p-6">
        <div className="space-y-4 max-w-md mx-auto">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="breakMinutes">Break Duration (minutes)</Label>
            <Input
              id="breakMinutes"
              type="number"
              min="0"
              placeholder="e.g., 30"
              value={breakMinutes}
              onChange={(e) => setBreakMinutes(e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="hourlyRate">Hourly Rate (optional)</Label>
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
          
          <Button onClick={calculate} className="w-full">Calculate</Button>
          
          {result && (
            <div className="mt-6 space-y-4">
              <div className="p-4 bg-primary/10 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Net Work Hours</p>
                <p className="text-4xl font-bold text-primary">
                  {Math.floor(result.netHours)}h {Math.round((result.netHours % 1) * 60)}m
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Total Hours</p>
                  <p className="text-xl font-bold">
                    {Math.floor(result.totalHours)}h {Math.round((result.totalHours % 1) * 60)}m
                  </p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Break Time</p>
                  <p className="text-xl font-bold">{breakMinutes}m</p>
                </div>
              </div>
              
              {hourlyRate && result.earnings > 0 && (
                <div className="p-4 bg-green-500/10 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Estimated Earnings</p>
                  <p className="text-2xl font-bold text-green-600">${result.earnings.toFixed(2)}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
};

export default WorkHoursCalculator;
