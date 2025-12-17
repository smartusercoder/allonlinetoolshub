import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";

const DayOfWeekCalculator = () => {
  const [date, setDate] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    if (!date) return;
    const d = new Date(date);
    const dayName = format(d, "EEEE");
    const dayNumber = d.getDay();
    setResult(`${format(d, "MMMM d, yyyy")} is a ${dayName} (Day ${dayNumber} of the week)`);
  };

  return (
    <ToolLayout title="Day of Week Calculator" description="Find what day of the week any date falls on">
      <Card className="p-6">
        <div className="space-y-4 max-w-md mx-auto">
          <div>
            <Label>Select Date</Label>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <Button onClick={calculate} className="w-full">Find Day of Week</Button>
          {result && <div className="p-4 bg-primary/10 rounded-lg text-center text-xl font-semibold">{result}</div>}
        </div>
      </Card>
    </ToolLayout>
  );
};

export default DayOfWeekCalculator;
