import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const DogAgeCalculator = () => {
  const [dogAge, setDogAge] = useState("");
  const [dogSize, setDogSize] = useState("medium");
  const [humanAge, setHumanAge] = useState<number | null>(null);

  const calculate = () => {
    const age = parseFloat(dogAge);
    if (isNaN(age) || age < 0) return;

    // Modern formula based on dog size
    let humanYears = 0;
    
    if (age <= 1) {
      humanYears = age * 15;
    } else if (age <= 2) {
      humanYears = 15 + (age - 1) * 9;
    } else {
      const baseYears = 24;
      const multiplier = dogSize === "small" ? 4 : dogSize === "medium" ? 5 : 6;
      humanYears = baseYears + (age - 2) * multiplier;
    }

    setHumanAge(Math.round(humanYears));
  };

  return (
    <ToolLayout
      title="Dog Age Calculator"
      description="Convert your dog's age to human years"
    >
      <Card className="p-6">
        <div className="space-y-4 max-w-md mx-auto">
          <div>
            <Label htmlFor="dogAge">Dog's Age (years)</Label>
            <Input
              id="dogAge"
              type="number"
              min="0"
              step="0.5"
              placeholder="e.g., 5"
              value={dogAge}
              onChange={(e) => setDogAge(e.target.value)}
            />
          </div>
          
          <div>
            <Label>Dog Size</Label>
            <Select value={dogSize} onValueChange={setDogSize}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small (under 20 lbs)</SelectItem>
                <SelectItem value="medium">Medium (20-50 lbs)</SelectItem>
                <SelectItem value="large">Large (over 50 lbs)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button onClick={calculate} className="w-full">Calculate</Button>
          
          {humanAge !== null && (
            <div className="mt-6 p-6 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-2">In human years, your dog is approximately</p>
              <p className="text-5xl font-bold text-primary">{humanAge}</p>
              <p className="text-lg text-muted-foreground">years old</p>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
};

export default DogAgeCalculator;
