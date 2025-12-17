import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function LogarithmCalculator() {
  const [number, setNumber] = useState("100");
  const [base, setBase] = useState("10");

  const logBase = Math.log(parseFloat(number) || 1) / Math.log(parseFloat(base) || 10);
  const ln = Math.log(parseFloat(number) || 1);
  const log10 = Math.log10(parseFloat(number) || 1);

  return (
    <ToolLayout
      title="Logarithm Calculator"
      description="Calculate logarithms with different bases"
    >
      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="number">Number</Label>
          <Input
            id="number"
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="Enter number"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="base">Base (for custom log)</Label>
          <Input
            id="base"
            type="number"
            value={base}
            onChange={(e) => setBase(e.target.value)}
            placeholder="Enter base"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4 text-center">
            <div className="text-sm text-muted-foreground mb-2">log<sub>{base}</sub></div>
            <div className="text-2xl font-bold text-primary">
              {isFinite(logBase) ? logBase.toFixed(6) : "Invalid"}
            </div>
          </Card>

          <Card className="p-4 text-center">
            <div className="text-sm text-muted-foreground mb-2">ln (base e)</div>
            <div className="text-2xl font-bold text-primary">
              {isFinite(ln) ? ln.toFixed(6) : "Invalid"}
            </div>
          </Card>

          <Card className="p-4 text-center">
            <div className="text-sm text-muted-foreground mb-2">log<sub>10</sub></div>
            <div className="text-2xl font-bold text-primary">
              {isFinite(log10) ? log10.toFixed(6) : "Invalid"}
            </div>
          </Card>
        </div>
      </Card>
    </ToolLayout>
  );
}
