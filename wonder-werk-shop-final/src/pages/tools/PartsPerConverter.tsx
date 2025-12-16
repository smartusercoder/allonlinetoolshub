import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { ValidatedInput } from "@/components/form/ValidatedInput";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const units = {
  ppm: { name: "Parts Per Million (ppm)", multiplier: 1 },
  ppb: { name: "Parts Per Billion (ppb)", multiplier: 0.001 },
  ppt: { name: "Parts Per Trillion (ppt)", multiplier: 0.000001 },
  ppq: { name: "Parts Per Quadrillion (ppq)", multiplier: 0.000000001 },
  percent: { name: "Percent (%)", multiplier: 10000 },
};

export default function PartsPerConverter() {
  const [value, setValue] = useState("1");
  const [fromUnit, setFromUnit] = useState("ppm");
  const [toUnit, setToUnit] = useState("ppb");

  const convert = () => {
    const num = parseFloat(value) || 0;
    const result = (num * units[fromUnit as keyof typeof units].multiplier) / units[toUnit as keyof typeof units].multiplier;
    return result.toFixed(15);
  };

  return (
    <ToolLayout
      title="Parts Per Converter"
      description="Convert between parts per notation (ppm, ppb, etc.)"
    >
      <Card className="p-6">
        <div className="space-y-6">
          <ValidatedInput
            label="Value"
            type="number"
            value={value}
            onChange={setValue}
            placeholder="Enter value"
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>From</Label>
              <Select value={fromUnit} onValueChange={setFromUnit}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(units).map(([key, unit]) => (
                    <SelectItem key={key} value={key}>{unit.name}</SelectItem>
                  ))}
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
                  {Object.entries(units).map(([key, unit]) => (
                    <SelectItem key={key} value={key}>{unit.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Result</p>
            <p className="text-2xl font-bold">{convert()}</p>
          </div>
        </div>
      </Card>
    </ToolLayout>
  );
}
