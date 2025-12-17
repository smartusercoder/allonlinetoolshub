import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Gauge } from "lucide-react";
import { UsageGuide } from "@/components/UsageGuide";

const SpeedConverter = () => {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("kmh");
  const [toUnit, setToUnit] = useState("mph");

  const conversions: { [key: string]: number } = {
    mps: 1,
    kmh: 3.6,
    mph: 2.23694,
    fps: 3.28084,
    knot: 1.94384
  };

  const convertSpeed = (val: string, from: string, to: string): string => {
    if (!val || isNaN(parseFloat(val))) return "";
    const mps = parseFloat(val) / conversions[from];
    return (mps * conversions[to]).toFixed(6);
  };

  const result = convertSpeed(value, fromUnit, toUnit);

  return (
    <ToolLayout
      title="Speed Converter"
      description="Convert between different speed units"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Enter a speed value",
            "Select the unit you're converting from",
            "Choose your target unit",
            "View the converted speed"
          ]}
          tips={[
            "Supports km/h, mph, m/s, and knots",
            "Perfect for travel, physics, aviation",
            "1 mph ≈ 1.6 km/h",
            "Knots commonly used for ships and aircraft"
          ]}
        />
      </div>
      <Card>
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
                  <SelectItem value="mps">Meters per Second (m/s)</SelectItem>
                  <SelectItem value="kmh">Kilometers per Hour (km/h)</SelectItem>
                  <SelectItem value="mph">Miles per Hour (mph)</SelectItem>
                  <SelectItem value="fps">Feet per Second (ft/s)</SelectItem>
                  <SelectItem value="knot">Knots</SelectItem>
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
                  <SelectItem value="mps">Meters per Second (m/s)</SelectItem>
                  <SelectItem value="kmh">Kilometers per Hour (km/h)</SelectItem>
                  <SelectItem value="mph">Miles per Hour (mph)</SelectItem>
                  <SelectItem value="fps">Feet per Second (ft/s)</SelectItem>
                  <SelectItem value="knot">Knots</SelectItem>
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

export default SpeedConverter;
