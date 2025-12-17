import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Timer } from "lucide-react";
import { UsageGuide } from "@/components/UsageGuide";

const TimeConverter = () => {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("hour");
  const [toUnit, setToUnit] = useState("minute");

  const conversions: { [key: string]: number } = {
    second: 1,
    millisecond: 1000,
    microsecond: 1000000,
    nanosecond: 1000000000,
    minute: 1/60,
    hour: 1/3600,
    day: 1/86400,
    week: 1/604800,
    month: 1/2592000,
    year: 1/31536000
  };

  const convertTime = (val: string, from: string, to: string): string => {
    if (!val || isNaN(parseFloat(val))) return "";
    const seconds = parseFloat(val) / conversions[from];
    return (seconds * conversions[to]).toFixed(6);
  };

  const result = convertTime(value, fromUnit, toUnit);

  return (
    <ToolLayout
      title="Time Converter"
      description="Convert between different time units"
    >
      <UsageGuide
        steps={[
          "Enter a time value in the input field",
          "Select the source unit (From)",
          "Select the target unit (To)",
          "Result appears instantly below"
        ]}
        tips={[
          "Convert between nanoseconds to years",
          "Great for debugging timing issues",
          "Useful for performance metrics",
          "Instant conversion as you type"
        ]}
        example="1 hour = 60 minutes = 3600 seconds"
      />
      <Card className="mt-6">
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-2">
            <Label>Value</Label>
            <Input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter value"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>From</Label>
              <Select value={fromUnit} onValueChange={setFromUnit}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nanosecond">Nanosecond (ns)</SelectItem>
                  <SelectItem value="microsecond">Microsecond (μs)</SelectItem>
                  <SelectItem value="millisecond">Millisecond (ms)</SelectItem>
                  <SelectItem value="second">Second (s)</SelectItem>
                  <SelectItem value="minute">Minute</SelectItem>
                  <SelectItem value="hour">Hour</SelectItem>
                  <SelectItem value="day">Day</SelectItem>
                  <SelectItem value="week">Week</SelectItem>
                  <SelectItem value="month">Month</SelectItem>
                  <SelectItem value="year">Year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>To</Label>
              <Select value={toUnit} onValueChange={setToUnit}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nanosecond">Nanosecond (ns)</SelectItem>
                  <SelectItem value="microsecond">Microsecond (μs)</SelectItem>
                  <SelectItem value="millisecond">Millisecond (ms)</SelectItem>
                  <SelectItem value="second">Second (s)</SelectItem>
                  <SelectItem value="minute">Minute</SelectItem>
                  <SelectItem value="hour">Hour</SelectItem>
                  <SelectItem value="day">Day</SelectItem>
                  <SelectItem value="week">Week</SelectItem>
                  <SelectItem value="month">Month</SelectItem>
                  <SelectItem value="year">Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {result && (
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Result</p>
              <p className="text-2xl font-semibold">{result}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </ToolLayout>
  );
};

export default TimeConverter;
