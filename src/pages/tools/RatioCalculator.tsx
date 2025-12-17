import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function RatioCalculator() {
  const [a, setA] = useState("4");
  const [b, setB] = useState("3");

  const gcd = (x: number, y: number): number => y ? gcd(y, x % y) : x;
  
  const numA = parseInt(a);
  const numB = parseInt(b);
  const divisor = gcd(numA, numB);
  const simplified = `${numA / divisor}:${numB / divisor}`;

  return (
    <ToolLayout title="Ratio Calculator" description="Simplify and calculate ratios">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>First Number</Label>
            <Input value={a} onChange={(e) => setA(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Second Number</Label>
            <Input value={b} onChange={(e) => setB(e.target.value)} />
          </div>
        </div>
        <Card className="p-6 text-center">
          <div className="text-4xl font-bold text-primary">{simplified}</div>
          <div className="text-sm text-muted-foreground mt-2">Simplified Ratio</div>
        </Card>
      </div>
    </ToolLayout>
  );
}
