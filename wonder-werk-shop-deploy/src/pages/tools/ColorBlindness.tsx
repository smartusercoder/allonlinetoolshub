import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ColorBlindness = () => {
  const [color, setColor] = useState("#3b82f6");
  const [type, setType] = useState("protanopia");

  const simulateColorBlindness = (hex: string, blindnessType: string) => {
    const hexToRgb = (h: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 0, g: 0, b: 0 };
    };

    const rgbToHex = (r: number, g: number, b: number) => {
      return "#" + [r, g, b].map(x => {
        const hex = Math.round(Math.max(0, Math.min(255, x))).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      }).join('');
    };

    const rgb = hexToRgb(hex);
    let r = rgb.r, g = rgb.g, b = rgb.b;

    switch (blindnessType) {
      case "protanopia": // Red-blind
        r = 0.567 * r + 0.433 * g;
        g = 0.558 * r + 0.442 * g;
        b = 0.242 * g + 0.758 * b;
        break;
      case "deuteranopia": // Green-blind
        r = 0.625 * r + 0.375 * g;
        g = 0.7 * r + 0.3 * g;
        b = 0.3 * g + 0.7 * b;
        break;
      case "tritanopia": // Blue-blind
        r = 0.95 * r + 0.05 * g;
        g = 0.433 * g + 0.567 * b;
        b = 0.475 * g + 0.525 * b;
        break;
      case "achromatopsia": // Total color blindness
        const gray = 0.299 * r + 0.587 * g + 0.114 * b;
        r = g = b = gray;
        break;
    }

    return rgbToHex(r, g, b);
  };

  const types = [
    { value: "normal", label: "Normal Vision", desc: "No color blindness" },
    { value: "protanopia", label: "Protanopia", desc: "Red-blind (1% of males)" },
    { value: "deuteranopia", label: "Deuteranopia", desc: "Green-blind (1% of males)" },
    { value: "tritanopia", label: "Tritanopia", desc: "Blue-blind (rare)" },
    { value: "achromatopsia", label: "Achromatopsia", desc: "Total color blindness (very rare)" }
  ];

  const simulatedColor = type === "normal" ? color : simulateColorBlindness(color, type);

  return (
    <ToolLayout
      title="Color Blindness Simulator"
      description="Simulate how colors appear with different types of color blindness"
    >
      <Card>
        <CardContent className="pt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-20 h-10"
                />
                <Input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  placeholder="#3b82f6"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Color Blindness Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {types.map(t => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Original Color</Label>
              <div
                className="w-full h-40 rounded-lg border shadow-sm"
                style={{ backgroundColor: color }}
              />
              <code className="block text-center font-mono text-sm">{color}</code>
            </div>

            <div className="space-y-2">
              <Label>Simulated Color</Label>
              <div
                className="w-full h-40 rounded-lg border shadow-sm"
                style={{ backgroundColor: simulatedColor }}
              />
              <code className="block text-center font-mono text-sm">{simulatedColor}</code>
            </div>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm font-semibold mb-2">{types.find(t => t.value === type)?.label}</p>
            <p className="text-sm text-muted-foreground">
              {types.find(t => t.value === type)?.desc}
            </p>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Accessibility tip:</strong> Ensure your designs work for all vision types. 
              Use patterns, textures, or labels in addition to color to convey information.
            </p>
          </div>
        </CardContent>
      </Card>
    </ToolLayout>
  );
};

export default ColorBlindness;
