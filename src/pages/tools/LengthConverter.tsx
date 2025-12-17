import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Ruler } from "lucide-react";
import { UsageGuide } from "@/components/UsageGuide";

const LengthConverter = () => {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("meter");
  const [toUnit, setToUnit] = useState("kilometer");

  const conversions: { [key: string]: number } = {
    meter: 1,
    kilometer: 0.001,
    centimeter: 100,
    millimeter: 1000,
    mile: 0.000621371,
    yard: 1.09361,
    foot: 3.28084,
    inch: 39.3701,
    nauticalmile: 0.000539957
  };

  const convertLength = (val: string, from: string, to: string): string => {
    if (!val || isNaN(parseFloat(val))) return "";
    const meters = parseFloat(val) / conversions[from];
    return (meters * conversions[to]).toFixed(6);
  };

  const result = convertLength(value, fromUnit, toUnit);

  return (
    <ToolLayout
      title="Length Converter"
      description="Convert between different length units"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Enter a length value",
            "Select the unit you're converting from",
            "Select the unit you're converting to",
            "View the result instantly"
          ]}
          tips={[
            "Supports metric (m, cm, km) and imperial (ft, in, miles)",
            "Includes nautical miles for maritime distances",
            "Perfect for international measurements",
            "Great for construction, travel, and science"
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
                  <SelectItem value="meter">Meter (m)</SelectItem>
                  <SelectItem value="kilometer">Kilometer (km)</SelectItem>
                  <SelectItem value="centimeter">Centimeter (cm)</SelectItem>
                  <SelectItem value="millimeter">Millimeter (mm)</SelectItem>
                  <SelectItem value="mile">Mile</SelectItem>
                  <SelectItem value="yard">Yard</SelectItem>
                  <SelectItem value="foot">Foot</SelectItem>
                  <SelectItem value="inch">Inch</SelectItem>
                  <SelectItem value="nauticalmile">Nautical Mile</SelectItem>
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
                  <SelectItem value="meter">Meter (m)</SelectItem>
                  <SelectItem value="kilometer">Kilometer (km)</SelectItem>
                  <SelectItem value="centimeter">Centimeter (cm)</SelectItem>
                  <SelectItem value="millimeter">Millimeter (mm)</SelectItem>
                  <SelectItem value="mile">Mile</SelectItem>
                  <SelectItem value="yard">Yard</SelectItem>
                  <SelectItem value="foot">Foot</SelectItem>
                  <SelectItem value="inch">Inch</SelectItem>
                  <SelectItem value="nauticalmile">Nautical Mile</SelectItem>
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

export default LengthConverter;
