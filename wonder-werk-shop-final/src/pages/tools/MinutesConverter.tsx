import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const MinutesConverter = () => {
  const [minutes, setMinutes] = useState("");
  
  const m = parseFloat(minutes) || 0;
  const conversions = [
    { label: "Seconds", value: m * 60 },
    { label: "Hours", value: m / 60 },
    { label: "Days", value: m / 1440 },
    { label: "Weeks", value: m / 10080 },
    { label: "Months (avg)", value: m / 43200 },
  ];

  return (
    <ToolLayout title="Minutes Converter" description="Convert minutes to other time units">
      <Card className="p-6">
        <div className="space-y-4 max-w-md mx-auto">
          <div>
            <Label>Minutes</Label>
            <Input type="number" value={minutes} onChange={(e) => setMinutes(e.target.value)} placeholder="Enter minutes" />
          </div>
          {minutes && (
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

export default MinutesConverter;
