import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function ConcreteCalculator() {
  const [length, setLength] = useState("10");
  const [width, setWidth] = useState("10");
  const [depth, setDepth] = useState("0.1");
  const [unit, setUnit] = useState("meters");

  const calculate = () => {
    let l = parseFloat(length);
    let w = parseFloat(width);
    let d = parseFloat(depth);

    if (unit === "feet") {
      l = l * 0.3048;
      w = w * 0.3048;
      d = d * 0.3048;
    }

    const volumeM3 = l * w * d;
    const volumeFt3 = volumeM3 * 35.3147;
    const volumeYd3 = volumeFt3 / 27;
    
    // Concrete typically weighs about 2400 kg/m³
    const weight = volumeM3 * 2400;
    
    // Standard 20kg bags
    const bags20kg = Math.ceil(weight / 20);
    
    // Standard 40kg bags
    const bags40kg = Math.ceil(weight / 40);

    return {
      volumeM3: volumeM3.toFixed(2),
      volumeFt3: volumeFt3.toFixed(2),
      volumeYd3: volumeYd3.toFixed(2),
      weight: weight.toFixed(0),
      bags20kg,
      bags40kg
    };
  };

  const result = calculate();

  return (
    <ToolLayout title="Concrete Calculator" description="Calculate concrete volume and bags needed">
      <div className="space-y-4">
        <Card className="p-6 space-y-4">
          <div className="space-y-2">
            <Label>Unit</Label>
            <div className="flex gap-2">
              <button
                className={`flex-1 px-4 py-2 rounded ${unit === "meters" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                onClick={() => setUnit("meters")}
              >
                Meters
              </button>
              <button
                className={`flex-1 px-4 py-2 rounded ${unit === "feet" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                onClick={() => setUnit("feet")}
              >
                Feet
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="length">Length ({unit === "meters" ? "m" : "ft"})</Label>
              <Input id="length" type="number" step="0.1" value={length} onChange={(e) => setLength(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="width">Width ({unit === "meters" ? "m" : "ft"})</Label>
              <Input id="width" type="number" step="0.1" value={width} onChange={(e) => setWidth(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="depth">Depth ({unit === "meters" ? "m" : "ft"})</Label>
              <Input id="depth" type="number" step="0.01" value={depth} onChange={(e) => setDepth(e.target.value)} />
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Volume (m³)</div>
            <div className="text-2xl font-bold">{result.volumeM3}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Volume (yd³)</div>
            <div className="text-2xl font-bold">{result.volumeYd3}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">20kg Bags</div>
            <div className="text-2xl font-bold">{result.bags20kg}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">40kg Bags</div>
            <div className="text-2xl font-bold">{result.bags40kg}</div>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
