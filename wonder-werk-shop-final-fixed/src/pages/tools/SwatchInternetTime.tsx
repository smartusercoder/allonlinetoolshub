import { useState, useEffect } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";

const SwatchInternetTime = () => {
  const [beats, setBeats] = useState(0);

  useEffect(() => {
    const updateBeats = () => {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const bmt = new Date(utc + 3600000); // BMT = UTC+1
      const midnight = new Date(bmt);
      midnight.setHours(0, 0, 0, 0);
      const msFromMidnight = bmt.getTime() - midnight.getTime();
      const beat = msFromMidnight / 86400;
      setBeats(Math.floor(beat));
    };
    updateBeats();
    const interval = setInterval(updateBeats, 864);
    return () => clearInterval(interval);
  }, []);

  return (
    <ToolLayout title="Swatch Internet Time" description="View current time in Swatch .beats">
      <Card className="p-6">
        <div className="max-w-md mx-auto text-center">
          <p className="text-6xl font-mono font-bold text-primary">@{beats.toString().padStart(3, "0")}</p>
          <p className="text-muted-foreground mt-4">Swatch .beats</p>
          <p className="text-sm text-muted-foreground mt-2">
            Internet time divides the day into 1000 .beats (1 beat = 86.4 seconds)
          </p>
        </div>
      </Card>
    </ToolLayout>
  );
};

export default SwatchInternetTime;
