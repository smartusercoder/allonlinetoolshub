import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function WeekNumber() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const getWeekNumber = (d: Date) => {
    const firstDayOfYear = new Date(d.getFullYear(), 0, 1);
    const pastDaysOfYear = (d.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  const selectedDate = new Date(date);
  const weekNumber = getWeekNumber(selectedDate);

  return (
    <>
      <Helmet>
        <title>Week Number Calculator - Calculate ISO Week Number | Free Online Tool</title>
        <meta name="description" content="Calculate ISO week number for any date. Free week number calculator shows which week of the year any date falls in. Perfect for planning and scheduling." />
        <meta name="keywords" content="week number, ISO week, week calculator, calendar week, week of year" />
        <meta property="og:title" content="Week Number Calculator - Calculate ISO Week Number" />
        <meta property="og:description" content="Calculate ISO week number for any date. Free week number calculator for planning and scheduling." />
      </Helmet>
      <ToolLayout
        title="Week Number Calculator"
        description="Calculate ISO week number for any date"
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

          <Card className="p-8 bg-primary/10 text-center">
            <div className="text-sm text-muted-foreground mb-2">Week Number</div>
            <div className="text-6xl font-bold text-primary mb-2">{weekNumber}</div>
            <div className="text-muted-foreground">
              {selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </Card>
        </Card>
      </ToolLayout>
    </>
  );
}
