import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const GcdLcm = () => {
  const [num1, setNum1] = useState("48");
  const [num2, setNum2] = useState("18");

  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const lcm = (a: number, b: number): number => {
    return Math.abs(a * b) / gcd(a, b);
  };

  const calculate = () => {
    const a = parseInt(num1);
    const b = parseInt(num2);

    if (!a || !b || a <= 0 || b <= 0) return null;

    return {
      gcd: gcd(a, b),
      lcm: lcm(a, b)
    };
  };

  const result = calculate();

  return (
    <ToolLayout
      title="GCD & LCM Calculator"
      description="Calculate Greatest Common Divisor and Least Common Multiple"
    >
      <Card>
        <CardContent className="pt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>First Number</Label>
              <Input
                type="number"
                value={num1}
                onChange={(e) => setNum1(e.target.value)}
                placeholder="48"
              />
            </div>

            <div className="space-y-2">
              <Label>Second Number</Label>
              <Input
                type="number"
                value={num2}
                onChange={(e) => setNum2(e.target.value)}
                placeholder="18"
              />
            </div>
          </div>

          {result && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Greatest Common Divisor (GCD)</p>
                <p className="text-4xl font-bold text-primary">{result.gcd}</p>
              </div>
              <div className="p-6 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Least Common Multiple (LCM)</p>
                <p className="text-4xl font-bold text-primary">{result.lcm}</p>
              </div>
            </div>
          )}

          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">What are GCD and LCM?</p>
            <p className="text-sm mb-2">
              <strong>GCD:</strong> The largest positive integer that divides both numbers without remainder.
            </p>
            <p className="text-sm">
              <strong>LCM:</strong> The smallest positive integer that is divisible by both numbers.
            </p>
          </div>
        </CardContent>
      </Card>
    </ToolLayout>
  );
};

export default GcdLcm;
