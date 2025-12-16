import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UsageGuide } from "@/components/UsageGuide";

export default function DiceRoller() {
  const [result, setResult] = useState<number[]>([]);
  const [total, setTotal] = useState(0);

  const roll = (sides: number, count: number = 1) => {
    const rolls = Array(count).fill(0).map(() => Math.floor(Math.random() * sides) + 1);
    setResult(rolls);
    setTotal(rolls.reduce((a, b) => a + b, 0));
  };

  return (
    <ToolLayout title="Dice Roller" description="Roll virtual dice">
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Click any dice button to roll",
            "D6 = 6-sided die, D20 = 20-sided die, etc.",
            "See individual dice results",
            "Multiple dice show total sum"
          ]}
          tips={[
            "Perfect for board games and RPGs",
            "D6, D12, D20, D100 available",
            "2D6 and 3D6 roll multiple dice at once",
            "Great for Dungeons & Dragons and tabletop games"
          ]}
        />
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
          <Button onClick={() => roll(6)}>D6</Button>
          <Button onClick={() => roll(12)}>D12</Button>
          <Button onClick={() => roll(20)}>D20</Button>
          <Button onClick={() => roll(6, 2)}>2D6</Button>
          <Button onClick={() => roll(6, 3)}>3D6</Button>
          <Button onClick={() => roll(100)}>D100</Button>
        </div>
        {result.length > 0 && (
          <Card className="p-6">
            <div className="text-center space-y-4">
              <div className="flex justify-center gap-2">
                {result.map((r, i) => (
                  <div key={i} className="w-16 h-16 bg-primary text-primary-foreground rounded-lg flex items-center justify-center text-2xl font-bold">
                    {r}
                  </div>
                ))}
              </div>
              {result.length > 1 && <div className="text-xl">Total: {total}</div>}
            </div>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}
