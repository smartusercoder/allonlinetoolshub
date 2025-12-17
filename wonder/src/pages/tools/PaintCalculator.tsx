import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function PaintCalculator() {
  const [length, setLength] = useState("5");
  const [width, setWidth] = useState("4");
  const [height, setHeight] = useState("2.5");
  const [coats, setCoats] = useState("2");

  const l = parseFloat(length);
  const w = parseFloat(width);
  const h = parseFloat(height);
  const c = parseFloat(coats);

  const wallArea = 2 * (l + w) * h;
  const coverage = 10; // m² per liter
  const liters = (wallArea / coverage) * c;

  return (
    <ToolLayout title="Paint Calculator" description="Calculate paint needed">
      <div className="space-y-4">
        <Input type="number" value={length} onChange={e => setLength(e.target.value)} placeholder="Length (m)" />
        <Input type="number" value={width} onChange={e => setWidth(e.target.value)} placeholder="Width (m)" />
        <Input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="Height (m)" />
        <Input type="number" value={coats} onChange={e => setCoats(e.target.value)} placeholder="Coats" />
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold">{wallArea.toFixed(1)}</div>
            <div className="text-sm">m² to paint</div>
          </Card>
          <Card className="p-4 text-center bg-primary/10">
            <div className="text-2xl font-bold text-primary">{liters.toFixed(1)}</div>
            <div className="text-sm">Liters needed</div>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
