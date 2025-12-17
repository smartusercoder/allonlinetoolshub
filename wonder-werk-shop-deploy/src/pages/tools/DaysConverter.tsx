import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const DaysConverter = () => {
  const [days, setDays] = useState("");
  
  const d = parseFloat(days) || 0;
  const conversions = [
    { label: "Hours", value: d * 24 },
    { label: "Minutes", value: d * 1440 },
    { label: "Seconds", value: d * 86400 },
    { label: "Weeks", value: d / 7 },
    { label: "Months (avg)", value: d / 30 },
    { label: "Years", value: d / 365 },
  ];

  return (
    <ToolLayout title="Days Converter" description="Convert days to other time units">
      <Card className="p-6">
        <div className="space-y-4 max-w-md mx-auto">
          <div>
            <Label>Days</Label>
            <Input type="number" value={days} onChange={(e) => setDays(e.target.value)} placeholder="Enter days" />
          </div>
          {days && (
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

export default DaysConverter;
