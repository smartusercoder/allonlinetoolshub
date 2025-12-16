import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UsageGuide } from "@/components/UsageGuide";

export default function AngleConverter() {
  const [value, setValue] = useState("90");
  const [fromUnit, setFromUnit] = useState("degrees");

  const degrees = fromUnit === "degrees" ? parseFloat(value) || 0
    : fromUnit === "radians" ? (parseFloat(value) || 0) * (180 / Math.PI)
    : (parseFloat(value) || 0) * 0.9;

  const conversions = {
    degrees: degrees,
    radians: degrees * (Math.PI / 180),
    gradians: degrees / 0.9,
  };

  return (
    <ToolLayout
      title="Angle Converter"
      description="Convert between degrees, radians, gradians"
    >
      <UsageGuide
        steps={[
          "Enter an angle value",
          "Select the source unit (degrees, radians, or gradians)",
          "All conversions display instantly below",
          "Results update automatically as you type"
        ]}
        tips={[
          "π radians = 180 degrees = 200 gradians",
          "Radians are used in math and programming",
          "Gradians divide a circle into 400 parts",
          "Perfect for geometry and trigonometry"
        ]}
        example="90° = 1.5708 rad = 100 gon"
      />
      <Card className="p-6 mt-6">
        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium">From</label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter value..."
                step="any"
              />
              <Select value={fromUnit} onValueChange={setFromUnit}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="degrees">Degrees</SelectItem>
                  <SelectItem value="radians">Radians</SelectItem>
                  <SelectItem value="gradians">Gradians</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Degrees (°)</div>
              <div className="text-2xl font-bold">{conversions.degrees.toFixed(4)}</div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Radians (rad)</div>
              <div className="text-2xl font-bold">{conversions.radians.toFixed(6)}</div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Gradians (gon)</div>
              <div className="text-2xl font-bold">{conversions.gradians.toFixed(4)}</div>
            </div>
          </div>
        </div>
      </Card>
    </ToolLayout>
  );
}
