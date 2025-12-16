import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { differenceInDays, differenceInYears, differenceInMonths, format, addYears, getDay } from "date-fns";

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const BirthdayCalculator = () => {
  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState<{
    age: number;
    nextBirthday: Date;
    daysUntilBirthday: number;
    birthDayName: string;
    totalDays: number;
    totalMonths: number;
  } | null>(null);

  const calculate = () => {
    if (!birthDate) return;
    
    const birth = new Date(birthDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    birth.setHours(0, 0, 0, 0);
    
    const age = differenceInYears(today, birth);
    const totalDays = differenceInDays(today, birth);
    const totalMonths = differenceInMonths(today, birth);
    
    // Calculate next birthday
    let nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday <= today) {
      nextBirthday = addYears(nextBirthday, 1);
    }
    
    const daysUntilBirthday = differenceInDays(nextBirthday, today);
    const birthDayName = dayNames[getDay(birth)];
    
    setResult({
      age,
      nextBirthday,
      daysUntilBirthday,
      birthDayName,
      totalDays,
      totalMonths,
    });
  };

  return (
    <ToolLayout
      title="Birthday Calculator"
      description="Calculate your age, days until birthday, and more"
    >
      <Card className="p-6">
        <div className="space-y-4 max-w-md mx-auto">
          <div>
            <Label htmlFor="birthDate">Birth Date</Label>
            <Input
              id="birthDate"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>
          
          <Button onClick={calculate} className="w-full">Calculate</Button>
          
          {result && (
            <div className="mt-6 space-y-4">
              <div className="p-4 bg-primary/10 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Your Age</p>
                <p className="text-4xl font-bold text-primary">{result.age} years old</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-2xl font-bold">{result.daysUntilBirthday}</p>
                  <p className="text-sm text-muted-foreground">days until birthday</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-2xl font-bold">{result.birthDayName}</p>
                  <p className="text-sm text-muted-foreground">born on a</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-2xl font-bold">{result.totalDays.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">days lived</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-2xl font-bold">{result.totalMonths.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">months lived</p>
                </div>
              </div>
              
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Next Birthday</p>
                <p className="text-xl font-semibold">{format(result.nextBirthday, "EEEE, MMMM d, yyyy")}</p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
};

export default BirthdayCalculator;
