import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function MoonPhaseCalculator() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const getMoonPhase = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    let c = 0, e = 0, jd = 0, b = 0;
    
    if (month < 3) {
      const y = year - 1;
      const m = month + 12;
      c = y;
      e = m;
    } else {
      c = year;
      e = month;
    }
    
    jd = Math.floor(365.25 * (c + 4716)) + Math.floor(30.6001 * (e + 1)) + day - 1524.5;
    b = (jd - 2451550.1) / 29.530588853;
    b = b - Math.floor(b);
    
    const phase = b * 8;
    
    const phases = [
      "New Moon",
      "Waxing Crescent",
      "First Quarter",
      "Waxing Gibbous",
      "Full Moon",
      "Waning Gibbous",
      "Last Quarter",
      "Waning Crescent"
    ];
    
    return phases[Math.floor(phase)];
  };

  const phase = getMoonPhase(new Date(date));

  return (
    <>
      <Helmet>
        <title>Moon Phase Calculator - Calculate Current Moon Phase | Free Tool</title>
        <meta name="description" content="Calculate moon phase for any date. Find current moon phase, full moon, new moon dates. Free lunar phase calculator and moon calendar." />
        <meta name="keywords" content="moon phase, lunar phase, full moon, new moon, moon calculator, lunar calendar" />
        <meta property="og:title" content="Moon Phase Calculator - Calculate Lunar Phases" />
        <meta property="og:description" content="Calculate moon phase for any date and find full moon and new moon dates." />
      </Helmet>
      <ToolLayout
        title="Moon Phase Calculator"
        description="Calculate the moon phase for any date"
      >
        <Card className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date">Select Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <Card className="p-8 bg-primary/10 text-center">
            <div className="text-sm text-muted-foreground mb-2">Moon Phase</div>
            <div className="text-4xl font-bold text-primary mb-4">{phase}</div>
            <div className="text-6xl mb-2">🌙</div>
            <div className="text-muted-foreground">
              {new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </Card>
        </Card>
      </ToolLayout>
    </>
  );
}
