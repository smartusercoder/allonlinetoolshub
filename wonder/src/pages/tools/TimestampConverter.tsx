import { useState, useEffect } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { UsageGuide } from "@/components/UsageGuide";

const TimestampConverter = () => {
  const [timestamp, setTimestamp] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const convertToDate = (ts: string) => {
    setTimestamp(ts);
    if (ts && !isNaN(Number(ts))) {
      const num = Number(ts);
      const milliseconds = num.toString().length === 10 ? num * 1000 : num;
      const date = new Date(milliseconds);
      setDateTime(date.toISOString().slice(0, 16));
    } else {
      setDateTime("");
    }
  };

  const convertToTimestamp = (dt: string) => {
    setDateTime(dt);
    if (dt) {
      const date = new Date(dt);
      setTimestamp(Math.floor(date.getTime() / 1000).toString());
    } else {
      setTimestamp("");
    }
  };

  const useCurrentTime = () => {
    const now = Math.floor(Date.now() / 1000);
    convertToDate(now.toString());
  };

  return (
    <ToolLayout
      title="Timestamp Converter"
      description="Convert between Unix timestamps and human-readable dates"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Enter a Unix timestamp (in seconds or milliseconds)",
            "Or select a date and time using the date picker",
            "Conversion happens automatically",
            "View the result in multiple formats (ISO, UTC, Local)"
          ]}
          tips={[
            "10-digit timestamps are in seconds (standard)",
            "13-digit timestamps are in milliseconds (JavaScript)",
            "Click \"Now\" button for current timestamp",
            "Unix epoch started January 1, 1970",
            "Useful for debugging time-based features"
          ]}
        />
        <div className="p-4 bg-primary/5 border-l-4 border-primary rounded">
          <div className="text-sm text-muted-foreground mb-1">Current Unix Timestamp</div>
          <div className="text-2xl font-bold font-mono">{Math.floor(currentTime / 1000)}</div>
          <div className="text-sm text-muted-foreground mt-1">
            {new Date(currentTime).toLocaleString()}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Unix Timestamp (seconds)</Label>
          <div className="flex gap-2">
            <Input
              value={timestamp}
              onChange={(e) => convertToDate(e.target.value)}
              placeholder="1234567890"
              className="font-mono"
            />
            <Button onClick={useCurrentTime} variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Now
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Enter timestamp in seconds (10 digits) or milliseconds (13 digits)
          </p>
        </div>

        <div className="space-y-2">
          <Label>Date & Time</Label>
          <Input
            type="datetime-local"
            value={dateTime}
            onChange={(e) => convertToTimestamp(e.target.value)}
          />
        </div>

        {timestamp && dateTime && (
          <div className="p-4 bg-muted/30 rounded-lg space-y-2 text-sm">
            <div className="grid grid-cols-2 gap-2">
              <div className="font-semibold">Unix (seconds):</div>
              <div className="font-mono">{timestamp}</div>
              
              <div className="font-semibold">Unix (milliseconds):</div>
              <div className="font-mono">{Number(timestamp) * 1000}</div>
              
              <div className="font-semibold">ISO 8601:</div>
              <div className="font-mono text-xs">{new Date(Number(timestamp) * 1000).toISOString()}</div>
              
              <div className="font-semibold">UTC:</div>
              <div>{new Date(Number(timestamp) * 1000).toUTCString()}</div>
              
              <div className="font-semibold">Local:</div>
              <div>{new Date(Number(timestamp) * 1000).toLocaleString()}</div>
            </div>
          </div>
        )}

        <div className="text-sm text-muted-foreground">
          <p><strong>Unix timestamp:</strong> Number of seconds since January 1, 1970 (Unix epoch)</p>
        </div>
      </div>
    </ToolLayout>
  );
};

export default TimestampConverter;