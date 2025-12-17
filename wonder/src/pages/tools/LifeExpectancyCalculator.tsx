import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { differenceInYears } from "date-fns";

const LifeExpectancyCalculator = () => {
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("male");
  const [result, setResult] = useState<{ currentAge: number; lifeExpectancy: number; yearsLeft: number } | null>(null);

  const calculate = () => {
    if (!birthDate) return;
    const currentAge = differenceInYears(new Date(), new Date(birthDate));
    // Average life expectancy (simplified)
    const baseExpectancy = gender === "male" ? 76 : 81;
    const yearsLeft = Math.max(0, baseExpectancy - currentAge);
    setResult({ currentAge, lifeExpectancy: baseExpectancy, yearsLeft });
  };

  return (
    <ToolLayout title="Life Expectancy Calculator" description="Estimate life expectancy (simplified)">
      <Card className="p-6">
        <div className="space-y-4 max-w-md mx-auto">
          <div>
            <Label>Date of Birth</Label>
            <Input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
          </div>
          <div>
            <Label>Gender</Label>
            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={calculate} className="w-full">Calculate</Button>
          {result && (
            <div className="space-y-4 mt-4">
              <div className="p-4 bg-primary/10 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Estimated Years Remaining</p>
                <p className="text-4xl font-bold text-primary">{result.yearsLeft} years</p>
              </div>
              <p className="text-xs text-muted-foreground text-center">Based on average life expectancy of {result.lifeExpectancy} years. This is a simplified estimate and does not account for individual health factors.</p>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
};

export default LifeExpectancyCalculator;
