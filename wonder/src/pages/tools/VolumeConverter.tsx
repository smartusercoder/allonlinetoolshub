import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Box } from "lucide-react";
import { UsageGuide } from "@/components/UsageGuide";

const VolumeConverter = () => {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("liter");
  const [toUnit, setToUnit] = useState("gallon");

  const conversions: { [key: string]: number } = {
    liter: 1,
    milliliter: 1000,
    cubicmeter: 0.001,
    cubiccm: 1000,
    gallon: 0.264172,
    quart: 1.05669,
    pint: 2.11338,
    cup: 4.22675,
    fluidounce: 33.814,
    tablespoon: 67.628,
    teaspoon: 202.884
  };

  const convertVolume = (val: string, from: string, to: string): string => {
    if (!val || isNaN(parseFloat(val))) return "";
    const liters = parseFloat(val) / conversions[from];
    return (liters * conversions[to]).toFixed(6);
  };

  const result = convertVolume(value, fromUnit, toUnit);

  return (
    <ToolLayout
      title="Volume Converter"
      description="Convert between different volume units"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Enter a volume value",
            "Select your starting unit",
            "Choose the conversion target unit",
            "See the converted result"
          ]}
          tips={[
            "Supports metric (liters, mL, cubic meters)",
            "Includes US units (gallons, cups, tablespoons)",
            "Perfect for cooking, chemistry, fuel calculations",
            "1 gallon ≈ 3.785 liters"
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
                  <SelectItem value="liter">Liter (L)</SelectItem>
                  <SelectItem value="milliliter">Milliliter (mL)</SelectItem>
                  <SelectItem value="cubicmeter">Cubic Meter (m³)</SelectItem>
                  <SelectItem value="cubiccm">Cubic Centimeter (cm³)</SelectItem>
                  <SelectItem value="gallon">Gallon</SelectItem>
                  <SelectItem value="quart">Quart</SelectItem>
                  <SelectItem value="pint">Pint</SelectItem>
                  <SelectItem value="cup">Cup</SelectItem>
                  <SelectItem value="fluidounce">Fluid Ounce</SelectItem>
                  <SelectItem value="tablespoon">Tablespoon</SelectItem>
                  <SelectItem value="teaspoon">Teaspoon</SelectItem>
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
                  <SelectItem value="liter">Liter (L)</SelectItem>
                  <SelectItem value="milliliter">Milliliter (mL)</SelectItem>
                  <SelectItem value="cubicmeter">Cubic Meter (m³)</SelectItem>
                  <SelectItem value="cubiccm">Cubic Centimeter (cm³)</SelectItem>
                  <SelectItem value="gallon">Gallon</SelectItem>
                  <SelectItem value="quart">Quart</SelectItem>
                  <SelectItem value="pint">Pint</SelectItem>
                  <SelectItem value="cup">Cup</SelectItem>
                  <SelectItem value="fluidounce">Fluid Ounce</SelectItem>
                  <SelectItem value="tablespoon">Tablespoon</SelectItem>
                  <SelectItem value="teaspoon">Teaspoon</SelectItem>
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

export default VolumeConverter;
