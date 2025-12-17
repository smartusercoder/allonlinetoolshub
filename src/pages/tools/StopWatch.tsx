import { useState, useEffect, useRef } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Pause, RotateCcw } from "lucide-react";
import { UsageGuide } from "@/components/UsageGuide";

export default function StopWatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(t => t + 10);
      }, 10);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  const reset = () => {
    setTime(0);
    setIsRunning(false);
  };

  return (
    <ToolLayout
      title="Stopwatch"
      description="Online stopwatch timer"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Click \"Start\" to begin timing",
            "Click \"Pause\" to stop temporarily",
            "Click \"Reset\" to clear and start over",
            "Precise to hundredths of a second"
          ]}
          tips={[
            "Great for workouts and training",
            "Perfect for timing tasks",
            "Useful for cooking and baking",
            "Format: MM:SS.MS (minutes:seconds.milliseconds)"
          ]}
        />
      </div>
      <Card className="p-6">
        <div className="space-y-8">
          <div className="text-center">
            <div className="text-6xl font-mono font-bold text-primary mb-8">
              {formatTime(time)}
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => setIsRunning(!isRunning)}
              size="lg"
              className="w-32"
            >
              {isRunning ? (
                <>
                  <Pause className="w-5 h-5 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Start
                </>
              )}
            </Button>
            
            <Button
              onClick={reset}
              size="lg"
              variant="outline"
              className="w-32"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Reset
            </Button>
          </div>
        </div>
      </Card>
    </ToolLayout>
  );
}
