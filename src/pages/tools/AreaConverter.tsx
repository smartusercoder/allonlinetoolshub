import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Maximize } from "lucide-react";
import { UsageGuide } from "@/components/UsageGuide";

const AreaConverter = () => {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("sqm");
  const [toUnit, setToUnit] = useState("sqft");

  const conversions: { [key: string]: number } = {
    sqm: 1,
    sqkm: 0.000001,
    sqcm: 10000,
    sqmm: 1000000,
    sqmi: 3.861e-7,
    sqyd: 1.19599,
    sqft: 10.7639,
    sqin: 1550,
    hectare: 0.0001,
    acre: 0.000247105
  };

  const convertArea = (val: string, from: string, to: string): string => {
    if (!val || isNaN(parseFloat(val))) return "";
    const sqm = parseFloat(val) / conversions[from];
    return (sqm * conversions[to]).toFixed(6);
  };

  const result = convertArea(value, fromUnit, toUnit);

  return (
    <ToolLayout
      title="Area Converter"
      description="Convert between different area units"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Enter an area value",
            "Select the unit you're converting from",
            "Choose the target unit",
            "View the conversion result"
          ]}
          tips={[
            "Supports metric (m², km², cm²) and imperial (ft², acres)",
            "Includes hectares for land measurement",
            "Perfect for real estate, land planning, construction",
            "1 acre ≈ 4,047 square meters"
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
                  <SelectItem value="sqm">Square Meter (m²)</SelectItem>
                  <SelectItem value="sqkm">Square Kilometer (km²)</SelectItem>
                  <SelectItem value="sqcm">Square Centimeter (cm²)</SelectItem>
                  <SelectItem value="sqmm">Square Millimeter (mm²)</SelectItem>
                  <SelectItem value="sqmi">Square Mile</SelectItem>
                  <SelectItem value="sqyd">Square Yard</SelectItem>
                  <SelectItem value="sqft">Square Foot</SelectItem>
                  <SelectItem value="sqin">Square Inch</SelectItem>
                  <SelectItem value="hectare">Hectare</SelectItem>
                  <SelectItem value="acre">Acre</SelectItem>
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
                  <SelectItem value="sqm">Square Meter (m²)</SelectItem>
                  <SelectItem value="sqkm">Square Kilometer (km²)</SelectItem>
                  <SelectItem value="sqcm">Square Centimeter (cm²)</SelectItem>
                  <SelectItem value="sqmm">Square Millimeter (mm²)</SelectItem>
                  <SelectItem value="sqmi">Square Mile</SelectItem>
                  <SelectItem value="sqyd">Square Yard</SelectItem>
                  <SelectItem value="sqft">Square Foot</SelectItem>
                  <SelectItem value="sqin">Square Inch</SelectItem>
                  <SelectItem value="hectare">Hectare</SelectItem>
                  <SelectItem value="acre">Acre</SelectItem>
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

export default AreaConverter;
