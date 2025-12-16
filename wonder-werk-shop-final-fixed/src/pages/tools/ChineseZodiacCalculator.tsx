import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ChineseZodiacCalculator = () => {
  const [year, setYear] = useState("");
  const [result, setResult] = useState<{ animal: string; element: string } | null>(null);

  const animals = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"];
  const elements = ["Wood", "Fire", "Earth", "Metal", "Water"];

  const calculate = () => {
    if (!year) return;
    const y = parseInt(year);
    const animalIndex = (y - 4) % 12;
    const elementIndex = Math.floor(((y - 4) % 10) / 2);
    setResult({
      animal: animals[animalIndex],
      element: elements[elementIndex]
    });
  };

  return (
    <ToolLayout title="Chinese Zodiac Calculator" description="Find your Chinese zodiac sign">
      <Card className="p-6">
        <div className="space-y-4 max-w-md mx-auto">
          <div>
            <Label>Birth Year</Label>
            <Input type="number" value={year} onChange={(e) => setYear(e.target.value)} placeholder="e.g., 1990" min="1900" max="2100" />
          </div>
          <Button onClick={calculate} className="w-full">Find Chinese Zodiac</Button>
          {result && (
            <div className="p-6 bg-red-500/10 rounded-lg text-center">
              <p className="text-4xl mb-2">🐉</p>
              <p className="text-2xl font-bold text-red-600">{result.element} {result.animal}</p>
              <p className="text-muted-foreground">Year {year}</p>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
};

export default ChineseZodiacCalculator;
