import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const IslamicCalendarConverter = () => {
  const [gregorianDate, setGregorianDate] = useState("");
  const [islamicDate, setIslamicDate] = useState<string | null>(null);

  const islamicMonths = [
    "Muharram", "Safar", "Rabi' al-Awwal", "Rabi' al-Thani",
    "Jumada al-Awwal", "Jumada al-Thani", "Rajab", "Sha'ban",
    "Ramadan", "Shawwal", "Dhu al-Qi'dah", "Dhu al-Hijjah"
  ];

  const convert = () => {
    if (!gregorianDate) return;
    
    const date = new Date(gregorianDate);
    const jd = Math.floor((date.getTime() / 86400000) + 2440587.5);
    
    // Islamic calendar calculation
    const l = jd - 1948440 + 10632;
    const n = Math.floor((l - 1) / 10631);
    const l2 = l - 10631 * n + 354;
    const j = Math.floor((10985 - l2) / 5316) * Math.floor((50 * l2) / 17719) + Math.floor(l2 / 5670) * Math.floor((43 * l2) / 15238);
    const l3 = l2 - Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) - Math.floor(j / 16) * Math.floor((15238 * j) / 43) + 29;
    const month = Math.floor((24 * l3) / 709);
    const day = l3 - Math.floor((709 * month) / 24);
    const year = 30 * n + j - 30;
    
    setIslamicDate(`${day} ${islamicMonths[month - 1]} ${year} AH`);
  };

  return (
    <ToolLayout title="Islamic Calendar Converter" description="Convert Gregorian dates to Islamic (Hijri) calendar">
      <Card className="p-6">
        <div className="space-y-4 max-w-md mx-auto">
          <div>
            <Label>Gregorian Date</Label>
            <Input type="date" value={gregorianDate} onChange={(e) => setGregorianDate(e.target.value)} />
          </div>
          <Button onClick={convert} className="w-full">Convert to Hijri Date</Button>
          {islamicDate && (
            <div className="p-6 bg-primary/10 rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-2">Islamic (Hijri) Date</p>
              <p className="text-2xl font-bold text-primary">{islamicDate}</p>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
};

export default IslamicCalendarConverter;
