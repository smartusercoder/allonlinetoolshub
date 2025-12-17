import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function SquareRootCalculator() {
  const [number, setNumber] = useState("16");

  const squareRoot = Math.sqrt(parseFloat(number) || 0);
  const cubeRoot = Math.cbrt(parseFloat(number) || 0);

  return (
    <ToolLayout
      title="Square Root Calculator"
      description="Calculate square roots and cube roots"
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

        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 text-center">
            <div className="text-sm text-muted-foreground mb-2">Square Root</div>
            <div className="text-3xl font-bold text-primary">
              {isNaN(squareRoot) ? "Invalid" : squareRoot.toFixed(6)}
            </div>
          </Card>

          <Card className="p-4 text-center">
            <div className="text-sm text-muted-foreground mb-2">Cube Root</div>
            <div className="text-3xl font-bold text-primary">
              {isNaN(cubeRoot) ? "Invalid" : cubeRoot.toFixed(6)}
            </div>
          </Card>
        </div>
      </Card>
    </ToolLayout>
  );
}
