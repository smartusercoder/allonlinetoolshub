import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { UsageGuide } from "@/components/UsageGuide";

export default function PressureConverter() {
  const [value, setValue] = useState("1");
  const [fromUnit, setFromUnit] = useState("bar");

  const conversions: Record<string, number> = {
    bar: 1,
    psi: 14.5038,
    pascal: 100000,
    kpa: 100,
    atm: 0.986923,
    torr: 750.062
  };

  const convert = () => {
    const val = parseFloat(value);
    const inBar = val / conversions[fromUnit];
    
    return {
      bar: (inBar * conversions.bar).toFixed(4),
      psi: (inBar * conversions.psi).toFixed(4),
      pascal: (inBar * conversions.pascal).toFixed(2),
      kpa: (inBar * conversions.kpa).toFixed(4),
      atm: (inBar * conversions.atm).toFixed(4),
      torr: (inBar * conversions.torr).toFixed(2)
    };
  };

  const result = convert();

  return (
    <ToolLayout title="Pressure Converter" description="Convert between pressure units">
      <UsageGuide
        steps={[
          "Enter a pressure value",
          "Select the source unit (Bar, PSI, Pascal, etc.)",
          "All unit conversions appear instantly",
          "Results update as you type"
        ]}
        tips={[
          "PSI (pounds per square inch) commonly used in US",
          "Bar and Pascal used in metric systems",
          "1 atm = 1.01325 bar = 14.7 PSI",
          "Great for tire pressure, weather, and engineering"
        ]}
        example="1 bar = 14.5038 PSI = 100 kPa"
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
                <option value="bar">Bar</option>
                <option value="psi">PSI</option>
                <option value="pascal">Pascal</option>
                <option value="kpa">kPa</option>
                <option value="atm">Atmosphere</option>
                <option value="torr">Torr</option>
              </select>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Bar</div>
            <div className="text-xl font-bold">{result.bar}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">PSI</div>
            <div className="text-xl font-bold">{result.psi}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Pascal</div>
            <div className="text-xl font-bold">{result.pascal}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">kPa</div>
            <div className="text-xl font-bold">{result.kpa}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Atmosphere</div>
            <div className="text-xl font-bold">{result.atm}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Torr</div>
            <div className="text-xl font-bold">{result.torr}</div>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
