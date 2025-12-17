import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function BandwidthCalculator() {
  const [fileSize, setFileSize] = useState("100");
  const [unit, setUnit] = useState("MB");
  const [speed, setSpeed] = useState("100");
  const [speedUnit, setSpeedUnit] = useState("Mbps");

  const calculate = () => {
    const sizeInMB = parseFloat(fileSize) * (unit === "GB" ? 1024 : unit === "KB" ? 0.001 : 1);
    const speedInMbps = parseFloat(speed) * (speedUnit === "Gbps" ? 1000 : speedUnit === "Kbps" ? 0.001 : 1);
    const timeInSeconds = (sizeInMB * 8) / speedInMbps;
    
    return {
      seconds: timeInSeconds.toFixed(2),
      minutes: (timeInSeconds / 60).toFixed(2),
      hours: (timeInSeconds / 3600).toFixed(2)
    };
  };

  const time = calculate();

  return (
    <ToolLayout
      title="Bandwidth Calculator"
      description="Calculate download time based on bandwidth"
    >
      <Card className="p-6 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fileSize">File Size</Label>
            <div className="flex gap-2">
              <Input
                id="fileSize"
                type="number"
                value={fileSize}
                onChange={(e) => setFileSize(e.target.value)}
              />
              <Select value={unit} onValueChange={setUnit}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="KB">KB</SelectItem>
                  <SelectItem value="MB">MB</SelectItem>
                  <SelectItem value="GB">GB</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="speed">Connection Speed</Label>
            <div className="flex gap-2">
              <Input
                id="speed"
                type="number"
                value={speed}
                onChange={(e) => setSpeed(e.target.value)}
              />
              <Select value={speedUnit} onValueChange={setSpeedUnit}>
                <SelectTrigger className="w-28">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Kbps">Kbps</SelectItem>
                  <SelectItem value="Mbps">Mbps</SelectItem>
                  <SelectItem value="Gbps">Gbps</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4 text-center bg-primary/10">
            <div className="text-sm text-muted-foreground mb-1">Seconds</div>
            <div className="text-2xl font-bold text-primary">{time.seconds}</div>
          </Card>

          <Card className="p-4 text-center">
            <div className="text-sm text-muted-foreground mb-1">Minutes</div>
            <div className="text-2xl font-bold">{time.minutes}</div>
          </Card>

          <Card className="p-4 text-center">
            <div className="text-sm text-muted-foreground mb-1">Hours</div>
            <div className="text-2xl font-bold">{time.hours}</div>
          </Card>
        </div>
      </Card>
    </ToolLayout>
  );
}
