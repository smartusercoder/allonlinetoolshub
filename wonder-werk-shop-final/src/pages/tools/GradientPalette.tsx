import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

const GradientPalette = () => {
  const [color1, setColor1] = useState("#667eea");
  const [color2, setColor2] = useState("#764ba2");
  const [steps, setSteps] = useState("5");
  const [copied, setCopied] = useState<number | null>(null);

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

  const generateGradient = () => {
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
    const numSteps = parseInt(steps) || 5;
    const colors: string[] = [];

    for (let i = 0; i < numSteps; i++) {
      const ratio = i / (numSteps - 1);
      const r = rgb1.r + (rgb2.r - rgb1.r) * ratio;
      const g = rgb1.g + (rgb2.g - rgb1.g) * ratio;
      const b = rgb1.b + (rgb2.b - rgb1.b) * ratio;
      colors.push(rgbToHex(r, g, b));
    }

    return colors;
  };

  const palette = generateGradient();

  const copyColor = (color: string, index: number) => {
    navigator.clipboard.writeText(color);
    setCopied(index);
    toast.success("Color copied!");
    setTimeout(() => setCopied(null), 2000);
  };

  const copyCss = () => {
    const css = `background: linear-gradient(135deg, ${palette.join(", ")});`;
    navigator.clipboard.writeText(css);
    toast.success("CSS copied!");
  };

  return (
    <ToolLayout
      title="Gradient Palette Generator"
      description="Create gradient color palettes"
    >
      <Card>
        <CardContent className="pt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Start Color</Label>
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
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>End Color</Label>
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
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Steps</Label>
              <Input
                type="number"
                value={steps}
                onChange={(e) => setSteps(e.target.value)}
                min="2"
                max="20"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div
              className="w-full h-32 rounded-lg shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${palette.join(", ")})`
              }}
            />

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {palette.map((color, index) => (
                <div key={index} className="space-y-2">
                  <div
                    className="w-full h-20 rounded-lg border shadow-sm cursor-pointer hover:scale-105 transition-transform"
                    style={{ backgroundColor: color }}
                    onClick={() => copyColor(color, index)}
                  />
                  <div className="flex items-center justify-between gap-1">
                    <code className="text-xs font-mono">{color}</code>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => copyColor(color, index)}
                    >
                      {copied === index ? (
                        <Check className="h-3 w-3 text-green-500" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <Button onClick={copyCss} variant="outline" className="w-full">
              <Copy className="mr-2 h-4 w-4" />
              Copy CSS Gradient
            </Button>
          </div>
        </CardContent>
      </Card>
    </ToolLayout>
  );
};

export default GradientPalette;
