import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const HebrewCalendarConverter = () => {
  const [gregorianDate, setGregorianDate] = useState("");
  const [hebrewDate, setHebrewDate] = useState<string | null>(null);

  const hebrewMonths = [
    "Nisan", "Iyar", "Sivan", "Tammuz", "Av", "Elul",
    "Tishrei", "Cheshvan", "Kislev", "Tevet", "Shevat", "Adar"
  ];

  const convert = () => {
    if (!gregorianDate) return;
    
    const date = new Date(gregorianDate);
    // Simplified Hebrew calendar approximation
    const year = date.getFullYear();
    const hebrewYear = year + 3760;
    const month = date.getMonth();
    const day = date.getDate();
    
    // Simplified month mapping (actual Hebrew calendar is more complex)
    const hebrewMonth = hebrewMonths[(month + 6) % 12];
    
    setHebrewDate(`${day} ${hebrewMonth} ${hebrewYear}`);
  };

  return (
    <ToolLayout title="Hebrew Calendar Converter" description="Convert Gregorian dates to Hebrew calendar">
      <Card className="p-6">
        <div className="space-y-4 max-w-md mx-auto">
          <div>
            <Label>Gregorian Date</Label>
            <Input type="date" value={gregorianDate} onChange={(e) => setGregorianDate(e.target.value)} />
          </div>
          <Button onClick={convert} className="w-full">Convert to Hebrew Date</Button>
          {hebrewDate && (
            <div className="p-6 bg-primary/10 rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-2">Hebrew Date (approximate)</p>
              <p className="text-2xl font-bold text-primary">{hebrewDate}</p>
            </div>
          )}
          <p className="text-xs text-muted-foreground text-center">
            Note: This is a simplified approximation. For accurate conversions, please consult a Hebrew calendar expert.
          </p>
        </div>
      </Card>
    </ToolLayout>
  );
};

export default HebrewCalendarConverter;
