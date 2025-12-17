import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

export default function DateFormatter() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const selectedDate = new Date(date);

  const formats = [
    { label: "ISO 8601", value: selectedDate.toISOString() },
    { label: "UTC String", value: selectedDate.toUTCString() },
    { label: "Local String", value: selectedDate.toLocaleString() },
    { label: "Date String", value: selectedDate.toDateString() },
    { label: "Time String", value: selectedDate.toTimeString() },
    { label: "DD/MM/YYYY", value: selectedDate.toLocaleDateString('en-GB') },
    { label: "MM/DD/YYYY", value: selectedDate.toLocaleDateString('en-US') },
    { label: "YYYY-MM-DD", value: date },
  ];

  return (
    <ToolLayout
      title="Date Formatter"
      description="Format dates in various standard formats"
    >
      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="date">Select Date</Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          {formats.map((format, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground mb-1">{format.label}</div>
                  <div className="font-mono text-sm">{format.value}</div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText(format.value);
                    toast.success("Copied!");
                  }}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </ToolLayout>
  );
}
