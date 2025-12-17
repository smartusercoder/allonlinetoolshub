import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle } from "lucide-react";

export default function LeapYearChecker() {
  const [year, setYear] = useState(new Date().getFullYear().toString());

  const isLeapYear = (y: number) => {
    return (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0);
  };

  const yearNum = parseInt(year) || 2024;
  const isLeap = isLeapYear(yearNum);

  return (
    <ToolLayout
      title="Leap Year Checker"
      description="Check if a year is a leap year"
    >
      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="year">Year</Label>
          <Input
            id="year"
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="2024"
          />
        </div>

        <Card className={`p-8 text-center ${isLeap ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
          {isLeap ? (
            <>
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                {yearNum} is a Leap Year
              </div>
              <div className="text-muted-foreground">This year has 366 days</div>
            </>
          ) : (
            <>
              <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">
                {yearNum} is NOT a Leap Year
              </div>
              <div className="text-muted-foreground">This year has 365 days</div>
            </>
          )}
        </Card>
      </Card>
    </ToolLayout>
  );
}
