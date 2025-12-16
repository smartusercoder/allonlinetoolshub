import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function FractionToDecimal() {
  const [numerator, setNumerator] = useState("3");
  const [denominator, setDenominator] = useState("4");

  const num = parseInt(numerator);
  const denom = parseInt(denominator);
  const decimal = denom !== 0 ? (num / denom).toFixed(10) : "Error";

  return (
    <ToolLayout title="Fraction to Decimal" description="Convert fractions to decimal numbers">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Numerator</Label>
            <Input value={numerator} onChange={(e) => setNumerator(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Denominator</Label>
            <Input value={denominator} onChange={(e) => setDenominator(e.target.value)} />
          </div>
        </div>
        <Card className="p-6 text-center">
          <div className="text-4xl font-bold text-primary">{decimal}</div>
        </Card>
      </div>
    </ToolLayout>
  );
}
