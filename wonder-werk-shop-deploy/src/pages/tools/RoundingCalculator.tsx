import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function RoundingCalculator() {
  const [number, setNumber] = useState("3.14159");
  const [decimals, setDecimals] = useState("2");

  const num = parseFloat(number) || 0;
  const dec = parseInt(decimals) || 0;
  const multiplier = Math.pow(10, dec);

  const rounded = Math.round(num * multiplier) / multiplier;
  const floor = Math.floor(num * multiplier) / multiplier;
  const ceil = Math.ceil(num * multiplier) / multiplier;
  const trunc = Math.trunc(num * multiplier) / multiplier;

  return (
    <ToolLayout
      title="Rounding Calculator"
      description="Round numbers to specified decimal places"
    >
      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="number">Number</Label>
          <Input
            id="number"
            type="number"
            step="any"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="Enter number"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="decimals">Decimal Places</Label>
          <Input
            id="decimals"
            type="number"
            value={decimals}
            onChange={(e) => setDecimals(e.target.value)}
            placeholder="Enter decimal places"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 text-center">
            <div className="text-sm text-muted-foreground mb-2">Round</div>
            <div className="text-3xl font-bold text-primary">{rounded}</div>
          </Card>

          <Card className="p-4 text-center">
            <div className="text-sm text-muted-foreground mb-2">Floor</div>
            <div className="text-3xl font-bold">{floor}</div>
          </Card>

          <Card className="p-4 text-center">
            <div className="text-sm text-muted-foreground mb-2">Ceiling</div>
            <div className="text-3xl font-bold">{ceil}</div>
          </Card>

          <Card className="p-4 text-center">
            <div className="text-sm text-muted-foreground mb-2">Truncate</div>
            <div className="text-3xl font-bold">{trunc}</div>
          </Card>
        </div>
      </Card>
    </ToolLayout>
  );
}
