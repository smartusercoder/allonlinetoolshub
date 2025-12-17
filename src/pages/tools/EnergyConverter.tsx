import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { UsageGuide } from "@/components/UsageGuide";

export default function EnergyConverter() {
  const [value, setValue] = useState("1");
  const [fromUnit, setFromUnit] = useState("kwh");

  const conversions: Record<string, number> = {
    j: 1,
    kj: 1000,
    cal: 4.184,
    kcal: 4184,
    wh: 3600,
    kwh: 3600000,
    btu: 1055.06
  };

  const convert = () => {
    const val = parseFloat(value);
    const inJoules = val * conversions[fromUnit];
    
    return {
      j: inJoules.toFixed(2),
      kj: (inJoules / conversions.kj).toFixed(4),
      cal: (inJoules / conversions.cal).toFixed(4),
      kcal: (inJoules / conversions.kcal).toFixed(4),
      wh: (inJoules / conversions.wh).toFixed(4),
      kwh: (inJoules / conversions.kwh).toFixed(6),
      btu: (inJoules / conversions.btu).toFixed(4)
    };
  };

  const result = convert();

  return (
    <ToolLayout title="Energy Converter" description="Convert between energy units">
      <UsageGuide
        steps={[
          "Enter an energy value",
          "Select the source unit (Joules, kWh, calories, etc.)",
          "All unit conversions appear below",
          "Perfect for physics and nutrition calculations"
        ]}
        tips={[
          "1 calorie = 4.184 joules",
          "kWh used for electricity billing",
          "Kilocalories (kcal) are food calories",
          "BTU commonly used in HVAC systems"
        ]}
        example="1 kWh = 3,600,000 J = 860 kcal"
      />
      <div className="space-y-4 mt-6">
        <Card className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="value">Value</Label>
              <Input id="value" type="number" step="any" value={value} onChange={(e) => setValue(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="from">From Unit</Label>
              <select
                id="from"
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="j">Joules (J)</option>
                <option value="kj">Kilojoules (kJ)</option>
                <option value="cal">Calories (cal)</option>
                <option value="kcal">Kilocalories (kcal)</option>
                <option value="wh">Watt-hours (Wh)</option>
                <option value="kwh">Kilowatt-hours (kWh)</option>
                <option value="btu">BTU</option>
              </select>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Joules</div>
            <div className="text-xl font-bold">{result.j}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Kilojoules</div>
            <div className="text-xl font-bold">{result.kj}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Calories</div>
            <div className="text-xl font-bold">{result.cal}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Kilocalories</div>
            <div className="text-xl font-bold">{result.kcal}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Watt-hours</div>
            <div className="text-xl font-bold">{result.wh}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Kilowatt-hours</div>
            <div className="text-xl font-bold">{result.kwh}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">BTU</div>
            <div className="text-xl font-bold">{result.btu}</div>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
