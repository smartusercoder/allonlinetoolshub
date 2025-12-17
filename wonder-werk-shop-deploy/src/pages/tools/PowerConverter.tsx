import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { UsageGuide } from "@/components/UsageGuide";

export default function PowerConverter() {
  const [value, setValue] = useState("1");
  const [fromUnit, setFromUnit] = useState("kw");

  const conversions: Record<string, number> = {
    w: 1,
    kw: 1000,
    mw: 1000000,
    hp: 745.7,
    btu: 1055.06
  };

  const convert = () => {
    const val = parseFloat(value);
    const inWatts = val * conversions[fromUnit];
    
    return {
      w: inWatts.toFixed(2),
      kw: (inWatts / conversions.kw).toFixed(4),
      mw: (inWatts / conversions.mw).toFixed(6),
      hp: (inWatts / conversions.hp).toFixed(4),
      btu: (inWatts / conversions.btu).toFixed(4)
    };
  };

  const result = convert();

  return (
    <ToolLayout title="Power Converter" description="Convert between power units">
      <UsageGuide
        steps={[
          "Enter a power value",
          "Select the source unit (Watts, Kilowatts, HP, etc.)",
          "All conversions display below",
          "Results update instantly"
        ]}
        tips={[
          "1 horsepower ≈ 745.7 watts",
          "Kilowatts commonly used for electrical power",
          "BTU/hour used in HVAC and heating systems",
          "Great for engine specs and electrical calculations"
        ]}
        example="1 kW = 1000 W = 1.34 hp"
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
                <option value="w">Watts (W)</option>
                <option value="kw">Kilowatts (kW)</option>
                <option value="mw">Megawatts (MW)</option>
                <option value="hp">Horsepower (hp)</option>
                <option value="btu">BTU/hour</option>
              </select>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Watts</div>
            <div className="text-xl font-bold">{result.w} W</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Kilowatts</div>
            <div className="text-xl font-bold">{result.kw} kW</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Megawatts</div>
            <div className="text-xl font-bold">{result.mw} MW</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Horsepower</div>
            <div className="text-xl font-bold">{result.hp} hp</div>
          </Card>
          <Card className="p-4 col-span-2">
            <div className="text-sm text-muted-foreground">BTU per hour</div>
            <div className="text-xl font-bold">{result.btu}</div>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
