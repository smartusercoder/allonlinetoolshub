import { useState, useEffect } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

export default function UnixTimestamp() {
  const [currentTimestamp, setCurrentTimestamp] = useState(Math.floor(Date.now() / 1000));
  const [customTimestamp, setCustomTimestamp] = useState(currentTimestamp.toString());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimestamp(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const timestampToDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  return (
    <ToolLayout
      title="Unix Timestamp Converter"
      description="Convert Unix timestamps to human-readable dates"
    >
      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <Label>Current Unix Timestamp</Label>
          <div className="flex gap-2">
            <Input value={currentTimestamp} readOnly className="font-mono" />
            <Button onClick={() => {
              navigator.clipboard.writeText(currentTimestamp.toString());
              toast.success("Copied!");
            }} size="icon">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-sm text-muted-foreground">
            {timestampToDate(currentTimestamp)}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="custom">Convert Custom Timestamp</Label>
          <Input
            id="custom"
            type="number"
            value={customTimestamp}
            onChange={(e) => setCustomTimestamp(e.target.value)}
            placeholder="1234567890"
          />
          <Card className="p-4 bg-primary/10">
            <div className="text-sm text-muted-foreground mb-1">Date & Time</div>
            <div className="text-lg font-semibold">
              {timestampToDate(parseInt(customTimestamp) || 0)}
            </div>
          </Card>
        </div>
      </Card>
    </ToolLayout>
  );
}
