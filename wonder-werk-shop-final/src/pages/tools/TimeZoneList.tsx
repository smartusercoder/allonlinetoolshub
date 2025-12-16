import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock } from "lucide-react";
import { format } from "date-fns";

const TimeZoneList = () => {
  const [search, setSearch] = useState("");

  const timezones = [
    { name: "UTC", offset: "+00:00" },
    { name: "EST (New York)", offset: "-05:00" },
    { name: "PST (Los Angeles)", offset: "-08:00" },
    { name: "GMT (London)", offset: "+00:00" },
    { name: "CET (Paris)", offset: "+01:00" },
    { name: "JST (Tokyo)", offset: "+09:00" },
    { name: "AEDT (Sydney)", offset: "+11:00" },
    { name: "IST (India)", offset: "+05:30" },
    { name: "CST (Chicago)", offset: "-06:00" },
    { name: "MST (Denver)", offset: "-07:00" },
  ];

  const filtered = timezones.filter(tz => 
    tz.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ToolLayout
      title="Time Zone List"
      description="Browse common time zones and their offsets"
    >
      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="search">Search Time Zones</Label>
          <Input
            id="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
          />
        </div>

        <div className="space-y-2">
          {filtered.map((tz, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-md">
              <span className="font-medium">{tz.name}</span>
              <span className="text-sm text-muted-foreground">UTC{tz.offset}</span>
            </div>
          ))}
        </div>

        <div className="p-3 bg-muted rounded-md">
          <Clock className="inline h-4 w-4 mr-2" />
          <span className="text-sm">Current UTC Time: {format(new Date(), 'HH:mm:ss')}</span>
        </div>
      </Card>
    </ToolLayout>
  );
};

export default TimeZoneList;
