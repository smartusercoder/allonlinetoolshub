import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SeasonCalculator = () => {
  const [date, setDate] = useState("");
  const [hemisphere, setHemisphere] = useState<"north" | "south">("north");
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    if (!date) return;
    const d = new Date(date);
    const month = d.getMonth();
    const day = d.getDate();
    
    let season: string;
    if ((month === 2 && day >= 20) || month === 3 || month === 4 || (month === 5 && day < 21)) {
      season = hemisphere === "north" ? "Spring" : "Autumn";
    } else if ((month === 5 && day >= 21) || month === 6 || month === 7 || (month === 8 && day < 22)) {
      season = hemisphere === "north" ? "Summer" : "Winter";
    } else if ((month === 8 && day >= 22) || month === 9 || month === 10 || (month === 11 && day < 21)) {
      season = hemisphere === "north" ? "Autumn" : "Spring";
    } else {
      season = hemisphere === "north" ? "Winter" : "Summer";
    }
    setResult(season);
  };

  return (
    <ToolLayout title="Season Calculator" description="Find what season a date falls in">
      <Card className="p-6">
        <div className="space-y-4 max-w-md mx-auto">
          <div>
            <Label>Date</Label>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="flex gap-4">
            <Button variant={hemisphere === "north" ? "default" : "outline"} onClick={() => setHemisphere("north")} className="flex-1">Northern Hemisphere</Button>
            <Button variant={hemisphere === "south" ? "default" : "outline"} onClick={() => setHemisphere("south")} className="flex-1">Southern Hemisphere</Button>
          </div>
          <Button onClick={calculate} className="w-full">Find Season</Button>
          {result && (
            <div className="p-6 bg-primary/10 rounded-lg text-center">
              <p className="text-4xl mb-2">{result === "Spring" ? "🌸" : result === "Summer" ? "☀️" : result === "Autumn" ? "🍂" : "❄️"}</p>
              <p className="text-2xl font-bold text-primary">{result}</p>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
};

export default SeasonCalculator;
