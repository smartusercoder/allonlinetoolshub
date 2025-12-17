import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const generations = [
  { name: "The Greatest Generation", start: 1901, end: 1927, description: "Born during or before the Roaring Twenties, came of age during the Great Depression" },
  { name: "The Silent Generation", start: 1928, end: 1945, description: "Born during the Great Depression and World War II" },
  { name: "Baby Boomers", start: 1946, end: 1964, description: "Born post-WWII during the 'baby boom'" },
  { name: "Generation X", start: 1965, end: 1980, description: "Known as the 'latchkey' generation" },
  { name: "Millennials (Gen Y)", start: 1981, end: 1996, description: "Came of age around the turn of the millennium" },
  { name: "Generation Z", start: 1997, end: 2012, description: "Digital natives, first generation raised with smartphones" },
  { name: "Generation Alpha", start: 2013, end: 2025, description: "Children of Millennials, entirely born in the 21st century" },
];

const GenerationCalculator = () => {
  const [birthYear, setBirthYear] = useState("");
  const [result, setResult] = useState<typeof generations[0] | null>(null);

  const calculate = () => {
    const year = parseInt(birthYear);
    if (isNaN(year)) return;
    
    const gen = generations.find(g => year >= g.start && year <= g.end);
    setResult(gen || null);
  };

  return (
    <ToolLayout
      title="Generation Calculator"
      description="Find out which generation you belong to based on your birth year"
    >
      <Card className="p-6">
        <div className="space-y-4 max-w-md mx-auto">
          <div>
            <Label htmlFor="birthYear">Birth Year</Label>
            <Input
              id="birthYear"
              type="number"
              min="1900"
              max="2025"
              placeholder="e.g., 1995"
              value={birthYear}
              onChange={(e) => setBirthYear(e.target.value)}
            />
          </div>
          
          <Button onClick={calculate} className="w-full">Find My Generation</Button>
          
          {result && (
            <div className="mt-6 p-6 bg-primary/10 rounded-lg text-center">
              <h3 className="text-2xl font-bold text-primary">{result.name}</h3>
              <p className="text-muted-foreground mt-2">{result.start} - {result.end}</p>
              <p className="text-sm mt-4">{result.description}</p>
            </div>
          )}
          
          {birthYear && !result && (
            <p className="text-center text-muted-foreground">
              No generation data available for this birth year
            </p>
          )}
        </div>
        
        <div className="mt-8">
          <h3 className="font-semibold mb-4 text-center">All Generations</h3>
          <div className="space-y-2">
            {generations.map((gen) => (
              <div key={gen.name} className="p-3 bg-muted/50 rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-medium">{gen.name}</p>
                  <p className="text-xs text-muted-foreground">{gen.description}</p>
                </div>
                <span className="text-sm text-muted-foreground">{gen.start}-{gen.end}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </ToolLayout>
  );
};

export default GenerationCalculator;
