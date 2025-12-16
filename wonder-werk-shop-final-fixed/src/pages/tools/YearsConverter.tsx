import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const YearsConverter = () => {
  const [years, setYears] = useState("");
  
  const y = parseFloat(years) || 0;
  const conversions = [
    { label: "Months", value: y * 12 },
    { label: "Weeks", value: y * 52 },
    { label: "Days", value: y * 365 },
    { label: "Hours", value: y * 8760 },
    { label: "Decades", value: y / 10 },
    { label: "Centuries", value: y / 100 },
  ];

  return (
    <ToolLayout title="Years Converter" description="Convert years to other time units">
      <Card className="p-6">
        <div className="space-y-4 max-w-md mx-auto">
          <div>
            <Label>Years</Label>
            <Input type="number" value={years} onChange={(e) => setYears(e.target.value)} placeholder="Enter years" />
          </div>
          {years && (
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

export default YearsConverter;
