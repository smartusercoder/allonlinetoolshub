import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { differenceInYears, addYears, format } from "date-fns";

const RetirementAgeCalculator = () => {
  const [birthDate, setBirthDate] = useState("");
  const [retirementAge, setRetirementAge] = useState("65");
  const [result, setResult] = useState<{ retirementDate: Date; yearsLeft: number; currentAge: number } | null>(null);

  const calculate = () => {
    if (!birthDate || !retirementAge) return;
    const birth = new Date(birthDate);
    const today = new Date();
    const currentAge = differenceInYears(today, birth);
    const retAge = parseInt(retirementAge);
    const retirementDate = addYears(birth, retAge);
    const yearsLeft = retAge - currentAge;

    setResult({ retirementDate, yearsLeft: Math.max(0, yearsLeft), currentAge });
  };

  return (
    <ToolLayout title="Retirement Age Calculator" description="Calculate when you can retire">
      <Card className="p-6">
        <div className="space-y-4 max-w-md mx-auto">
          <div>
            <Label>Date of Birth</Label>
            <Input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
          </div>
          <div>
            <Label>Target Retirement Age</Label>
            <Input type="number" value={retirementAge} onChange={(e) => setRetirementAge(e.target.value)} min="50" max="100" />
          </div>
          <Button onClick={calculate} className="w-full">Calculate</Button>
          {result && (
            <div className="space-y-4 mt-4">
              <div className="p-4 bg-primary/10 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Retirement Date</p>
                <p className="text-2xl font-bold text-primary">{format(result.retirementDate, "MMMM d, yyyy")}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-2xl font-bold">{result.currentAge}</p>
                  <p className="text-sm text-muted-foreground">current age</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-2xl font-bold">{result.yearsLeft}</p>
                  <p className="text-sm text-muted-foreground">years until retirement</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
};

export default RetirementAgeCalculator;
