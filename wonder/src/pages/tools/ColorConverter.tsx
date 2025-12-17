import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UsageGuide } from "@/components/UsageGuide";

const ColorConverter = () => {
  const [hex, setHex] = useState("#3B82F6");
  const [rgb, setRgb] = useState({ r: 59, g: 130, b: 246 });
  const [hsl, setHsl] = useState({ h: 217, s: 91, l: 60 });
  const { toast } = useToast();

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    }).join("");
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
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

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const updateFromHex = (value: string) => {
    setHex(value);
    const rgbVal = hexToRgb(value);
    if (rgbVal) {
      setRgb(rgbVal);
      setHsl(rgbToHsl(rgbVal.r, rgbVal.g, rgbVal.b));
    }
  };

  const updateFromRgb = (r: number, g: number, b: number) => {
    setRgb({ r, g, b });
    setHex(rgbToHex(r, g, b));
    setHsl(rgbToHsl(r, g, b));
  };

  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied!", description: `${label} copied to clipboard` });
  };

  return (
    <ToolLayout
      title="Color Converter"
      description="Convert between HEX, RGB, and HSL color formats"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Edit the HEX color code or use the color pickers",
            "Change RGB values using the number inputs",
            "All formats update automatically in real-time",
            "Click any Copy button to copy that format to clipboard"
          ]}
          tips={[
            "HEX is commonly used in web design (#3B82F6)",
            "RGB is great for programmatic color manipulation",
            "HSL makes it easy to adjust brightness and saturation",
            "Use the color preview to see your color instantly"
          ]}
          example="#3B82F6 = rgb(59, 130, 246) = hsl(217°, 91%, 60%)"
        />

        <div className="h-32 rounded-lg border-4 border-primary/20" style={{ backgroundColor: hex }} />

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>HEX</Label>
            <Button onClick={() => copy(hex, "HEX")} variant="ghost" size="sm">
              <Copy className="w-4 h-4 mr-1" />
              Copy
            </Button>
          </div>
          <Input
            value={hex}
            onChange={(e) => updateFromHex(e.target.value)}
            className="font-mono"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>RGB</Label>
            <Button onClick={() => copy(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, "RGB")} variant="ghost" size="sm">
              <Copy className="w-4 h-4 mr-1" />
              Copy
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Input
              type="number"
              value={rgb.r}
              onChange={(e) => updateFromRgb(Number(e.target.value), rgb.g, rgb.b)}
              min="0"
              max="255"
              placeholder="R"
            />
            <Input
              type="number"
              value={rgb.g}
              onChange={(e) => updateFromRgb(rgb.r, Number(e.target.value), rgb.b)}
              min="0"
              max="255"
              placeholder="G"
            />
            <Input
              type="number"
              value={rgb.b}
              onChange={(e) => updateFromRgb(rgb.r, rgb.g, Number(e.target.value))}
              min="0"
              max="255"
              placeholder="B"
            />
          </div>
          <div className="text-sm text-muted-foreground font-mono text-center">
            rgb({rgb.r}, {rgb.g}, {rgb.b})
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>HSL</Label>
            <Button onClick={() => copy(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, "HSL")} variant="ghost" size="sm">
              <Copy className="w-4 h-4 mr-1" />
              Copy
            </Button>
          </div>
          <div className="text-sm text-muted-foreground font-mono text-center">
            hsl({hsl.h}°, {hsl.s}%, {hsl.l}%)
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default ColorConverter;