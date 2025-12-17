import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export default function ColorHarmonies() {
  const [baseColor, setBaseColor] = useState("#3b82f6");

  const hexToHsl = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return [h * 360, s * 100, l * 100];
  };

  const hslToHex = (h: number, s: number, l: number) => {
    h /= 360;
    s /= 100;
    l /= 100;

    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    const toHex = (x: number) => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  const [h, s, l] = hexToHsl(baseColor);

  const harmonies = {
    complementary: [hslToHex(h, s, l), hslToHex((h + 180) % 360, s, l)],
    analogous: [hslToHex((h - 30 + 360) % 360, s, l), hslToHex(h, s, l), hslToHex((h + 30) % 360, s, l)],
    triadic: [hslToHex(h, s, l), hslToHex((h + 120) % 360, s, l), hslToHex((h + 240) % 360, s, l)],
    tetradic: [hslToHex(h, s, l), hslToHex((h + 90) % 360, s, l), hslToHex((h + 180) % 360, s, l), hslToHex((h + 270) % 360, s, l)]
  };

  return (
    <ToolLayout
      title="Color Harmonies"
      description="Generate color harmony palettes"
    >
      <div className="space-y-6">
        <div>
          <Label>Base Color</Label>
          <div className="flex gap-2">
            <Input
              type="color"
              value={baseColor}
              onChange={(e) => setBaseColor(e.target.value)}
              className="w-20"
            />
            <Input
              value={baseColor}
              onChange={(e) => setBaseColor(e.target.value)}
            />
          </div>
        </div>

        {Object.entries(harmonies).map(([name, colors]) => (
          <Card key={name} className="p-4">
            <h3 className="font-semibold mb-3 capitalize">{name}</h3>
            <div className="grid grid-cols-4 gap-2">
              {colors.map((color, i) => (
                <div key={i} className="space-y-2">
                  <div
                    className="h-20 rounded border"
                    style={{ backgroundColor: color }}
                  />
                  <div className="text-center text-sm font-mono">{color}</div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </ToolLayout>
  );
}
