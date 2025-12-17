import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function CpmCalculator() {
  const [impressions, setImpressions] = useState("100000");
  const [cost, setCost] = useState("250");

  const calculate = () => {
    const imp = parseFloat(impressions);
    const c = parseFloat(cost);

    const cpm = (c / imp) * 1000;
    const cpc = c / (imp * 0.02); // Assuming 2% CTR
    const clicks = imp * 0.02;

    return {
      cpm: cpm.toFixed(2),
      cpc: cpc.toFixed(2),
      clicks: Math.round(clicks)
    };
  };

  const result = calculate();

  return (
    <ToolLayout title="CPM Calculator" description="Calculate cost per mille (thousand impressions)">
      <div className="space-y-4">
        <Card className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="impressions">Impressions</Label>
              <Input id="impressions" type="number" value={impressions} onChange={(e) => setImpressions(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cost">Total Cost ($)</Label>
              <Input id="cost" type="number" step="0.01" value={cost} onChange={(e) => setCost(e.target.value)} />
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4 bg-primary/10">
            <div className="text-sm text-muted-foreground">CPM</div>
            <div className="text-2xl font-bold text-primary">${result.cpm}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Est. CPC (2% CTR)</div>
            <div className="text-2xl font-bold">${result.cpc}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Est. Clicks</div>
            <div className="text-2xl font-bold">{result.clicks}</div>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
