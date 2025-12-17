import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ChineseCalendarConverter = () => {
  const [gregorianDate, setGregorianDate] = useState("");
  const [chineseDate, setChineseDate] = useState<{ year: number; animal: string; element: string } | null>(null);

  const animals = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"];
  const elements = ["Wood", "Fire", "Earth", "Metal", "Water"];

  const convert = () => {
    if (!gregorianDate) return;
    
    const date = new Date(gregorianDate);
    const year = date.getFullYear();
    
    // Chinese New Year typically falls between Jan 21 and Feb 20
    // Simplified: use gregorian year for approximation
    const chineseYear = year - 1900;
    const animalIndex = (chineseYear + 8) % 12;
    const elementIndex = Math.floor((chineseYear % 10) / 2);
    
    setChineseDate({
      year: year + 2697, // Approximate Chinese year
      animal: animals[animalIndex],
      element: elements[elementIndex]
    });
  };

  return (
    <ToolLayout title="Chinese Calendar Converter" description="Convert dates to Chinese calendar with zodiac">
      <Card className="p-6">
        <div className="space-y-4 max-w-md mx-auto">
          <div>
            <Label>Gregorian Date</Label>
            <Input type="date" value={gregorianDate} onChange={(e) => setGregorianDate(e.target.value)} />
          </div>
          <Button onClick={convert} className="w-full">Convert to Chinese Calendar</Button>
          {chineseDate && (
            <div className="space-y-4 mt-4">
              <div className="p-6 bg-red-500/10 rounded-lg text-center">
                <p className="text-4xl mb-2">🐉</p>
                <p className="text-2xl font-bold text-red-600">{chineseDate.element} {chineseDate.animal}</p>
                <p className="text-muted-foreground">Year {chineseDate.year}</p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="p-3 bg-muted rounded text-center">
                  <p className="font-semibold">{chineseDate.animal}</p>
                  <p className="text-muted-foreground">Zodiac Animal</p>
                </div>
                <div className="p-3 bg-muted rounded text-center">
                  <p className="font-semibold">{chineseDate.element}</p>
                  <p className="text-muted-foreground">Element</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
};

export default ChineseCalendarConverter;
