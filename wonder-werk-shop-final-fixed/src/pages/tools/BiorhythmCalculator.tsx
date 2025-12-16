import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { differenceInDays } from "date-fns";

const BiorhythmCalculator = () => {
  const [birthDate, setBirthDate] = useState("");
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split("T")[0]);
  const [result, setResult] = useState<{ physical: number; emotional: number; intellectual: number } | null>(null);

  const calculate = () => {
    if (!birthDate || !targetDate) return;
    const days = differenceInDays(new Date(targetDate), new Date(birthDate));
    setResult({
      physical: Math.sin((2 * Math.PI * days) / 23) * 100,
      emotional: Math.sin((2 * Math.PI * days) / 28) * 100,
      intellectual: Math.sin((2 * Math.PI * days) / 33) * 100
    });
  };

  return (
    <ToolLayout title="Biorhythm Calculator" description="Calculate your biorhythm cycles">
      <Card className="p-6">
        <div className="space-y-4 max-w-md mx-auto">
          <div>
            <Label>Birth Date</Label>
            <Input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
          </div>
          <div>
            <Label>Target Date</Label>
            <Input type="date" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} />
          </div>
          <Button onClick={calculate} className="w-full">Calculate Biorhythms</Button>
          {result && (
            <div className="space-y-4 mt-4">
              <div className="p-4 rounded-lg" style={{ background: `hsl(0 70% ${50 + result.physical/2}%)` }}>
                <p className="text-white font-semibold">Physical: {result.physical.toFixed(1)}%</p>
                <div className="h-2 bg-white/30 rounded mt-2"><div className="h-full bg-white rounded" style={{ width: `${50 + result.physical/2}%` }} /></div>
              </div>
              <div className="p-4 rounded-lg" style={{ background: `hsl(200 70% ${50 + result.emotional/2}%)` }}>
                <p className="text-white font-semibold">Emotional: {result.emotional.toFixed(1)}%</p>
                <div className="h-2 bg-white/30 rounded mt-2"><div className="h-full bg-white rounded" style={{ width: `${50 + result.emotional/2}%` }} /></div>
              </div>
              <div className="p-4 rounded-lg" style={{ background: `hsl(120 70% ${50 + result.intellectual/2}%)` }}>
                <p className="text-white font-semibold">Intellectual: {result.intellectual.toFixed(1)}%</p>
                <div className="h-2 bg-white/30 rounded mt-2"><div className="h-full bg-white rounded" style={{ width: `${50 + result.intellectual/2}%` }} /></div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
};

export default BiorhythmCalculator;
