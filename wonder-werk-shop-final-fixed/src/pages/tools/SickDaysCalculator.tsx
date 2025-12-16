import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SickDaysCalculator = () => {
  const [totalDays, setTotalDays] = useState("");
  const [usedDays, setUsedDays] = useState("");
  const [result, setResult] = useState<{ remaining: number; used: number; total: number } | null>(null);

  const calculate = () => {
    const total = parseFloat(totalDays) || 0;
    const used = parseFloat(usedDays) || 0;
    setResult({
      remaining: total - used,
      used,
      total
    });
  };

  return (
    <ToolLayout title="Sick Days Calculator" description="Track your sick day balance">
      <Card className="p-6">
        <div className="space-y-4 max-w-md mx-auto">
          <div>
            <Label>Total Annual Sick Days</Label>
            <Input type="number" value={totalDays} onChange={(e) => setTotalDays(e.target.value)} placeholder="e.g., 10" />
          </div>
          <div>
            <Label>Days Already Used</Label>
            <Input type="number" value={usedDays} onChange={(e) => setUsedDays(e.target.value)} placeholder="e.g., 2" />
          </div>
          <Button onClick={calculate} className="w-full">Calculate</Button>
          {result && (
            <div className="space-y-4 mt-4">
              <div className="p-4 bg-primary/10 rounded-lg text-center">
                <p className="text-4xl font-bold text-primary">{result.remaining}</p>
                <p className="text-muted-foreground">sick days remaining</p>
              </div>
              <div className="w-full bg-muted rounded-full h-4">
                <div className="bg-primary h-4 rounded-full" style={{ width: `${(result.used / result.total) * 100}%` }} />
              </div>
              <p className="text-center text-sm text-muted-foreground">{result.used} of {result.total} days used</p>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
};

export default SickDaysCalculator;
