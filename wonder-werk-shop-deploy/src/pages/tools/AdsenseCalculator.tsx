import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function AdsenseCalculator() {
  const [pageViews, setPageViews] = useState("100000");
  const [ctr, setCtr] = useState("1");
  const [cpc, setCpc] = useState("0.50");

  const calculate = () => {
    const views = parseFloat(pageViews);
    const clickRate = parseFloat(ctr);
    const costPerClick = parseFloat(cpc);

    const clicks = (views * clickRate) / 100;
    const earnings = clicks * costPerClick;
    const rpm = (earnings / views) * 1000;

    return {
      clicks: Math.round(clicks),
      earnings: earnings.toFixed(2),
      rpm: rpm.toFixed(2)
    };
  };

  const result = calculate();

  return (
    <ToolLayout title="AdSense Calculator" description="Calculate estimated AdSense earnings">
      <div className="space-y-4">
        <Card className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="views">Monthly Page Views</Label>
            <Input id="views" type="number" value={pageViews} onChange={(e) => setPageViews(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ctr">CTR (%)</Label>
              <Input id="ctr" type="number" step="0.1" value={ctr} onChange={(e) => setCtr(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cpc">CPC ($)</Label>
              <Input id="cpc" type="number" step="0.01" value={cpc} onChange={(e) => setCpc(e.target.value)} />
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Est. Clicks</div>
            <div className="text-2xl font-bold">{result.clicks}</div>
          </Card>
          <Card className="p-4 bg-green-50 border-green-200">
            <div className="text-sm text-muted-foreground">Monthly Earnings</div>
            <div className="text-2xl font-bold text-green-600">${result.earnings}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">RPM</div>
            <div className="text-2xl font-bold">${result.rpm}</div>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
