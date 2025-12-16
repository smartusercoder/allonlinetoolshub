import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const JulianDateConverter = () => {
  const [gregorianDate, setGregorianDate] = useState("");
  const [julianDate, setJulianDate] = useState("");

  const toJulian = () => {
    if (!gregorianDate) return;
    const date = new Date(gregorianDate);
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();
    
    const a = Math.floor((14 - m) / 12);
    const y2 = y + 4800 - a;
    const m2 = m + 12 * a - 3;
    const jdn = d + Math.floor((153 * m2 + 2) / 5) + 365 * y2 + Math.floor(y2 / 4) - Math.floor(y2 / 100) + Math.floor(y2 / 400) - 32045;
    setJulianDate(jdn.toString());
  };

  const toGregorian = () => {
    if (!julianDate) return;
    const jdn = parseInt(julianDate);
    const a = jdn + 32044;
    const b = Math.floor((4 * a + 3) / 146097);
    const c = a - Math.floor(146097 * b / 4);
    const d = Math.floor((4 * c + 3) / 1461);
    const e = c - Math.floor(1461 * d / 4);
    const m = Math.floor((5 * e + 2) / 153);
    const day = e - Math.floor((153 * m + 2) / 5) + 1;
    const month = m + 3 - 12 * Math.floor(m / 10);
    const year = 100 * b + d - 4800 + Math.floor(m / 10);
    setGregorianDate(`${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`);
  };

  return (
    <ToolLayout title="Julian Date Converter" description="Convert between Julian and Gregorian dates">
      <Card className="p-6">
        <div className="space-y-4 max-w-md mx-auto">
          <div>
            <Label>Gregorian Date</Label>
            <Input type="date" value={gregorianDate} onChange={(e) => setGregorianDate(e.target.value)} />
          </div>
          <Button onClick={toJulian} className="w-full">Convert to Julian Day Number ↓</Button>
          <div>
            <Label>Julian Day Number</Label>
            <Input type="number" value={julianDate} onChange={(e) => setJulianDate(e.target.value)} placeholder="e.g., 2460000" />
          </div>
          <Button onClick={toGregorian} variant="outline" className="w-full">Convert to Gregorian ↑</Button>
        </div>
      </Card>
    </ToolLayout>
  );
};

export default JulianDateConverter;
