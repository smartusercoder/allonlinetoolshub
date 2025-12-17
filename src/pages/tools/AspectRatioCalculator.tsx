import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function AspectRatioCalculator() {
  const [width, setWidth] = useState("1920");
  const [height, setHeight] = useState("1080");

  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const calculate = () => {
    const w = parseInt(width);
    const h = parseInt(height);
    const divisor = gcd(w, h);
    
    const ratioW = w / divisor;
    const ratioH = h / divisor;
    const decimal = (w / h).toFixed(2);
    
    const commonRatios: Record<string, string> = {
      '16:9': '1.78',
      '4:3': '1.33',
      '21:9': '2.33',
      '1:1': '1.00',
      '3:2': '1.50',
      '16:10': '1.60'
    };
    
    let match = 'Custom';
    for (const [ratio, value] of Object.entries(commonRatios)) {
      if (Math.abs(parseFloat(value) - parseFloat(decimal)) < 0.01) {
        match = ratio;
        break;
      }
    }

    return {
      ratio: `${ratioW}:${ratioH}`,
      decimal,
      match
    };
  };

  const result = calculate();

  return (
    <ToolLayout title="Aspect Ratio Calculator" description="Calculate image/video aspect ratio">
      <div className="space-y-4">
        <Card className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="width">Width (px)</Label>
              <Input id="width" type="number" value={width} onChange={(e) => setWidth(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Height (px)</Label>
              <Input id="height" type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Aspect Ratio</div>
            <div className="text-2xl font-bold">{result.ratio}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Decimal</div>
            <div className="text-2xl font-bold">{result.decimal}</div>
          </Card>
          <Card className="p-4 bg-primary/10">
            <div className="text-sm text-muted-foreground">Common Format</div>
            <div className="text-2xl font-bold text-primary">{result.match}</div>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
