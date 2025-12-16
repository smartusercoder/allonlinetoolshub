import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { ValidatedInput } from "@/components/form/ValidatedInput";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const units = {
  hz: { name: "Hertz (Hz)", multiplier: 1 },
  khz: { name: "Kilohertz (kHz)", multiplier: 1000 },
  mhz: { name: "Megahertz (MHz)", multiplier: 1000000 },
  ghz: { name: "Gigahertz (GHz)", multiplier: 1000000000 },
};

export default function FrequencyConverter() {
  const [value, setValue] = useState("1");
  const [fromUnit, setFromUnit] = useState("khz");
  const [toUnit, setToUnit] = useState("mhz");

  const convert = () => {
    const num = parseFloat(value) || 0;
    const result = (num * units[fromUnit as keyof typeof units].multiplier) / units[toUnit as keyof typeof units].multiplier;
    return result.toFixed(10);
  };

  return (
    <ToolLayout
      title="Frequency Converter"
      description="Convert between frequency units (Hz, kHz, MHz)"
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
            <p className="text-2xl font-bold">{convert()} {units[toUnit as keyof typeof units].name}</p>
          </div>
        </div>
      </Card>
    </ToolLayout>
  );
}
