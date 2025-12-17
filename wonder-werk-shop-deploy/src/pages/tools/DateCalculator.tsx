import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UsageGuide } from "@/components/UsageGuide";

const DateCalculator = () => {
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [addDays, setAddDays] = useState(0);
  const [baseDate, setBaseDate] = useState(new Date().toISOString().split("T")[0]);

  const calculateDifference = () => {
    if (!date1 || !date2) return null;
    
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diff = Math.abs(d2.getTime() - d1.getTime());
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30.44);
    const years = Math.floor(days / 365.25);
    
    return { days, weeks, months, years };
  };

  const addDaysToDate = () => {
    if (!baseDate) return "";
    const date = new Date(baseDate);
    date.setDate(date.getDate() + addDays);
    return date.toISOString().split("T")[0];
  };

  const diff = calculateDifference();
  const resultDate = addDaysToDate();

  return (
    <ToolLayout
      title="Date Calculator"
      description="Calculate date differences and add/subtract days"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Use the first section to calculate the difference between two dates",
            "Select start and end dates to see days, weeks, months, and years",
            "Use the second section to add or subtract days from a base date",
            "Enter negative numbers to go back in time"
          ]}
          tips={[
            "Perfect for calculating age, project timelines, or deadlines",
            "Add days to find future dates (e.g., 90 days from today)",
            "Subtract days to find past dates (use negative numbers)",
            "Great for vacation planning and countdown timers"
          ]}
        />
      </div>
      <div className="space-y-8 mt-6">
        <div className="space-y-4 p-4 border rounded-lg">
          <h3 className="font-semibold">Calculate Difference Between Dates</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Input
                type="date"
                value={date1}
                onChange={(e) => setDate1(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <Input
                type="date"
                value={date2}
                onChange={(e) => setDate2(e.target.value)}
              />
            </div>
          </div>
          {diff && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div className="p-3 bg-primary/5 rounded-lg text-center">
                <div className="text-2xl font-bold text-primary">{diff.days}</div>
                <div className="text-sm text-muted-foreground">Days</div>
              </div>
              <div className="p-3 bg-primary/5 rounded-lg text-center">
                <div className="text-2xl font-bold text-primary">{diff.weeks}</div>
                <div className="text-sm text-muted-foreground">Weeks</div>
              </div>
              <div className="p-3 bg-primary/5 rounded-lg text-center">
                <div className="text-2xl font-bold text-primary">{diff.months}</div>
                <div className="text-sm text-muted-foreground">Months</div>
              </div>
              <div className="p-3 bg-primary/5 rounded-lg text-center">
                <div className="text-2xl font-bold text-primary">{diff.years}</div>
                <div className="text-sm text-muted-foreground">Years</div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4 p-4 border rounded-lg">
          <h3 className="font-semibold">Add/Subtract Days</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Base Date</Label>
              <Input
                type="date"
                value={baseDate}
                onChange={(e) => setBaseDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Days to Add/Subtract</Label>
              <Input
                type="number"
                value={addDays}
                onChange={(e) => setAddDays(Number(e.target.value))}
                placeholder="Use negative for past"
              />
            </div>
          </div>
          {resultDate && (
            <div className="p-4 bg-primary/5 rounded-lg text-center">
              <div className="text-sm text-muted-foreground mb-1">Result Date</div>
              <div className="text-2xl font-bold text-primary">{resultDate}</div>
              <div className="text-sm text-muted-foreground mt-1">
                {new Date(resultDate).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
};

export default DateCalculator;