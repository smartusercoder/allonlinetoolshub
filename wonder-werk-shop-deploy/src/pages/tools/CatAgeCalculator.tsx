import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CatAgeCalculator = () => {
  const [catAge, setCatAge] = useState("");
  const [humanAge, setHumanAge] = useState<number | null>(null);

  const calculate = () => {
    const age = parseFloat(catAge);
    if (isNaN(age) || age < 0) return;

    let humanYears = 0;
    
    if (age <= 1) {
      humanYears = age * 15;
    } else if (age <= 2) {
      humanYears = 15 + (age - 1) * 9;
    } else {
      humanYears = 24 + (age - 2) * 4;
    }

    setHumanAge(Math.round(humanYears));
  };

  return (
    <ToolLayout
      title="Cat Age Calculator"
      description="Convert your cat's age to human years"
    >
      <Card className="p-6">
        <div className="space-y-4 max-w-md mx-auto">
          <div>
            <Label htmlFor="catAge">Cat's Age (years)</Label>
            <Input
              id="catAge"
              type="number"
              min="0"
              step="0.5"
              placeholder="e.g., 5"
              value={catAge}
              onChange={(e) => setCatAge(e.target.value)}
            />
          </div>
          
          <Button onClick={calculate} className="w-full">Calculate</Button>
          
          {humanAge !== null && (
            <div className="mt-6 p-6 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-2">In human years, your cat is approximately</p>
              <p className="text-5xl font-bold text-primary">{humanAge}</p>
              <p className="text-lg text-muted-foreground">years old</p>
            </div>
          )}
          
          <div className="mt-8">
            <h3 className="font-semibold mb-3">Age Conversion Reference</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {[1, 2, 5, 10, 15, 20].map((year) => {
                let human = 0;
                if (year <= 1) human = year * 15;
                else if (year <= 2) human = 15 + (year - 1) * 9;
                else human = 24 + (year - 2) * 4;
                return (
                  <div key={year} className="flex justify-between p-2 bg-muted/50 rounded">
                    <span>{year} cat year{year > 1 ? "s" : ""}</span>
                    <span className="font-medium">{Math.round(human)} human</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Card>
    </ToolLayout>
  );
};

export default CatAgeCalculator;
