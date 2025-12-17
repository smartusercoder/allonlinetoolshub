import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle, Eye } from "lucide-react";

const ColorContrast = () => {
  const [foreground, setForeground] = useState("#000000");
  const [background, setBackground] = useState("#ffffff");

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  const getLuminance = (r: number, g: number, b: number) => {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const getContrastRatio = (fg: string, bg: string) => {
    const rgb1 = hexToRgb(fg);
    const rgb2 = hexToRgb(bg);
    const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
    const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
  };

  const ratio = getContrastRatio(foreground, background);
  const passesAA = ratio >= 4.5;
  const passesAAA = ratio >= 7;
  const passesAALarge = ratio >= 3;

  return (
    <ToolLayout
      title="Color Contrast Checker"
      description="Check color contrast for accessibility (WCAG)"
    >
      <Card>
        <CardContent className="pt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Foreground Color (Text)</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={foreground}
                  onChange={(e) => setForeground(e.target.value)}
                  className="w-20 h-10"
                />
                <Input
                  type="text"
                  value={foreground}
                  onChange={(e) => setForeground(e.target.value)}
                  placeholder="#000000"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Background Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={background}
                  onChange={(e) => setBackground(e.target.value)}
                  className="w-20 h-10"
                />
                <Input
                  type="text"
                  value={background}
                  onChange={(e) => setBackground(e.target.value)}
                  placeholder="#ffffff"
                />
              </div>
            </div>
          </div>

          <div
            className="p-8 rounded-lg border text-center"
            style={{ backgroundColor: background, color: foreground }}
          >
            <p className="text-sm mb-2">Normal Text Sample</p>
            <p className="text-3xl font-bold">Large Text Sample</p>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <p className="text-lg font-semibold mb-4">Contrast Ratio: {ratio.toFixed(2)}:1</p>
            
            <div className="space-y-3">
              <Alert className={passesAA ? "border-green-500" : "border-red-500"}>
                <div className="flex items-center gap-2">
                  {passesAA ? <CheckCircle className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-red-500" />}
                  <AlertDescription>
                    <span className="font-semibold">WCAG AA (Normal Text):</span> {passesAA ? "Pass" : "Fail"} (4.5:1 required)
                  </AlertDescription>
                </div>
              </Alert>

              <Alert className={passesAALarge ? "border-green-500" : "border-red-500"}>
                <div className="flex items-center gap-2">
                  {passesAALarge ? <CheckCircle className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-red-500" />}
                  <AlertDescription>
                    <span className="font-semibold">WCAG AA (Large Text):</span> {passesAALarge ? "Pass" : "Fail"} (3:1 required)
                  </AlertDescription>
                </div>
              </Alert>

              <Alert className={passesAAA ? "border-green-500" : "border-red-500"}>
                <div className="flex items-center gap-2">
                  {passesAAA ? <CheckCircle className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-red-500" />}
                  <AlertDescription>
                    <span className="font-semibold">WCAG AAA (Normal Text):</span> {passesAAA ? "Pass" : "Fail"} (7:1 required)
                  </AlertDescription>
                </div>
              </Alert>
            </div>

            <p className="text-xs text-muted-foreground mt-4">
              * Large text is defined as 18pt+ or 14pt+ bold
            </p>
          </div>
        </CardContent>
      </Card>
    </ToolLayout>
  );
};

export default ColorContrast;
