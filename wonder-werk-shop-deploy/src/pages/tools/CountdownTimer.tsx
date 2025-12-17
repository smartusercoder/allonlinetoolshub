import { useState, useEffect, useRef } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Play, Pause, RotateCcw } from "lucide-react";
import { UsageGuide } from "@/components/UsageGuide";

export default function CountdownTimer() {
  const [minutes, setMinutes] = useState("5");
  const [seconds, setSeconds] = useState("0");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeLeft === 0 && isRunning) {
        setIsRunning(false);
      }
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, timeLeft]);

  const start = () => {
    const totalSeconds = (parseInt(minutes) || 0) * 60 + (parseInt(seconds) || 0);
    if (totalSeconds > 0) {
      setTimeLeft(totalSeconds);
      setIsRunning(true);
    }
  };

  const reset = () => {
    setTimeLeft(0);
    setIsRunning(false);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <ToolLayout
      title="Countdown Timer"
      description="Set countdown timers"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Set the minutes and seconds for your countdown",
            "Click \"Start\" to begin the countdown",
            "Use \"Pause\" to temporarily stop the timer",
            "Click \"Reset\" to start over"
          ]}
          tips={[
            "Perfect for cooking, workouts, or time-limited tasks",
            "Timer turns red and pulses when 10 seconds remain",
            "Use for presentations or timed activities",
            "Set quick timers for productivity sprints"
          ]}
        />
      </div>
      <Card className="p-6 mt-6">
        <div className="space-y-8">
          {!isRunning && timeLeft === 0 ? (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-sm font-medium">Minutes</label>
                <Input
                  type="number"
                  value={minutes}
                  onChange={(e) => setMinutes(e.target.value)}
                  min="0"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Seconds</label>
                <Input
                  type="number"
                  value={seconds}
                  onChange={(e) => setSeconds(e.target.value)}
                  min="0"
                  max="59"
                />
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className={`text-6xl font-mono font-bold mb-8 ${timeLeft <= 10 ? 'text-red-600 animate-pulse' : 'text-primary'}`}>
                {formatTime(timeLeft)}
              </div>
            </div>
          )}

          <div className="flex gap-4 justify-center">
            {!isRunning && timeLeft === 0 ? (
              <Button onClick={start} size="lg" className="w-32">
                <Play className="w-5 h-5 mr-2" />
                Start
              </Button>
            ) : (
              <>
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
                      Resume
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
              </>
            )}
          </div>
        </div>
      </Card>
    </ToolLayout>
  );
}
