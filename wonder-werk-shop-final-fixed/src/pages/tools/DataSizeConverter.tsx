import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { UsageGuide } from "@/components/UsageGuide";

export default function DataSizeConverter() {
  const [bytes, setBytes] = useState("1024");

  const value = parseFloat(bytes) || 0;
  
  const conversions = {
    bytes: value,
    kb: value / 1024,
    mb: value / (1024 * 1024),
    gb: value / (1024 * 1024 * 1024),
    tb: value / (1024 * 1024 * 1024 * 1024),
  };

  return (
    <ToolLayout
      title="Data Size Converter"
      description="Convert between bytes, KB, MB, GB, TB"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Enter a value in bytes",
            "View automatic conversions to KB, MB, GB, TB",
            "All units update in real-time",
            "Use for file sizes, storage capacity, bandwidth"
          ]}
          tips={[
            "1 KB = 1,024 bytes (binary)",
            "1 MB = 1,024 KB = 1,048,576 bytes",
            "1 GB = 1,024 MB",
            "Perfect for understanding file and storage sizes"
          ]}
          example="1024 bytes = 1 KB"
        />
      </div>
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium">Bytes</label>
            <Input
              type="number"
              value={bytes}
              onChange={(e) => setBytes(e.target.value)}
              placeholder="Enter bytes..."
            />
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Kilobytes (KB)</div>
              <div className="text-2xl font-bold">{conversions.kb.toFixed(2)}</div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Megabytes (MB)</div>
              <div className="text-2xl font-bold">{conversions.mb.toFixed(2)}</div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Gigabytes (GB)</div>
              <div className="text-2xl font-bold">{conversions.gb.toFixed(4)}</div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Terabytes (TB)</div>
              <div className="text-2xl font-bold">{conversions.tb.toFixed(6)}</div>
            </div>
          </div>
        </div>
      </Card>
    </ToolLayout>
  );
}
