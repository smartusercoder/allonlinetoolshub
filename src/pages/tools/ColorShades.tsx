import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Palette, Copy, Check } from "lucide-react";
import { toast } from "sonner";

const ColorShades = () => {
  const [baseColor, setBaseColor] = useState("#3b82f6");
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
      const hex = Math.round(Math.max(0, Math.min(255, x))).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    }).join('');
  };

  const generateShades = () => {
    const rgb = hexToRgb(baseColor);
    const shades: string[] = [];
    
    // Generate 11 shades from light to dark (50, 100, 200, ..., 900, 950)
    for (let i = 0; i <= 10; i++) {
      const factor = i / 10;
      const r = rgb.r + (0 - rgb.r) * factor;
      const g = rgb.g + (0 - rgb.g) * factor;
      const b = rgb.b + (0 - rgb.b) * factor;
      shades.push(rgbToHex(r, g, b));
    }
    
    return shades.reverse();
  };

  const generateTints = () => {
    const rgb = hexToRgb(baseColor);
    const tints: string[] = [];
    
    for (let i = 0; i <= 10; i++) {
      const factor = i / 10;
      const r = rgb.r + (255 - rgb.r) * factor;
      const g = rgb.g + (255 - rgb.g) * factor;
      const b = rgb.b + (255 - rgb.b) * factor;
      tints.push(rgbToHex(r, g, b));
    }
    
    return tints;
  };

  const shades = generateShades();
  const tints = generateTints();
  const shadeLabels = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];

  const copyToClipboard = (color: string, index: number) => {
    navigator.clipboard.writeText(color);
    setCopiedIndex(index);
    toast.success("Color copied!");
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <ToolLayout
      title="Color Shades Generator"
      description="Generate shades and tints of colors"
    >
      <Card>
        <CardContent className="pt-6 space-y-6">
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

          <div className="space-y-4">
            <h3 className="font-semibold">Tints (Lighter)</h3>
            <div className="grid grid-cols-11 gap-2">
              {tints.map((color, index) => (
                <div key={`tint-${index}`} className="space-y-1">
                  <div
                    className="w-full h-16 rounded border shadow-sm cursor-pointer hover:scale-105 transition-transform"
                    style={{ backgroundColor: color }}
                    onClick={() => copyToClipboard(color, index)}
                  />
                  <code className="text-xs block text-center">{color}</code>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Shades (Tailwind Scale)</h3>
            <div className="grid grid-cols-11 gap-2">
              {shades.map((color, index) => (
                <div key={`shade-${index}`} className="space-y-1">
                  <div
                    className="w-full h-16 rounded border shadow-sm cursor-pointer hover:scale-105 transition-transform"
                    style={{ backgroundColor: color }}
                    onClick={() => copyToClipboard(color, index + 100)}
                  />
                  <div className="text-xs text-center">
                    <div className="font-semibold">{shadeLabels[index]}</div>
                    <code className="text-[10px]">{color}</code>
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

export default ColorShades;
