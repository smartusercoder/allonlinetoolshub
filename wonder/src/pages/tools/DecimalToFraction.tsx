import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function DecimalToFraction() {
  const [decimal, setDecimal] = useState("0.75");

  const gcd = (a: number, b: number): number => b ? gcd(b, a % b) : a;
  
  const toFraction = (dec: number) => {
    const len = dec.toString().length - 2;
    let denominator = Math.pow(10, len);
    let numerator = dec * denominator;
    const divisor = gcd(numerator, denominator);
    return `${numerator / divisor}/${denominator / divisor}`;
  };

  const num = parseFloat(decimal);
  const fraction = isNaN(num) ? "Invalid" : toFraction(num);

  return (
    <ToolLayout title="Decimal to Fraction" description="Convert decimal numbers to fractions">
      <div className="space-y-4">
        <Input value={decimal} onChange={(e) => setDecimal(e.target.value)} placeholder="0.75" />
        <Card className="p-6 text-center">
          <div className="text-4xl font-bold text-primary">{fraction}</div>
        </Card>
      </div>
    </ToolLayout>
  );
}
