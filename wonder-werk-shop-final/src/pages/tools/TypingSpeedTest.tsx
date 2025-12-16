import { useState, useEffect, useRef } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCw } from "lucide-react";

const sampleTexts = [
  "The quick brown fox jumps over the lazy dog near the riverbank.",
  "Technology is best when it brings people together and makes lives easier.",
  "Programming is the art of telling another human what one wants the computer to do.",
  "Design is not just what it looks like and feels like. Design is how it works.",
  "Innovation distinguishes between a leader and a follower in any field."
];

export default function TypingSpeedTest() {
  const [text, setText] = useState("");
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [finished, setFinished] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    resetTest();
  }, []);

  useEffect(() => {
    if (input.length > 0 && !startTime) {
      setStartTime(Date.now());
    }

    if (input.length > 0) {
      calculateStats();
    }

    if (input === text && text.length > 0) {
      setFinished(true);
    }
  }, [input]);

  const calculateStats = () => {
    if (!startTime) return;

    const timeElapsed = (Date.now() - startTime) / 1000 / 60; // minutes
    const wordsTyped = input.trim().split(/\s+/).length;
    const currentWpm = Math.round(wordsTyped / timeElapsed);
    setWpm(currentWpm);

    let correct = 0;
    for (let i = 0; i < input.length; i++) {
      if (input[i] === text[i]) correct++;
    }
    const acc = input.length > 0 ? Math.round((correct / input.length) * 100) : 100;
    setAccuracy(acc);
  };

  const resetTest = () => {
    const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    setText(randomText);
    setInput("");
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setFinished(false);
    inputRef.current?.focus();
  };

  const getCharClass = (index: number) => {
    if (index >= input.length) return "text-muted-foreground";
    return input[index] === text[index] ? "text-green-600" : "text-red-600";
  };

  return (
    <ToolLayout
      title="Typing Speed Test"
      description="Test your typing speed and accuracy"
    >
      <Card className="p-6 space-y-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <Card className="p-4">
            <div className="text-2xl font-bold text-primary">{wpm}</div>
            <div className="text-sm text-muted-foreground">WPM</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-primary">{accuracy}%</div>
            <div className="text-sm text-muted-foreground">Accuracy</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-primary">
              {startTime ? Math.round((Date.now() - startTime) / 1000) : 0}
            </div>
            <div className="text-sm text-muted-foreground">Seconds</div>
          </Card>
        </div>

        <Card className="p-6 bg-muted/50">
          <div className="font-mono text-lg leading-relaxed">
            {text.split("").map((char, index) => (
              <span key={index} className={getCharClass(index)}>
                {char}
              </span>
            ))}
          </div>
        </Card>

        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => !finished && setInput(e.target.value)}
          className="w-full p-4 rounded-lg border bg-background font-mono text-lg resize-none"
          rows={4}
          placeholder="Start typing here..."
          disabled={finished}
        />

        {finished && (
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-primary">Test Complete!</div>
            <div className="text-muted-foreground">
              You typed at {wpm} WPM with {accuracy}% accuracy
            </div>
          </div>
        )}

        <Button onClick={resetTest} className="w-full">
          <RotateCw className="w-4 h-4 mr-2" />
          {finished ? "Try Again" : "Reset"}
        </Button>
      </Card>
    </ToolLayout>
  );
}