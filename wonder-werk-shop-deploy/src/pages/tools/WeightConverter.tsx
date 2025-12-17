import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Weight } from "lucide-react";
import { UsageGuide } from "@/components/UsageGuide";

const WeightConverter = () => {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("kilogram");
  const [toUnit, setToUnit] = useState("pound");

  const conversions: { [key: string]: number } = {
    kilogram: 1,
    gram: 1000,
    milligram: 1000000,
    metric_ton: 0.001,
    pound: 2.20462,
    ounce: 35.274,
    ton: 0.00110231,
    stone: 0.157473
  };

  const convertWeight = (val: string, from: string, to: string): string => {
    if (!val || isNaN(parseFloat(val))) return "";
    const kg = parseFloat(val) / conversions[from];
    return (kg * conversions[to]).toFixed(6);
  };

  const result = convertWeight(value, fromUnit, toUnit);

  return (
    <ToolLayout
      title="Weight Converter"
      description="Convert between different weight units"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Enter a weight value",
            "Select the unit you're converting from",
            "Select the target unit",
            "View instant conversion result"
          ]}
          tips={[
            "Supports metric (kg, g, mg) and imperial (lb, oz)",
            "Includes tons and metric tons",
            "Perfect for cooking, shipping, science",
            "1 kg ≈ 2.2 pounds"
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
                  <SelectItem value="kilogram">Kilogram (kg)</SelectItem>
                  <SelectItem value="gram">Gram (g)</SelectItem>
                  <SelectItem value="milligram">Milligram (mg)</SelectItem>
                  <SelectItem value="metric_ton">Metric Ton</SelectItem>
                  <SelectItem value="pound">Pound (lb)</SelectItem>
                  <SelectItem value="ounce">Ounce (oz)</SelectItem>
                  <SelectItem value="ton">Ton</SelectItem>
                  <SelectItem value="stone">Stone</SelectItem>
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
                  <SelectItem value="kilogram">Kilogram (kg)</SelectItem>
                  <SelectItem value="gram">Gram (g)</SelectItem>
                  <SelectItem value="milligram">Milligram (mg)</SelectItem>
                  <SelectItem value="metric_ton">Metric Ton</SelectItem>
                  <SelectItem value="pound">Pound (lb)</SelectItem>
                  <SelectItem value="ounce">Ounce (oz)</SelectItem>
                  <SelectItem value="ton">Ton</SelectItem>
                  <SelectItem value="stone">Stone</SelectItem>
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

export default WeightConverter;
