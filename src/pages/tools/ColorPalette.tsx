import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Palette, Copy, Check } from "lucide-react";
import { toast } from "sonner";

const ColorPalette = () => {
  const [baseColor, setBaseColor] = useState("#3b82f6");
  const [scheme, setScheme] = useState("analogous");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + [r, g, b].map(x => {
      const hex = Math.round(x).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    }).join('');
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    } else {
      s = 0;
    }

    return { h: h * 360, s: s * 100, l: l * 100 };
  };

  const hslToRgb = (h: number, s: number, l: number) => {
    h /= 360; s /= 100; l /= 100;
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

    return { r: r * 255, g: g * 255, b: b * 255 };
  };

  const generatePalette = () => {
    const rgb = hexToRgb(baseColor);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    let colors: string[] = [];

    switch (scheme) {
      case "analogous":
        for (let i = -2; i <= 2; i++) {
          const newHue = (hsl.h + i * 30 + 360) % 360;
          const newRgb = hslToRgb(newHue, hsl.s, hsl.l);
          colors.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
        }
        break;
      case "complementary":
        const compRgb = hslToRgb((hsl.h + 180) % 360, hsl.s, hsl.l);
        colors = [baseColor, rgbToHex(compRgb.r, compRgb.g, compRgb.b)];
        break;
      case "triadic":
        for (let i = 0; i < 3; i++) {
          const newHue = (hsl.h + i * 120) % 360;
          const newRgb = hslToRgb(newHue, hsl.s, hsl.l);
          colors.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
        }
        break;
      case "monochromatic":
        for (let i = 20; i <= 80; i += 15) {
          const newRgb = hslToRgb(hsl.h, hsl.s, i);
          colors.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
        }
        break;
    }

    return colors;
  };

  const palette = generatePalette();

  const copyToClipboard = (color: string, index: number) => {
    navigator.clipboard.writeText(color);
    setCopiedIndex(index);
    toast.success("Color copied!");
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <ToolLayout
      title="Color Palette Generator"
      description="Generate color palettes and schemes"
    >
      <Card>
        <CardContent className="pt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Base Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={baseColor}
                  onChange={(e) => setBaseColor(e.target.value)}
                  className="w-20 h-10"
                />
                <Input
                  type="text"
                  value={baseColor}
                  onChange={(e) => setBaseColor(e.target.value)}
                  placeholder="#3b82f6"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Color Scheme</Label>
              <Select value={scheme} onValueChange={setScheme}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="analogous">Analogous</SelectItem>
                  <SelectItem value="complementary">Complementary</SelectItem>
                  <SelectItem value="triadic">Triadic</SelectItem>
                  <SelectItem value="monochromatic">Monochromatic</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Generated Palette</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {palette.map((color, index) => (
                <div key={index} className="space-y-2">
                  <div
                    className="w-full h-24 rounded-lg border shadow-sm cursor-pointer hover:scale-105 transition-transform"
                    style={{ backgroundColor: color }}
                    onClick={() => copyToClipboard(color, index)}
                  />
                  <div className="flex items-center justify-between gap-2">
                    <code className="text-xs font-mono">{color}</code>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => copyToClipboard(color, index)}
                    >
                      {copiedIndex === index ? (
                        <Check className="h-3 w-3 text-green-500" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </ToolLayout>
  );
};

export default ColorPalette;
