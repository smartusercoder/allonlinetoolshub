import { useState, useMemo } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Clock } from "lucide-react";
import { toast } from "sonner";

const PRESETS = [
  { label: "Every minute", cron: "* * * * *" },
  { label: "Every 5 minutes", cron: "*/5 * * * *" },
  { label: "Every 15 minutes", cron: "*/15 * * * *" },
  { label: "Every hour", cron: "0 * * * *" },
  { label: "Every day at midnight", cron: "0 0 * * *" },
  { label: "Every day at noon", cron: "0 12 * * *" },
  { label: "Every Monday at 9am", cron: "0 9 * * 1" },
  { label: "Every weekday at 9am", cron: "0 9 * * 1-5" },
  { label: "First day of month", cron: "0 0 1 * *" },
  { label: "Every Sunday at 3am", cron: "0 3 * * 0" },
];

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function CronExpression() {
  const [minute, setMinute] = useState("*");
  const [hour, setHour] = useState("*");
  const [dayOfMonth, setDayOfMonth] = useState("*");
  const [month, setMonth] = useState("*");
  const [dayOfWeek, setDayOfWeek] = useState("*");
  const [customCron, setCustomCron] = useState("");

  const cronExpression = useMemo(() => {
    return `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;
  }, [minute, hour, dayOfMonth, month, dayOfWeek]);

  const parseCron = (cron: string) => {
    const parts = cron.trim().split(/\s+/);
    if (parts.length === 5) {
      setMinute(parts[0]);
      setHour(parts[1]);
      setDayOfMonth(parts[2]);
      setMonth(parts[3]);
      setDayOfWeek(parts[4]);
      setCustomCron(cron);
    }
  };

  const describeCron = (cron: string): string => {
    const parts = cron.trim().split(/\s+/);
    if (parts.length !== 5) return "Invalid cron expression";

    const [min, hr, dom, mon, dow] = parts;
    const descriptions: string[] = [];

    // Minute
    if (min === "*") descriptions.push("every minute");
    else if (min.startsWith("*/")) descriptions.push(`every ${min.slice(2)} minutes`);
    else descriptions.push(`at minute ${min}`);

    // Hour
    if (hr !== "*") {
      if (hr.startsWith("*/")) descriptions.push(`every ${hr.slice(2)} hours`);
      else descriptions.push(`at ${hr}:00`);
    }

    // Day of month
    if (dom !== "*") {
      if (dom.startsWith("*/")) descriptions.push(`every ${dom.slice(2)} days`);
      else descriptions.push(`on day ${dom}`);
    }

    // Month
    if (mon !== "*") {
      const monthNum = parseInt(mon);
      if (!isNaN(monthNum) && monthNum >= 1 && monthNum <= 12) {
        descriptions.push(`in ${MONTHS[monthNum - 1]}`);
      } else {
        descriptions.push(`in month ${mon}`);
      }
    }

    // Day of week
    if (dow !== "*") {
      if (dow === "1-5") descriptions.push("on weekdays");
      else if (dow === "0,6") descriptions.push("on weekends");
      else {
        const dayNum = parseInt(dow);
        if (!isNaN(dayNum) && dayNum >= 0 && dayNum <= 6) {
          descriptions.push(`on ${DAYS[dayNum]}`);
        } else {
          descriptions.push(`on day of week ${dow}`);
        }
      }
    }

    return descriptions.join(", ");
  };

  const getNextRuns = (cron: string, count: number = 5): Date[] => {
    const parts = cron.trim().split(/\s+/);
    if (parts.length !== 5) return [];

    const runs: Date[] = [];
    const now = new Date();
    let current = new Date(now);
    current.setSeconds(0);
    current.setMilliseconds(0);

    const [minPart, hrPart, domPart, monPart, dowPart] = parts;

    const parseField = (field: string, max: number, offset = 0): number[] => {
      if (field === "*") return Array.from({ length: max }, (_, i) => i + offset);
      if (field.startsWith("*/")) {
        const step = parseInt(field.slice(2));
        return Array.from({ length: Math.ceil(max / step) }, (_, i) => i * step + offset);
      }
      if (field.includes(",")) return field.split(",").map(n => parseInt(n));
      if (field.includes("-")) {
        const [start, end] = field.split("-").map(n => parseInt(n));
        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
      }
      return [parseInt(field)];
    };

    const minutes = parseField(minPart, 60);
    const hours = parseField(hrPart, 24);
    const daysOfWeek = parseField(dowPart, 7);

    for (let i = 0; i < 10000 && runs.length < count; i++) {
      current.setMinutes(current.getMinutes() + 1);
      
      if (!minutes.includes(current.getMinutes())) continue;
      if (!hours.includes(current.getHours())) continue;
      if (dowPart !== "*" && !daysOfWeek.includes(current.getDay())) continue;
      if (domPart !== "*" && !parseField(domPart, 31, 1).includes(current.getDate())) continue;
      if (monPart !== "*" && !parseField(monPart, 12, 1).includes(current.getMonth() + 1)) continue;

      runs.push(new Date(current));
    }

    return runs;
  };

  const copy = () => {
    navigator.clipboard.writeText(cronExpression);
    toast.success("Copied to clipboard");
  };

  return (
    <ToolLayout title="Cron Expression Generator" description="Generate and validate cron expressions with visual scheduling">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Card className="p-6">
            <Tabs defaultValue="builder">
              <TabsList className="mb-4">
                <TabsTrigger value="builder">Builder</TabsTrigger>
                <TabsTrigger value="presets">Presets</TabsTrigger>
              </TabsList>

              <TabsContent value="builder" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Minute (0-59)</Label>
                    <Input value={minute} onChange={(e) => setMinute(e.target.value)} placeholder="*" />
                  </div>
                  <div>
                    <Label>Hour (0-23)</Label>
                    <Input value={hour} onChange={(e) => setHour(e.target.value)} placeholder="*" />
                  </div>
                  <div>
                    <Label>Day of Month (1-31)</Label>
                    <Input value={dayOfMonth} onChange={(e) => setDayOfMonth(e.target.value)} placeholder="*" />
                  </div>
                  <div>
                    <Label>Month (1-12)</Label>
                    <Input value={month} onChange={(e) => setMonth(e.target.value)} placeholder="*" />
                  </div>
                  <div className="col-span-2">
                    <Label>Day of Week (0-6, Sun=0)</Label>
                    <Input value={dayOfWeek} onChange={(e) => setDayOfWeek(e.target.value)} placeholder="*" />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="presets" className="space-y-2">
                {PRESETS.map((preset) => (
                  <Button
                    key={preset.cron}
                    variant="outline"
                    className="w-full justify-between"
                    onClick={() => parseCron(preset.cron)}
                  >
                    <span>{preset.label}</span>
                    <code className="text-xs bg-muted px-2 py-1 rounded">{preset.cron}</code>
                  </Button>
                ))}
              </TabsContent>
            </Tabs>
          </Card>

          <Card className="p-6">
            <Label className="text-sm text-muted-foreground mb-2 block">Or enter custom expression</Label>
            <div className="flex gap-2">
              <Input
                value={customCron}
                onChange={(e) => setCustomCron(e.target.value)}
                placeholder="* * * * *"
                className="font-mono"
              />
              <Button onClick={() => parseCron(customCron)}>Parse</Button>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="p-6">
            <Label className="text-lg font-semibold mb-4 block">Generated Expression</Label>
            <div className="flex items-center gap-2 mb-4">
              <code className="flex-1 bg-muted p-4 rounded-lg text-2xl font-mono text-center">
                {cronExpression}
              </code>
              <Button variant="ghost" size="icon" onClick={copy}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-muted-foreground text-sm">{describeCron(cronExpression)}</p>
          </Card>

          <Card className="p-6">
            <Label className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Clock className="h-4 w-4" /> Next 5 Scheduled Runs
            </Label>
            <div className="space-y-2">
              {getNextRuns(cronExpression).map((date, i) => (
                <div key={i} className="flex items-center gap-2 p-2 bg-muted rounded">
                  <span className="text-sm font-mono">
                    {date.toLocaleDateString()} {date.toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <Label className="text-lg font-semibold mb-4 block">Cron Syntax Reference</Label>
            <div className="text-sm space-y-2">
              <div className="grid grid-cols-5 gap-2 font-mono text-center bg-muted p-2 rounded">
                <span>MIN</span><span>HOUR</span><span>DOM</span><span>MON</span><span>DOW</span>
              </div>
              <ul className="space-y-1 text-muted-foreground">
                <li><code>*</code> - any value</li>
                <li><code>*/n</code> - every n units</li>
                <li><code>n,m</code> - specific values</li>
                <li><code>n-m</code> - range of values</li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
