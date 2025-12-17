import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const HoursConverter = () => {
  const [hours, setHours] = useState("");
  
  const h = parseFloat(hours) || 0;
  const conversions = [
    { label: "Seconds", value: h * 3600 },
    { label: "Minutes", value: h * 60 },
    { label: "Days", value: h / 24 },
    { label: "Weeks", value: h / 168 },
    { label: "Months (avg)", value: h / 720 },
    { label: "Years", value: h / 8760 },
  ];

  return (
    <ToolLayout title="Hours Converter" description="Convert hours to other time units">
      <Card className="p-6">
        <div className="space-y-4 max-w-md mx-auto">
          <div>
            <Label>Hours</Label>
            <Input type="number" value={hours} onChange={(e) => setHours(e.target.value)} placeholder="Enter hours" />
          </div>
          {hours && (
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

export default HoursConverter;
