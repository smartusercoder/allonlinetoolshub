import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { differenceInYears } from "date-fns";

const HorseAgeCalculator = () => {
  const [horseAge, setHorseAge] = useState("");
  const [result, setResult] = useState<{ humanAge: number; stage: string } | null>(null);

  const calculate = () => {
    if (!horseAge) return;
    const age = parseFloat(horseAge);
    let humanAge: number;
    if (age <= 1) humanAge = age * 6.5;
    else if (age <= 2) humanAge = 6.5 + (age - 1) * 6.5;
    else if (age <= 3) humanAge = 13 + (age - 2) * 5;
    else if (age <= 4) humanAge = 18 + (age - 3) * 2.5;
    else humanAge = 20.5 + (age - 4) * 2.5;

    let stage = "Senior";
    if (age < 2) stage = "Foal";
    else if (age < 4) stage = "Young Horse";
    else if (age < 15) stage = "Adult";

    setResult({ humanAge: Math.round(humanAge), stage });
  };

  return (
    <ToolLayout title="Horse Age Calculator" description="Convert horse years to human years">
      <Card className="p-6">
        <div className="space-y-4 max-w-md mx-auto">
          <div>
            <Label>Horse's Age (years)</Label>
            <Input type="number" value={horseAge} onChange={(e) => setHorseAge(e.target.value)} min="0" step="0.5" placeholder="e.g., 5" />
          </div>
          <Button onClick={calculate} className="w-full">Calculate Human Age</Button>
          {result && (
            <div className="p-6 bg-amber-500/10 rounded-lg text-center">
              <p className="text-4xl mb-2">🐴</p>
              <p className="text-3xl font-bold text-amber-600">{result.humanAge} human years</p>
              <p className="text-muted-foreground">{result.stage}</p>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
};

export default HorseAgeCalculator;
