import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function BusinessDayCalculator() {
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [days, setDays] = useState("10");

  const addBusinessDays = (startDate: Date, daysToAdd: number) => {
    let currentDate = new Date(startDate);
    let addedDays = 0;

    while (addedDays < daysToAdd) {
      currentDate.setDate(currentDate.getDate() + 1);
      const dayOfWeek = currentDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        addedDays++;
      }
    }

    return currentDate;
  };

  const resultDate = addBusinessDays(new Date(startDate), parseInt(days) || 0);

  return (
    <>
      <Helmet>
        <title>Business Day Calculator - Add Business Days to Date | Free Tool</title>
        <meta name="description" content="Calculate business days and add working days to any date. Exclude weekends automatically. Free business day calculator for project planning." />
        <meta name="keywords" content="business day calculator, working days, business days, workday calculator, exclude weekends" />
        <meta property="og:title" content="Business Day Calculator - Add Business Days to Date" />
        <meta property="og:description" content="Calculate business days and add working days to any date excluding weekends." />
      </Helmet>
      <ToolLayout
        title="Business Day Calculator"
        description="Add business days to a date (excludes weekends)"
      >
        <Card className="p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start">Start Date</Label>
              <Input
                id="start"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="days">Business Days to Add</Label>
              <Input
                id="days"
                type="number"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                placeholder="10"
              />
            </div>
          </div>

          <Card className="p-6 bg-primary/10 text-center">
            <div className="text-sm text-muted-foreground mb-2">Result Date</div>
            <div className="text-3xl font-bold text-primary mb-2">
              {resultDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </Card>
        </Card>
      </ToolLayout>
    </>
  );
}
