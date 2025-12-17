import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function DayOfYear() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const calculateDayOfYear = () => {
    const selectedDate = new Date(date);
    const start = new Date(selectedDate.getFullYear(), 0, 0);
    const diff = selectedDate.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  };

  const dayOfYear = calculateDayOfYear();
  const daysRemaining = new Date(new Date(date).getFullYear(), 11, 31).getDate() === 31 ? 365 - dayOfYear : 366 - dayOfYear;

  return (
    <ToolLayout
      title="Day of Year Calculator"
      description="Calculate which day of the year a date is"
    >
      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="date">Select Date</Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Card className="p-4 text-center bg-primary/10">
            <div className="text-sm text-muted-foreground mb-2">Day of Year</div>
            <div className="text-4xl font-bold text-primary">{dayOfYear}</div>
          </Card>

          <Card className="p-4 text-center bg-secondary/10">
            <div className="text-sm text-muted-foreground mb-2">Days Remaining</div>
            <div className="text-4xl font-bold text-primary">{daysRemaining}</div>
          </Card>
        </div>
      </Card>
    </ToolLayout>
  );
}
