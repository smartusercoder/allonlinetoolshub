import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UsageGuide } from "@/components/UsageGuide";

export default function Pomodoro() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useState(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            setIsRunning(false);
            setIsBreak(!isBreak);
            setMinutes(isBreak ? 25 : 5);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  });

  const toggleTimer = () => setIsRunning(!isRunning);
  
  const reset = () => {
    setIsRunning(false);
    setMinutes(isBreak ? 5 : 25);
    setSeconds(0);
  };

  return (
    <ToolLayout
      title="Pomodoro Timer"
      description="Productivity timer using Pomodoro technique"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Click \"Start\" to begin a 25-minute focus session",
            "Work without interruptions until the timer ends",
            "Take a 5-minute break when prompted",
            "Repeat the cycle to maximize productivity"
          ]}
          tips={[
            "Pomodoro technique: 25 min work + 5 min break",
            "Helps maintain focus and prevent burnout",
            "Perfect for studying, coding, or writing",
            "Use \"Reset\" to restart the current session"
          ]}
          note="After every 4 pomodoros, take a longer 15-30 minute break"
        />
      </div>
      <Card className="p-8 mt-6">
        <div className="text-center space-y-6">
          <div className="text-sm text-muted-foreground">
            {isBreak ? "Break Time" : "Focus Time"}
          </div>
          
          <div className="text-7xl font-bold text-primary">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>

          <div className="flex gap-4 justify-center">
            <Button onClick={toggleTimer} size="lg">
              {isRunning ? "Pause" : "Start"}
            </Button>
            <Button onClick={reset} variant="outline" size="lg">
              Reset
            </Button>
          </div>

          <div className="text-sm text-muted-foreground">
            <p>Work: 25 minutes</p>
            <p>Break: 5 minutes</p>
          </div>
        </div>
      </Card>
    </ToolLayout>
  );
}
