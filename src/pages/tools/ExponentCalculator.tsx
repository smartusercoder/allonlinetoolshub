import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function ExponentCalculator() {
  const [base, setBase] = useState("2");
  const [exponent, setExponent] = useState("3");

  const result = Math.pow(parseFloat(base) || 0, parseFloat(exponent) || 0);

  return (
    <ToolLayout
      title="Exponent Calculator"
      description="Calculate powers and exponents quickly"
    >
      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="base">Base</Label>
          <Input
            id="base"
            type="number"
            value={base}
            onChange={(e) => setBase(e.target.value)}
            placeholder="Enter base"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="exponent">Exponent</Label>
          <Input
            id="exponent"
            type="number"
            value={exponent}
            onChange={(e) => setExponent(e.target.value)}
            placeholder="Enter exponent"
          />
        </div>

        <Card className="p-6 bg-primary/10 text-center">
          <div className="text-sm text-muted-foreground mb-2">Result</div>
          <div className="text-4xl font-bold text-primary">
            {isFinite(result) ? result.toExponential(10) : "Invalid"}
          </div>
          <div className="text-sm mt-2">
            {base}<sup>{exponent}</sup> = {isFinite(result) ? result.toLocaleString() : "Invalid"}
          </div>
        </Card>
      </Card>
    </ToolLayout>
  );
}
