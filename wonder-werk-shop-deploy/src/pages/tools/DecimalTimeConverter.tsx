import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const DecimalTimeConverter = () => {
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [decimalTime, setDecimalTime] = useState("");

  const toDecimal = () => {
    const h = parseFloat(hours) || 0;
    const m = parseFloat(minutes) || 0;
    setDecimalTime((h + m / 60).toFixed(4));
  };

  const fromDecimal = () => {
    const d = parseFloat(decimalTime) || 0;
    const h = Math.floor(d);
    const m = Math.round((d - h) * 60);
    setHours(h.toString());
    setMinutes(m.toString());
  };

  return (
    <ToolLayout title="Decimal Time Converter" description="Convert between standard and decimal time">
      <Card className="p-6">
        <div className="space-y-4 max-w-md mx-auto">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Hours</Label>
              <Input type="number" value={hours} onChange={(e) => setHours(e.target.value)} placeholder="0" />
            </div>
            <div>
              <Label>Minutes</Label>
              <Input type="number" value={minutes} onChange={(e) => setMinutes(e.target.value)} placeholder="0" />
            </div>
          </div>
          <button onClick={toDecimal} className="w-full p-2 bg-primary text-primary-foreground rounded">Convert to Decimal ↓</button>
          <div>
            <Label>Decimal Hours</Label>
            <Input type="number" value={decimalTime} onChange={(e) => setDecimalTime(e.target.value)} placeholder="e.g., 2.5" />
          </div>
          <button onClick={fromDecimal} className="w-full p-2 bg-secondary text-secondary-foreground rounded">Convert to Standard ↑</button>
        </div>
      </Card>
    </ToolLayout>
  );
};

export default DecimalTimeConverter;
