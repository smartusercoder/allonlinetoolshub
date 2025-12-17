import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const zodiacSigns = [
  { name: "Capricorn", symbol: "♑", start: [12, 22], end: [1, 19], element: "Earth" },
  { name: "Aquarius", symbol: "♒", start: [1, 20], end: [2, 18], element: "Air" },
  { name: "Pisces", symbol: "♓", start: [2, 19], end: [3, 20], element: "Water" },
  { name: "Aries", symbol: "♈", start: [3, 21], end: [4, 19], element: "Fire" },
  { name: "Taurus", symbol: "♉", start: [4, 20], end: [5, 20], element: "Earth" },
  { name: "Gemini", symbol: "♊", start: [5, 21], end: [6, 20], element: "Air" },
  { name: "Cancer", symbol: "♋", start: [6, 21], end: [7, 22], element: "Water" },
  { name: "Leo", symbol: "♌", start: [7, 23], end: [8, 22], element: "Fire" },
  { name: "Virgo", symbol: "♍", start: [8, 23], end: [9, 22], element: "Earth" },
  { name: "Libra", symbol: "♎", start: [9, 23], end: [10, 22], element: "Air" },
  { name: "Scorpio", symbol: "♏", start: [10, 23], end: [11, 21], element: "Water" },
  { name: "Sagittarius", symbol: "♐", start: [11, 22], end: [12, 21], element: "Fire" },
];

const ZodiacSignCalculator = () => {
  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState<typeof zodiacSigns[0] | null>(null);

  const calculate = () => {
    if (!birthDate) return;
    
    const date = new Date(birthDate);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    for (const sign of zodiacSigns) {
      const [startMonth, startDay] = sign.start;
      const [endMonth, endDay] = sign.end;
      
      if (startMonth === endMonth) {
        if (month === startMonth && day >= startDay && day <= endDay) {
          setResult(sign);
          return;
        }
      } else if (startMonth > endMonth) {
        if ((month === startMonth && day >= startDay) || (month === endMonth && day <= endDay)) {
          setResult(sign);
          return;
        }
      } else {
        if ((month === startMonth && day >= startDay) || (month === endMonth && day <= endDay) || (month > startMonth && month < endMonth)) {
          setResult(sign);
          return;
        }
      }
    }
  };

  return (
    <ToolLayout
      title="Zodiac Sign Calculator"
      description="Find your zodiac sign based on your birth date"
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
          
          <Button onClick={calculate} className="w-full">Find My Sign</Button>
          
          {result && (
            <div className="mt-6 p-6 bg-muted rounded-lg text-center">
              <p className="text-6xl mb-2">{result.symbol}</p>
              <h3 className="text-2xl font-bold text-primary">{result.name}</h3>
              <p className="text-muted-foreground mt-2">Element: {result.element}</p>
            </div>
          )}
        </div>
        
        <div className="mt-8 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {zodiacSigns.map((sign) => (
            <div key={sign.name} className="text-center p-2 rounded-lg hover:bg-muted transition-colors">
              <p className="text-2xl">{sign.symbol}</p>
              <p className="text-xs text-muted-foreground">{sign.name}</p>
            </div>
          ))}
        </div>
      </Card>
    </ToolLayout>
  );
};

export default ZodiacSignCalculator;
