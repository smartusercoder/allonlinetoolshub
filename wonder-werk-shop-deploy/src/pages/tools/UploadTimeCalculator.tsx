import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function UploadTimeCalculator() {
  const [fileSize, setFileSize] = useState("500");
  const [speed, setSpeed] = useState("20");

  const calculate = () => {
    const sizeInMB = parseFloat(fileSize);
    const speedInMbps = parseFloat(speed);
    const timeInSeconds = (sizeInMB * 8) / speedInMbps;
    
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    
    return { hours, minutes, seconds, total: timeInSeconds.toFixed(2) };
  };

  const time = calculate();

  return (
    <ToolLayout
      title="Upload Time Calculator"
      description="Calculate how long an upload will take"
    >
      <Card className="p-6 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fileSize">File Size (MB)</Label>
            <Input
              id="fileSize"
              type="number"
              value={fileSize}
              onChange={(e) => setFileSize(e.target.value)}
              placeholder="500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="speed">Upload Speed (Mbps)</Label>
            <Input
              id="speed"
              type="number"
              value={speed}
              onChange={(e) => setSpeed(e.target.value)}
              placeholder="20"
            />
          </div>
        </div>

        <Card className="p-6 bg-primary/10 text-center">
          <div className="text-sm text-muted-foreground mb-2">Upload Time</div>
          <div className="text-4xl font-bold text-primary mb-2">
            {time.hours}h {time.minutes}m {time.seconds}s
          </div>
          <div className="text-sm">Total: {time.total} seconds</div>
        </Card>
      </Card>
    </ToolLayout>
  );
}
