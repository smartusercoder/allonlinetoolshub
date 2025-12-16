import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function FileSizeCalculator() {
  const [size, setSize] = useState("1024");
  const [fromUnit, setFromUnit] = useState("KB");

  const convert = () => {
    const bytes = parseFloat(size) * (
      fromUnit === "B" ? 1 :
      fromUnit === "KB" ? 1024 :
      fromUnit === "MB" ? 1024 * 1024 :
      fromUnit === "GB" ? 1024 * 1024 * 1024 : 1024 * 1024 * 1024 * 1024
    );

    return {
      bytes: bytes.toFixed(0),
      kb: (bytes / 1024).toFixed(2),
      mb: (bytes / (1024 * 1024)).toFixed(2),
      gb: (bytes / (1024 * 1024 * 1024)).toFixed(4)
    };
  };

  const result = convert();

  return (
    <ToolLayout
      title="File Size Calculator"
      description="Convert between file size units"
    >
      <Card className="p-6 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="size">Size</Label>
            <Input
              id="size"
              type="number"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Unit</Label>
            <Select value={fromUnit} onValueChange={setFromUnit}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="B">Bytes (B)</SelectItem>
                <SelectItem value="KB">Kilobytes (KB)</SelectItem>
                <SelectItem value="MB">Megabytes (MB)</SelectItem>
                <SelectItem value="GB">Gigabytes (GB)</SelectItem>
                <SelectItem value="TB">Terabytes (TB)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 text-center">
            <div className="text-sm text-muted-foreground mb-1">Bytes</div>
            <div className="text-xl font-bold">{result.bytes}</div>
          </Card>

          <Card className="p-4 text-center">
            <div className="text-sm text-muted-foreground mb-1">KB</div>
            <div className="text-xl font-bold">{result.kb}</div>
          </Card>

          <Card className="p-4 text-center">
            <div className="text-sm text-muted-foreground mb-1">MB</div>
            <div className="text-xl font-bold">{result.mb}</div>
          </Card>

          <Card className="p-4 text-center">
            <div className="text-sm text-muted-foreground mb-1">GB</div>
            <div className="text-xl font-bold">{result.gb}</div>
          </Card>
        </div>
      </Card>
    </ToolLayout>
  );
}
