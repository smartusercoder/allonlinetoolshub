import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

export default function CssTransformGenerator() {
  const [rotate, setRotate] = useState("0");
  const [scaleX, setScaleX] = useState("1");
  const [scaleY, setScaleY] = useState("1");
  const [skewX, setSkewX] = useState("0");
  const [skewY, setSkewY] = useState("0");

  const transform = `rotate(${rotate}deg) scaleX(${scaleX}) scaleY(${scaleY}) skewX(${skewX}deg) skewY(${skewY}deg)`;
  const cssCode = `transform: ${transform};`;

  return (
    <ToolLayout
      title="CSS Transform Generator"
      description="Create CSS transforms visually"
    >
      <div className="space-y-4">
        <Card className="p-12 flex items-center justify-center bg-background">
          <div
            className="w-32 h-32 bg-primary rounded-lg flex items-center justify-center text-white font-bold"
            style={{ transform }}
          >
            Transform
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Rotate: {rotate}°</Label>
              <Input
                type="range"
                min="-180"
                max="180"
                value={rotate}
                onChange={(e) => setRotate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Scale X: {scaleX}</Label>
              <Input
                type="range"
                min="0"
                max="3"
                step="0.1"
                value={scaleX}
                onChange={(e) => setScaleX(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Scale Y: {scaleY}</Label>
              <Input
                type="range"
                min="0"
                max="3"
                step="0.1"
                value={scaleY}
                onChange={(e) => setScaleY(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Skew X: {skewX}°</Label>
              <Input
                type="range"
                min="-45"
                max="45"
                value={skewX}
                onChange={(e) => setSkewX(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Skew Y: {skewY}°</Label>
              <Input
                type="range"
                min="-45"
                max="45"
                value={skewY}
                onChange={(e) => setSkewY(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>CSS Code</Label>
              <Button onClick={() => {
                navigator.clipboard.writeText(cssCode);
                toast.success("Copied!");
              }} size="sm">
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </Button>
            </div>
            <Textarea value={cssCode} readOnly rows={2} className="font-mono" />
          </div>
        </Card>
      </div>
    </ToolLayout>
  );
}
