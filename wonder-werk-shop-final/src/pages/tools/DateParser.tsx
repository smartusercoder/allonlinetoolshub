import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function DateParser() {
  const [input, setInput] = useState("2024-12-25 14:30:00");

  const parseDate = () => {
    try {
      const date = new Date(input);
      if (isNaN(date.getTime())) {
        return { error: "Invalid date format" };
      }

      return {
        iso: date.toISOString(),
        utc: date.toUTCString(),
        local: date.toLocaleString(),
        timestamp: Math.floor(date.getTime() / 1000),
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds(),
      };
    } catch (e) {
      return { error: "Failed to parse date" };
    }
  };

  const result = parseDate();

  return (
    <ToolLayout
      title="Date Parser"
      description="Parse and extract date components"
    >
      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="input">Enter Date String</Label>
          <Textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="2024-12-25 14:30:00"
            rows={3}
          />
        </div>

        {'error' in result ? (
          <Card className="p-4 bg-destructive/10 text-destructive">
            {result.error}
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-4">
              <div className="text-sm text-muted-foreground mb-1">ISO Format</div>
              <div className="font-mono text-sm">{result.iso}</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground mb-1">UTC Format</div>
              <div className="font-mono text-sm">{result.utc}</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground mb-1">Unix Timestamp</div>
              <div className="font-mono text-sm">{result.timestamp}</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground mb-1">Local Format</div>
              <div className="font-mono text-sm">{result.local}</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground mb-1">Components</div>
              <div className="font-mono text-sm">
                Y: {result.year}, M: {result.month}, D: {result.day}<br />
                H: {result.hours}, M: {result.minutes}, S: {result.seconds}
              </div>
            </Card>
          </div>
        )}
      </Card>
    </ToolLayout>
  );
}
