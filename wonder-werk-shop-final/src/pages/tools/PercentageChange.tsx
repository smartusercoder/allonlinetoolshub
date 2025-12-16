import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function PercentageChange() {
  const [oldValue, setOldValue] = useState("100");
  const [newValue, setNewValue] = useState("150");

  const old = parseFloat(oldValue);
  const newVal = parseFloat(newValue);
  const change = ((newVal - old) / old * 100).toFixed(2);

  return (
    <ToolLayout title="Percentage Change" description="Calculate percentage increase or decrease">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Old Value</Label>
            <Input value={oldValue} onChange={(e) => setOldValue(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>New Value</Label>
            <Input value={newValue} onChange={(e) => setNewValue(e.target.value)} />
          </div>
        </div>
        <Card className="p-6 text-center">
          <div className={`text-4xl font-bold ${parseFloat(change) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change}%
          </div>
          <div className="text-sm text-muted-foreground mt-2">
            {parseFloat(change) >= 0 ? 'Increase' : 'Decrease'}
          </div>
        </Card>
      </div>
    </ToolLayout>
  );
}
