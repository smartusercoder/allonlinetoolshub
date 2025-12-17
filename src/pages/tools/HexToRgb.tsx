import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UsageGuide } from "@/components/UsageGuide";

const HexToRgb = () => {
  const [hex, setHex] = useState("#3b82f6");

  const hexToRgb = (hexColor: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 };
  };

  const rgb = hexToRgb(hex);

  return (
    <ToolLayout
      title="HEX to RGB Converter"
      description="Convert HEX color codes to RGB values"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Click the color picker or type a HEX code",
            "RGB values appear automatically",
            "See Red, Green, and Blue components (0-255)",
            "View CSS-ready rgb() and rgba() formats"
          ]}
          tips={[
            "HEX format: #RRGGBB (e.g., #3b82f6)",
            "RGB perfect for JavaScript and some CSS",
            "Each color channel ranges from 0-255",
            "Great for color manipulation in code"
          ]}
          example="#3b82f6 → rgb(59, 130, 246)"
        />
      </div>
      <Card className="p-6 space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="hex">HEX Color</Label>
            <div className="flex gap-2">
              <input
                type="color"
                value={hex}
                onChange={(e) => setHex(e.target.value)}
                className="w-12 h-12 rounded cursor-pointer"
              />
              <Input
                id="hex"
                value={hex}
                onChange={(e) => setHex(e.target.value)}
                placeholder="#000000"
              />
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t">
            <h3 className="font-semibold">RGB Values</h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-md text-center">
                <p className="text-xs text-muted-foreground">Red</p>
                <p className="text-xl font-bold">{rgb.r}</p>
              </div>
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-md text-center">
                <p className="text-xs text-muted-foreground">Green</p>
                <p className="text-xl font-bold">{rgb.g}</p>
              </div>
              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-md text-center">
                <p className="text-xs text-muted-foreground">Blue</p>
                <p className="text-xl font-bold">{rgb.b}</p>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-md">
              <p className="text-sm font-medium">CSS Values:</p>
              <p className="font-mono text-sm mt-2">rgb({rgb.r}, {rgb.g}, {rgb.b})</p>
              <p className="font-mono text-sm">rgba({rgb.r}, {rgb.g}, {rgb.b}, 1)</p>
            </div>
          </div>
        </div>
      </Card>
    </ToolLayout>
  );
};

export default HexToRgb;
