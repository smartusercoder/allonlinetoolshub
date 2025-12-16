import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const MonthsConverter = () => {
  const [months, setMonths] = useState("");
  
  const m = parseFloat(months) || 0;
  const conversions = [
    { label: "Days (avg)", value: m * 30.44 },
    { label: "Weeks (avg)", value: m * 4.33 },
    { label: "Hours", value: m * 730 },
    { label: "Years", value: m / 12 },
    { label: "Decades", value: m / 120 },
  ];

  return (
    <ToolLayout title="Months Converter" description="Convert months to other time units">
      <Card className="p-6">
        <div className="space-y-4 max-w-md mx-auto">
          <div>
            <Label>Months</Label>
            <Input type="number" value={months} onChange={(e) => setMonths(e.target.value)} placeholder="Enter months" />
          </div>
          {months && (
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

export default MonthsConverter;
