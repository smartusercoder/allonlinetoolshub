import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const TimeSubtractionCalculator = () => {
  const [hours1, setHours1] = useState("");
  const [minutes1, setMinutes1] = useState("");
  const [hours2, setHours2] = useState("");
  const [minutes2, setMinutes2] = useState("");
  const [result, setResult] = useState<{ hours: number; minutes: number; negative: boolean } | null>(null);

  const calculate = () => {
    let totalMinutes = (parseInt(hours1 || "0") * 60 + parseInt(minutes1 || "0")) - 
                       (parseInt(hours2 || "0") * 60 + parseInt(minutes2 || "0"));
    const negative = totalMinutes < 0;
    totalMinutes = Math.abs(totalMinutes);
    setResult({
      hours: Math.floor(totalMinutes / 60),
      minutes: totalMinutes % 60,
      negative
    });
  };

  return (
    <ToolLayout title="Time Subtraction Calculator" description="Subtract time durations">
      <Card className="p-6">
        <div className="space-y-4 max-w-md mx-auto">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Hours 1</Label>
              <Input type="number" value={hours1} onChange={(e) => setHours1(e.target.value)} placeholder="0" />
            </div>
            <div>
              <Label>Minutes 1</Label>
              <Input type="number" value={minutes1} onChange={(e) => setMinutes1(e.target.value)} placeholder="0" />
            </div>
          </div>
          <div className="text-center text-2xl font-bold">−</div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Hours 2</Label>
              <Input type="number" value={hours2} onChange={(e) => setHours2(e.target.value)} placeholder="0" />
            </div>
            <div>
              <Label>Minutes 2</Label>
              <Input type="number" value={minutes2} onChange={(e) => setMinutes2(e.target.value)} placeholder="0" />
            </div>
          </div>
          <Button onClick={calculate} className="w-full">Subtract Times</Button>
          {result && (
            <div className="p-4 bg-primary/10 rounded-lg text-center">
              <p className="text-3xl font-bold text-primary">{result.negative ? "-" : ""}{result.hours}h {result.minutes}m</p>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
};

export default TimeSubtractionCalculator;
