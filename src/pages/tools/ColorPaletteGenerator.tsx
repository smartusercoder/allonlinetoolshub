import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shuffle, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ColorPaletteGenerator() {
  const [palette, setPalette] = useState<string[]>([]);
  const [baseColor, setBaseColor] = useState("#3b82f6");
  const { toast } = useToast();

  const generatePalette = () => {
    const colors: string[] = [];
    const base = baseColor;
    
    // Generate complementary, analogous, and triadic colors
    colors.push(base);
    colors.push(adjustColor(base, 180)); // Complementary
    colors.push(adjustColor(base, 30));  // Analogous 1
    colors.push(adjustColor(base, -30)); // Analogous 2
    colors.push(adjustColor(base, 120)); // Triadic 1
    colors.push(adjustColor(base, -120)); // Triadic 2
    
    setPalette(colors);
  };

  const generateRandomPalette = () => {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    setBaseColor(randomColor);
    const colors: string[] = [];
    
    colors.push(randomColor);
    colors.push(adjustColor(randomColor, 180));
    colors.push(adjustColor(randomColor, 30));
    colors.push(adjustColor(randomColor, -30));
    colors.push(adjustColor(randomColor, 120));
    colors.push(adjustColor(randomColor, -120));
    
    setPalette(colors);
  };

  const adjustColor = (hex: string, degrees: number): string => {
    const rgb = hexToRgb(hex);
    if (!rgb) return hex;
    
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    hsl.h = (hsl.h + degrees + 360) % 360;
    
    const newRgb = hslToRgb(hsl.h, hsl.s, hsl.l);
    return rgbToHex(newRgb.r, newRgb.g, newRgb.b);
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgbToHex = (r: number, g: number, b: number): string => {
    return "#" + [r, g, b].map(x => {
      const hex = Math.round(x).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    }).join("");
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
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

    return { h: h * 360, s, l };
  };

  const hslToRgb = (h: number, s: number, l: number) => {
    h /= 360;
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

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    toast({
      title: "Copied!",
      description: `${color} copied to clipboard`,
    });
  };

  return (
    <ToolLayout
      title="Color Palette Generator"
      description="Generate beautiful color palettes and schemes"
    >
      <Card className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="baseColor">Base Color</Label>
            <div className="flex gap-2">
              <Input
                id="baseColor"
                type="color"
                value={baseColor}
                onChange={(e) => setBaseColor(e.target.value)}
                className="w-20 h-10"
              />
              <Input
                type="text"
                value={baseColor}
                onChange={(e) => setBaseColor(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={generatePalette} className="flex-1">
              Generate from Base Color
            </Button>
            <Button onClick={generateRandomPalette} variant="outline" className="flex-1">
              <Shuffle className="w-4 h-4 mr-2" />
              Random Palette
            </Button>
          </div>
        </div>

        {palette.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold">Generated Palette</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {palette.map((color, index) => (
                <Card key={index} className="overflow-hidden">
                  <div
                    className="h-24 w-full"
                    style={{ backgroundColor: color }}
                  />
                  <div className="p-3 space-y-2">
                    <div className="font-mono text-sm">{color}</div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full"
                      onClick={() => copyColor(color)}
                    >
                      <Copy className="w-3 h-3 mr-2" />
                      Copy
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </Card>
    </ToolLayout>
  );
}