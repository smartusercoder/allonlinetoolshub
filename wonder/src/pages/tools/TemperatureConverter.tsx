import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UsageGuide } from "@/components/UsageGuide";

const TemperatureConverter = () => {
  const [value, setValue] = useState("");
  const [from, setFrom] = useState("celsius");
  const [to, setTo] = useState("fahrenheit");

  const convert = () => {
    if (!value || isNaN(Number(value))) return "";

    const num = Number(value);
    let celsius = num;

    // Convert to Celsius first
    switch (from) {
      case "fahrenheit":
        celsius = (num - 32) * 5/9;
        break;
      case "kelvin":
        celsius = num - 273.15;
        break;
    }

    // Convert from Celsius to target
    switch (to) {
      case "celsius":
        return celsius.toFixed(2);
      case "fahrenheit":
        return ((celsius * 9/5) + 32).toFixed(2);
      case "kelvin":
        return (celsius + 273.15).toFixed(2);
      default:
        return "";
    }
  };

  const result = convert();

  return (
    <ToolLayout
      title="Temperature Converter"
      description="Convert between Celsius, Fahrenheit, and Kelvin"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Enter the temperature value you want to convert",
            "Select the source unit (From)",
            "Select the target unit (To)",
            "The converted value appears instantly below"
          ]}
          tips={[
            "0°C = 32°F = freezing point of water",
            "100°C = 212°F = boiling point of water",
            "Kelvin is used in scientific calculations",
            "Quick conversions update as you type"
          ]}
          example="25°C = 77°F = 298.15K"
        />
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Value</Label>
            <Input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter temperature..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>From</Label>
              <Select value={from} onValueChange={setFrom}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="celsius">Celsius (°C)</SelectItem>
                  <SelectItem value="fahrenheit">Fahrenheit (°F)</SelectItem>
                  <SelectItem value="kelvin">Kelvin (K)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>To</Label>
              <Select value={to} onValueChange={setTo}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="celsius">Celsius (°C)</SelectItem>
                  <SelectItem value="fahrenheit">Fahrenheit (°F)</SelectItem>
                  <SelectItem value="kelvin">Kelvin (K)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {result && (
            <div className="p-6 bg-primary/5 border-2 border-primary/20 rounded-lg text-center">
              <div className="text-4xl font-bold text-primary">{result}</div>
              <div className="text-muted-foreground mt-2">
                {to === "celsius" && "°C"}
                {to === "fahrenheit" && "°F"}
                {to === "kelvin" && "K"}
              </div>
            </div>
          )}

          <div className="text-sm text-muted-foreground space-y-1">
            <p><strong>Quick reference:</strong></p>
            <p>Water freezes: 0°C = 32°F = 273.15K</p>
            <p>Water boils: 100°C = 212°F = 373.15K</p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default TemperatureConverter;