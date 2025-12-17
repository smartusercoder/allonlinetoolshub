import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { differenceInBusinessDays, addBusinessDays, format } from "date-fns";

const BusinessDaysCalculator = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [daysToAdd, setDaysToAdd] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const calculateBetween = () => {
    if (!startDate || !endDate) return;
    const days = differenceInBusinessDays(new Date(endDate), new Date(startDate));
    setResult(`${days} business days between the dates`);
  };

  const calculateAdd = () => {
    if (!startDate || !daysToAdd) return;
    const newDate = addBusinessDays(new Date(startDate), parseInt(daysToAdd));
    setResult(`${daysToAdd} business days from ${startDate} is ${format(newDate, "MMMM d, yyyy")}`);
  };

  return (
    <ToolLayout title="Business Days Calculator" description="Calculate business days between dates">
      <Card className="p-6">
        <div className="space-y-4 max-w-md mx-auto">
          <div>
            <Label>Start Date</Label>
            <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <div>
            <Label>End Date (for difference)</Label>
            <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
          <Button onClick={calculateBetween} className="w-full">Calculate Business Days Between</Button>
          <div className="border-t pt-4">
            <Label>Days to Add</Label>
            <Input type="number" value={daysToAdd} onChange={(e) => setDaysToAdd(e.target.value)} placeholder="e.g., 10" />
          </div>
          <Button onClick={calculateAdd} className="w-full">Add Business Days</Button>
          {result && <div className="p-4 bg-primary/10 rounded-lg text-center font-semibold">{result}</div>}
        </div>
      </Card>
    </ToolLayout>
  );
};

export default BusinessDaysCalculator;
