import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SecondsConverter = () => {
  const [seconds, setSeconds] = useState("");
  
  const s = parseFloat(seconds) || 0;
  const conversions = [
    { label: "Milliseconds", value: s * 1000 },
    { label: "Minutes", value: s / 60 },
    { label: "Hours", value: s / 3600 },
    { label: "Days", value: s / 86400 },
    { label: "Weeks", value: s / 604800 },
  ];

  return (
    <ToolLayout title="Seconds Converter" description="Convert seconds to other time units">
      <Card className="p-6">
        <div className="space-y-4 max-w-md mx-auto">
          <div>
            <Label>Seconds</Label>
            <Input type="number" value={seconds} onChange={(e) => setSeconds(e.target.value)} placeholder="Enter seconds" />
          </div>
          {seconds && (
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

export default SecondsConverter;
