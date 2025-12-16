import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const WeeksConverter = () => {
  const [weeks, setWeeks] = useState("");
  
  const w = parseFloat(weeks) || 0;
  const conversions = [
    { label: "Days", value: w * 7 },
    { label: "Hours", value: w * 168 },
    { label: "Minutes", value: w * 10080 },
    { label: "Months (avg)", value: w / 4.33 },
    { label: "Years", value: w / 52 },
  ];

  return (
    <ToolLayout title="Weeks Converter" description="Convert weeks to other time units">
      <Card className="p-6">
        <div className="space-y-4 max-w-md mx-auto">
          <div>
            <Label>Weeks</Label>
            <Input type="number" value={weeks} onChange={(e) => setWeeks(e.target.value)} placeholder="Enter weeks" />
          </div>
          {weeks && (
            <div className="space-y-2">
              {conversions.map(c => (
                <div key={c.label} className="flex justify-between p-3 bg-muted rounded">
                  <span>{c.label}</span>
                  <span className="font-mono">{c.value.toLocaleString(undefined, { maximumFractionDigits: 6 })}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
};

export default WeeksConverter;
