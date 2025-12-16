import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getWeek, getYear, format } from "date-fns";

const WeekNumberCalculator = () => {
  const [date, setDate] = useState("");
  const [result, setResult] = useState<{ week: number; year: number; dateStr: string } | null>(null);

  const calculate = () => {
    const d = date ? new Date(date) : new Date();
    setResult({
      week: getWeek(d),
      year: getYear(d),
      dateStr: format(d, "MMMM d, yyyy")
    });
  };

  return (
    <ToolLayout title="Week Number Calculator" description="Find the week number of any date">
      <Card className="p-6">
        <div className="space-y-4 max-w-md mx-auto">
          <div>
            <Label>Select Date (leave empty for today)</Label>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <Button onClick={calculate} className="w-full">Calculate Week Number</Button>
          {result && (
            <div className="p-4 bg-primary/10 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">{result.dateStr}</p>
              <p className="text-4xl font-bold text-primary">Week {result.week}</p>
              <p className="text-muted-foreground">of {result.year}</p>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
};

export default WeekNumberCalculator;
