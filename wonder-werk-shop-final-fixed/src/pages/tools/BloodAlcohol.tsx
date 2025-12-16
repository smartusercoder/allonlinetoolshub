import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function BloodAlcohol() {
  const [weight, setWeight] = useState("70");
  const [drinks, setDrinks] = useState("2");
  const [hours, setHours] = useState("2");
  const [gender, setGender] = useState("male");

  const w = parseFloat(weight);
  const d = parseFloat(drinks);
  const h = parseFloat(hours);
  const r = gender === "male" ? 0.68 : 0.55;

  const bac = ((d * 14 * 5.14) / (w * 1000 * r)) - (0.015 * h);
  const level = Math.max(0, bac) * 100;

  return (
    <ToolLayout title="BAC Calculator" description="Estimate blood alcohol content">
      <div className="space-y-4">
        <Input type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="Weight (kg)" />
        <Input type="number" value={drinks} onChange={e => setDrinks(e.target.value)} placeholder="Number of Drinks" />
        <Input type="number" value={hours} onChange={e => setHours(e.target.value)} placeholder="Hours Since First Drink" />
        <select value={gender} onChange={e => setGender(e.target.value)} className="w-full p-2 border rounded">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <Card className="p-6 text-center bg-primary/10">
          <div className="text-sm">Estimated BAC</div>
          <div className="text-4xl font-bold text-primary">{level.toFixed(3)}%</div>
          <div className="text-xs mt-2 text-muted-foreground">For educational purposes only</div>
        </Card>
      </div>
    </ToolLayout>
  );
}
