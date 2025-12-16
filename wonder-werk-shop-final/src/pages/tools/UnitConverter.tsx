import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UsageGuide } from "@/components/UsageGuide";

const UnitConverter = () => {
  const [lengthValue, setLengthValue] = useState("1");
  const [lengthFrom, setLengthFrom] = useState("meters");
  const [lengthTo, setLengthTo] = useState("feet");

  const [weightValue, setWeightValue] = useState("1");
  const [weightFrom, setWeightFrom] = useState("kilograms");
  const [weightTo, setWeightTo] = useState("pounds");

  const lengthUnits = {
    meters: 1,
    kilometers: 1000,
    centimeters: 0.01,
    millimeters: 0.001,
    miles: 1609.34,
    yards: 0.9144,
    feet: 0.3048,
    inches: 0.0254,
  };

  const weightUnits = {
    kilograms: 1,
    grams: 0.001,
    milligrams: 0.000001,
    pounds: 0.453592,
    ounces: 0.0283495,
    tons: 1000,
  };

  const convertLength = (value: string, from: string, to: string) => {
    const num = parseFloat(value);
    if (isNaN(num)) return "0";
    const meters = num * lengthUnits[from as keyof typeof lengthUnits];
    const result = meters / lengthUnits[to as keyof typeof lengthUnits];
    return result.toFixed(6).replace(/\.?0+$/, '');
  };

  const convertWeight = (value: string, from: string, to: string) => {
    const num = parseFloat(value);
    if (isNaN(num)) return "0";
    const kg = num * weightUnits[from as keyof typeof weightUnits];
    const result = kg / weightUnits[to as keyof typeof weightUnits];
    return result.toFixed(6).replace(/\.?0+$/, '');
  };

  return (
    <ToolLayout
      title="Unit Converter"
      description="Convert between different units of measurement"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Choose between Length or Weight tab",
            "Enter a value in the \"From\" field",
            "Select the source unit from the dropdown",
            "Select the target unit - conversion happens instantly"
          ]}
          tips={[
            "Great for cooking (cups to grams), travel (miles to km)",
            "Supports metric and imperial systems",
            "Results update automatically as you type",
            "Perfect for everyday conversions"
          ]}
        />
      </div>
      <Tabs defaultValue="length" className="w-full mt-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="length">Length</TabsTrigger>
          <TabsTrigger value="weight">Weight</TabsTrigger>
        </TabsList>

        <TabsContent value="length" className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">From</label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={lengthValue}
                  onChange={(e) => setLengthValue(e.target.value)}
                  className="flex-1"
                />
                <Select value={lengthFrom} onValueChange={setLengthFrom}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(lengthUnits).map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">To</label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={convertLength(lengthValue, lengthFrom, lengthTo)}
                  readOnly
                  className="flex-1 bg-muted/30"
                />
                <Select value={lengthTo} onValueChange={setLengthTo}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(lengthUnits).map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="weight" className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">From</label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={weightValue}
                  onChange={(e) => setWeightValue(e.target.value)}
                  className="flex-1"
                />
                <Select value={weightFrom} onValueChange={setWeightFrom}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(weightUnits).map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">To</label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={convertWeight(weightValue, weightFrom, weightTo)}
                  readOnly
                  className="flex-1 bg-muted/30"
                />
                <Select value={weightTo} onValueChange={setWeightTo}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(weightUnits).map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </ToolLayout>
  );
};

export default UnitConverter;
