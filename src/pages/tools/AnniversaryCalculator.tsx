import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { differenceInDays, differenceInYears, differenceInMonths, differenceInWeeks, addYears, format } from "date-fns";

const AnniversaryCalculator = () => {
  const [anniversaryDate, setAnniversaryDate] = useState("");
  const [result, setResult] = useState<{
    years: number;
    months: number;
    weeks: number;
    days: number;
    nextAnniversary: Date;
    daysUntilNext: number;
    milestone: string;
  } | null>(null);

  const calculate = () => {
    if (!anniversaryDate) return;
    
    const anniversary = new Date(anniversaryDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    anniversary.setHours(0, 0, 0, 0);
    
    const years = differenceInYears(today, anniversary);
    const months = differenceInMonths(today, anniversary);
    const weeks = differenceInWeeks(today, anniversary);
    const days = differenceInDays(today, anniversary);
    
    let nextAnniversary = new Date(today.getFullYear(), anniversary.getMonth(), anniversary.getDate());
    if (nextAnniversary <= today) {
      nextAnniversary = addYears(nextAnniversary, 1);
    }
    const daysUntilNext = differenceInDays(nextAnniversary, today);
    
    const milestones: Record<number, string> = {
      1: "Paper Anniversary",
      5: "Wood Anniversary",
      10: "Tin Anniversary",
      15: "Crystal Anniversary",
      20: "China Anniversary",
      25: "Silver Anniversary",
      30: "Pearl Anniversary",
      40: "Ruby Anniversary",
      50: "Golden Anniversary",
      60: "Diamond Anniversary",
    };
    const milestone = milestones[years + 1] || `${years + 1}th Anniversary`;
    
    setResult({ years, months, weeks, days, nextAnniversary, daysUntilNext, milestone });
  };

  return (
    <ToolLayout
      title="Anniversary Calculator"
      description="Calculate time since your special date and upcoming anniversaries"
    >
      <Card className="p-6">
        <div className="space-y-4 max-w-md mx-auto">
          <div>
            <Label htmlFor="anniversaryDate">Anniversary Date</Label>
            <Input
              id="anniversaryDate"
              type="date"
              value={anniversaryDate}
              onChange={(e) => setAnniversaryDate(e.target.value)}
            />
          </div>
          
          <Button onClick={calculate} className="w-full">Calculate</Button>
          
          {result && (
            <div className="mt-6 space-y-4">
              <div className="p-4 bg-primary/10 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Time Together</p>
                <p className="text-4xl font-bold text-primary">{result.years} years</p>
                <p className="text-muted-foreground">{result.months} months • {result.days.toLocaleString()} days</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-2xl font-bold">{result.daysUntilNext}</p>
                  <p className="text-sm text-muted-foreground">days until next</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-2xl font-bold">{result.weeks.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">total weeks</p>
                </div>
              </div>
              
              <div className="p-4 bg-pink-500/10 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Next Milestone</p>
                <p className="text-xl font-bold text-pink-600">{result.milestone}</p>
                <p className="text-sm text-muted-foreground">{format(result.nextAnniversary, "MMMM d, yyyy")}</p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
};

export default AnniversaryCalculator;
