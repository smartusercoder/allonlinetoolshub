import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export default function TimeAgo() {
  const [date, setDate] = useState("");
  const [result, setResult] = useState("");

  const calculateTimeAgo = (dateStr: string) => {
    if (!dateStr) return "";
    
    const then = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - then.getTime();
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);
    
    if (years > 0) return `${years} year${years > 1 ? 's' : ''} ago`;
    if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`;
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
  };

  const handleDateChange = (value: string) => {
    setDate(value);
    setResult(calculateTimeAgo(value));
  };

  return (
    <ToolLayout
      title="Time Ago Calculator"
      description="Calculate how long ago a date was"
      keywords={["time ago", "relative time", "time since", "date difference", "time calculator"]}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Select Date and Time</Label>
          <Input
            type="datetime-local"
            value={date}
            onChange={e => handleDateChange(e.target.value)}
          />
        </div>
        {result && (
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-primary">{result}</div>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}
