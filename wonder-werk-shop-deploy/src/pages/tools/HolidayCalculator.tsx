import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function HolidayCalculator() {
  const [year, setYear] = useState(new Date().getFullYear().toString());

  const getEaster = (year: number) => {
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31);
    const day = ((h + l - 7 * m + 114) % 31) + 1;
    return new Date(year, month - 1, day);
  };

  const holidays = [
    { name: "New Year's Day", date: new Date(parseInt(year), 0, 1) },
    { name: "Valentine's Day", date: new Date(parseInt(year), 1, 14) },
    { name: "Easter Sunday", date: getEaster(parseInt(year)) },
    { name: "Independence Day", date: new Date(parseInt(year), 6, 4) },
    { name: "Halloween", date: new Date(parseInt(year), 9, 31) },
    { name: "Christmas Day", date: new Date(parseInt(year), 11, 25) },
    { name: "New Year's Eve", date: new Date(parseInt(year), 11, 31) },
  ];

  return (
    <>
      <Helmet>
        <title>Holiday Calculator - Find Holiday Dates for Any Year | Free Tool</title>
        <meta name="description" content="Calculate holiday dates for any year. Find Easter, Christmas, and other holiday dates. Free holiday calculator and calendar planning tool." />
        <meta name="keywords" content="holiday calculator, holiday dates, Easter calculator, holiday calendar, yearly holidays" />
        <meta property="og:title" content="Holiday Calculator - Find Holiday Dates" />
        <meta property="og:description" content="Calculate holiday dates for any year including Easter, Christmas, and more." />
      </Helmet>
      <ToolLayout
        title="Holiday Calculator"
        description="Calculate holiday dates for any year"
      >
        <Card className="p-6 space-y-4">
          <div className="space-y-2">
            <Label>Select Year</Label>
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 2 + i).map(y => (
                  <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            {holidays.map((holiday, index) => (
              <Card key={index} className="p-4 flex justify-between items-center">
                <span className="font-medium">{holiday.name}</span>
                <span className="text-muted-foreground">
                  {holiday.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </span>
              </Card>
            ))}
          </div>
        </Card>
      </ToolLayout>
    </>
  );
}
