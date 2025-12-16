import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function PaceCalculator() {
  const [distance, setDistance] = useState("10");
  const [hours, setHours] = useState("0");
  const [minutes, setMinutes] = useState("50");
  const [seconds, setSeconds] = useState("0");

  const d = parseFloat(distance);
  const totalSeconds = parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
  const paceSeconds = totalSeconds / d;
  const paceMin = Math.floor(paceSeconds / 60);
  const paceSec = Math.floor(paceSeconds % 60);
  const speed = (d / (totalSeconds / 3600)).toFixed(2);

  return (
    <ToolLayout title="Running Pace Calculator" description="Calculate running pace and speed">
      <div className="space-y-4">
        <Input type="number" value={distance} onChange={e => setDistance(e.target.value)} placeholder="Distance (km)" />
        <div className="grid grid-cols-3 gap-2">
          <Input type="number" value={hours} onChange={e => setHours(e.target.value)} placeholder="Hours" />
          <Input type="number" value={minutes} onChange={e => setMinutes(e.target.value)} placeholder="Minutes" />
          <Input type="number" value={seconds} onChange={e => setSeconds(e.target.value)} placeholder="Seconds" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold">{paceMin}:{paceSec.toString().padStart(2, '0')}</div>
            <div className="text-sm">min/km</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold">{speed}</div>
            <div className="text-sm">km/h</div>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
