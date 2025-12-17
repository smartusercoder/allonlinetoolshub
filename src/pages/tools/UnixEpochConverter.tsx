import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const UnixEpochConverter = () => {
  const [timestamp, setTimestamp] = useState("");
  const [dateStr, setDateStr] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const timestampToDate = () => {
    const ts = parseInt(timestamp);
    if (isNaN(ts)) return;
    const date = new Date(ts * 1000);
    setResult(date.toLocaleString() + " (UTC: " + date.toUTCString() + ")");
  };

  const dateToTimestamp = () => {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return;
    setResult("Unix Timestamp: " + Math.floor(date.getTime() / 1000));
  };

  const getCurrentTimestamp = () => {
    setResult("Current Unix Timestamp: " + Math.floor(Date.now() / 1000));
  };

  return (
    <ToolLayout title="Unix Epoch Converter" description="Convert Unix timestamps to dates and vice versa">
      <Card className="p-6">
        <div className="space-y-4 max-w-md mx-auto">
          <div>
            <Label>Unix Timestamp</Label>
            <Input type="number" value={timestamp} onChange={(e) => setTimestamp(e.target.value)} placeholder="e.g., 1609459200" />
            <Button onClick={timestampToDate} className="w-full mt-2">Convert to Date</Button>
          </div>
          <div>
            <Label>Date/Time</Label>
            <Input type="datetime-local" value={dateStr} onChange={(e) => setDateStr(e.target.value)} />
            <Button onClick={dateToTimestamp} className="w-full mt-2">Convert to Timestamp</Button>
          </div>
          <Button onClick={getCurrentTimestamp} variant="outline" className="w-full">Get Current Timestamp</Button>
          {result && <div className="p-4 bg-primary/10 rounded-lg text-center font-mono">{result}</div>}
        </div>
      </Card>
    </ToolLayout>
  );
};

export default UnixEpochConverter;
