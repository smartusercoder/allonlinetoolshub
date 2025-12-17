import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const ColorMixer = () => {
  const [color1, setColor1] = useState("#ff0000");
  const [color2, setColor2] = useState("#0000ff");
  const [ratio, setRatio] = useState([50]);

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

  const mixColors = () => {
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
    const mix = ratio[0] / 100;

    const r = rgb1.r * (1 - mix) + rgb2.r * mix;
    const g = rgb1.g * (1 - mix) + rgb2.g * mix;
    const b = rgb1.b * (1 - mix) + rgb2.b * mix;

    return rgbToHex(r, g, b);
  };

  const mixedColor = mixColors();

  return (
    <ToolLayout
      title="Color Mixer"
      description="Mix two colors together"
    >
      <Card>
        <CardContent className="pt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Color 1</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={color1}
                  onChange={(e) => setColor1(e.target.value)}
                  className="w-20 h-10"
                />
                <Input
                  type="text"
                  value={color1}
                  onChange={(e) => setColor1(e.target.value)}
                  placeholder="#ff0000"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Color 2</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={color2}
                  onChange={(e) => setColor2(e.target.value)}
                  className="w-20 h-10"
                />
                <Input
                  type="text"
                  value={color2}
                  onChange={(e) => setColor2(e.target.value)}
                  placeholder="#0000ff"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Label>Mix Ratio: {ratio[0]}% Color 2 / {100 - ratio[0]}% Color 1</Label>
            <Slider
              value={ratio}
              onValueChange={setRatio}
              max={100}
              step={1}
            />
          </div>

          <div className="space-y-2">
            <Label>Mixed Result</Label>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="h-24 rounded-lg border" style={{ backgroundColor: color1 }} />
                <code className="text-xs block text-center">{color1}</code>
              </div>
              <div className="space-y-2">
                <div className="h-24 rounded-lg border shadow-lg" style={{ backgroundColor: mixedColor }} />
                <code className="text-xs block text-center font-semibold">{mixedColor}</code>
              </div>
              <div className="space-y-2">
                <div className="h-24 rounded-lg border" style={{ backgroundColor: color2 }} />
                <code className="text-xs block text-center">{color2}</code>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </ToolLayout>
  );
};

export default ColorMixer;
