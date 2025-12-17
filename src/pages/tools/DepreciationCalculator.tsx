import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function DepreciationCalculator() {
  const [cost, setCost] = useState("10000");
  const [salvage, setSalvage] = useState("2000");
  const [years, setYears] = useState("5");
  const [method, setMethod] = useState("straight");

  const calculate = () => {
    const c = parseFloat(cost);
    const s = parseFloat(salvage);
    const y = parseFloat(years);

    if (method === "straight") {
      const annual = (c - s) / y;
      return {
        annual: annual.toFixed(2),
        total: (annual * y).toFixed(2),
        remaining: s.toFixed(2)
      };
    } else {
      // Declining balance (200% / double declining)
      const rate = 2 / y;
      let bookValue = c;
      let totalDepreciation = 0;

      for (let i = 0; i < y; i++) {
        const depreciation = bookValue * rate;
        totalDepreciation += depreciation;
        bookValue -= depreciation;
      }

      return {
        annual: (totalDepreciation / y).toFixed(2),
        total: totalDepreciation.toFixed(2),
        remaining: bookValue.toFixed(2)
      };
    }
  };

  const result = calculate();

  return (
    <ToolLayout title="Depreciation Calculator" description="Calculate asset depreciation">
      <div className="space-y-4">
        <Card className="p-6 space-y-4">
          <div className="space-y-2">
            <Label>Method</Label>
            <div className="flex gap-2">
              <button
                className={`flex-1 px-4 py-2 rounded ${method === "straight" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                onClick={() => setMethod("straight")}
              >
                Straight Line
              </button>
              <button
                className={`flex-1 px-4 py-2 rounded ${method === "declining" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                onClick={() => setMethod("declining")}
              >
                Declining Balance
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cost">Asset Cost ($)</Label>
              <Input id="cost" type="number" value={cost} onChange={(e) => setCost(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="salvage">Salvage Value ($)</Label>
              <Input id="salvage" type="number" value={salvage} onChange={(e) => setSalvage(e.target.value)} />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="years">Useful Life (years)</Label>
              <Input id="years" type="number" value={years} onChange={(e) => setYears(e.target.value)} />
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Annual Depreciation</div>
            <div className="text-2xl font-bold">${result.annual}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Total Depreciation</div>
            <div className="text-2xl font-bold">${result.total}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Remaining Value</div>
            <div className="text-2xl font-bold">${result.remaining}</div>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
