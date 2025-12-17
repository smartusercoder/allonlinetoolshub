import { useState, useEffect } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Play, Pause, RotateCcw } from "lucide-react";

const PomodoroTimer = () => {
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [timeLeft, setTimeLeft] = useState(workMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      const audio = new Audio("data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuA0fPTgjMGHm7A7+OZURE=");
      audio.play().catch(() => {});
      
      if (!isBreak) {
        setCompletedPomodoros(prev => prev + 1);
        setIsBreak(true);
        setTimeLeft(breakMinutes * 60);
      } else {
        setIsBreak(false);
        setTimeLeft(workMinutes * 60);
      }
      setIsRunning(false);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, isBreak, workMinutes, breakMinutes]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsBreak(false);
    setTimeLeft(workMinutes * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = isBreak
    ? ((breakMinutes * 60 - timeLeft) / (breakMinutes * 60)) * 100
    : ((workMinutes * 60 - timeLeft) / (workMinutes * 60)) * 100;

  return (
    <ToolLayout
      title="Pomodoro Timer"
      description="Boost productivity with the Pomodoro Technique"
    >
      <Card>
        <CardContent className="pt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Work Duration (minutes)</Label>
              <Input
                type="number"
                value={workMinutes}
                onChange={(e) => {
                  setWorkMinutes(parseInt(e.target.value) || 25);
                  if (!isBreak && !isRunning) setTimeLeft((parseInt(e.target.value) || 25) * 60);
                }}
                min="1"
                max="60"
              />
            </div>

            <div className="space-y-2">
              <Label>Break Duration (minutes)</Label>
              <Input
                type="number"
                value={breakMinutes}
                onChange={(e) => {
                  setBreakMinutes(parseInt(e.target.value) || 5);
                  if (isBreak && !isRunning) setTimeLeft((parseInt(e.target.value) || 5) * 60);
                }}
                min="1"
                max="30"
              />
            </div>
          </div>

          <div className="text-center space-y-4">
            <div className={`text-6xl font-bold ${isBreak ? 'text-green-600' : 'text-primary'}`}>
              {formatTime(timeLeft)}
            </div>
            <p className="text-lg text-muted-foreground">
              {isBreak ? "Break Time!" : "Focus Time"}
            </p>
            
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${isBreak ? 'bg-green-600' : 'bg-primary'}`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="flex gap-2 justify-center">
            <Button onClick={toggleTimer} size="lg">
              {isRunning ? <Pause className="mr-2 h-5 w-5" /> : <Play className="mr-2 h-5 w-5" />}
              {isRunning ? "Pause" : "Start"}
            </Button>
            <Button onClick={resetTimer} variant="outline" size="lg">
              <RotateCcw className="mr-2 h-5 w-5" />
              Reset
            </Button>
          </div>

          <div className="p-4 bg-muted rounded-lg text-center">
            <p className="text-sm text-muted-foreground mb-1">Completed Pomodoros</p>
            <p className="text-3xl font-bold text-primary">{completedPomodoros}</p>
          </div>
        </CardContent>
      </Card>
    </ToolLayout>
  );
};

export default PomodoroTimer;
