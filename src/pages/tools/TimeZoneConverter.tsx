import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UsageGuide } from "@/components/UsageGuide";

export default function TimeZoneConverter() {
  const [time, setTime] = useState("12:00");
  const [fromZone, setFromZone] = useState("0");
  const [toZone, setToZone] = useState("-5");

  const zones = [
    { name: "UTC", offset: 0 },
    { name: "EST (New York)", offset: -5 },
    { name: "PST (Los Angeles)", offset: -8 },
    { name: "GMT (London)", offset: 0 },
    { name: "CET (Paris)", offset: 1 },
    { name: "IST (Mumbai)", offset: 5.5 },
    { name: "CST (Beijing)", offset: 8 },
    { name: "JST (Tokyo)", offset: 9 },
    { name: "AEST (Sydney)", offset: 10 },
  ];

  const convertTime = () => {
    const [hours, minutes] = time.split(':').map(Number);
    const fromOffset = parseFloat(fromZone);
    const toOffset = parseFloat(toZone);
    
    const utcHours = hours - fromOffset;
    let convertedHours = utcHours + toOffset;
    
    // Handle day overflow
    if (convertedHours >= 24) {
      convertedHours -= 24;
    } else if (convertedHours < 0) {
      convertedHours += 24;
    }
    
    return `${String(Math.floor(convertedHours)).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  };

  const convertedTime = time ? convertTime() : "";

  return (
    <ToolLayout
      title="Time Zone Converter"
      description="Convert time between different time zones"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Select a time using the time picker",
            "Choose the source time zone (From)",
            "Choose the destination time zone (To)",
            "The converted time appears at the bottom"
          ]}
          tips={[
            "Perfect for scheduling international meetings",
            "Great for coordinating with remote teams",
            "Includes major cities and their UTC offsets",
            "Conversion updates instantly as you change settings"
          ]}
          example="12:00 EST (UTC-5) = 17:00 GMT (UTC+0)"
        />
      </div>
      <Card className="p-6 mt-6">
        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium">Time</label>
            <Input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">From Time Zone</label>
            <Select value={fromZone} onValueChange={setFromZone}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {zones.map(zone => (
                  <SelectItem key={zone.name} value={String(zone.offset)}>
                    {zone.name} (UTC{zone.offset >= 0 ? '+' : ''}{zone.offset})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">To Time Zone</label>
            <Select value={toZone} onValueChange={setToZone}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {zones.map(zone => (
                  <SelectItem key={zone.name} value={String(zone.offset)}>
                    {zone.name} (UTC{zone.offset >= 0 ? '+' : ''}{zone.offset})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {convertedTime && (
            <div className="p-6 bg-primary/10 rounded-lg text-center">
              <div className="text-sm text-muted-foreground mb-2">Converted Time</div>
              <div className="text-4xl font-bold font-mono text-primary">
                {convertedTime}
              </div>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
}
