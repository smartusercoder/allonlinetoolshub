import { useState, useEffect } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";

const BinaryClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const toBinary = (num: number, digits: number) => {
    return num.toString(2).padStart(digits, "0").split("");
  };

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  return (
    <ToolLayout
      title="Binary Clock"
      description="Display the current time in binary format"
    >
      <Card className="p-6">
        <div className="text-center mb-6">
          <p className="text-3xl font-mono font-bold text-foreground">
            {hours.toString().padStart(2, "0")}:
            {minutes.toString().padStart(2, "0")}:
            {seconds.toString().padStart(2, "0")}
          </p>
          <p className="text-sm text-muted-foreground mt-2">Current Time</p>
        </div>
        
        <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
          {[
            { label: "Hours", value: hours, bits: 5 },
            { label: "Minutes", value: minutes, bits: 6 },
            { label: "Seconds", value: seconds, bits: 6 },
          ].map(({ label, value, bits }) => (
            <div key={label} className="text-center">
              <p className="text-sm font-medium text-muted-foreground mb-2">{label}</p>
              <div className="flex flex-col gap-1 items-center">
                {toBinary(value, bits).map((bit, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-mono transition-colors ${
                      bit === "1"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {bit}
                  </div>
                ))}
              </div>
              <p className="text-lg font-mono mt-2">{value.toString().padStart(2, "0")}</p>
            </div>
          ))}
        </div>
      </Card>
    </ToolLayout>
  );
};

export default BinaryClock;
