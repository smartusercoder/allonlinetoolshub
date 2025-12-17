import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

export default function CssGradientGenerator() {
  const [color1, setColor1] = useState("#667eea");
  const [color2, setColor2] = useState("#764ba2");
  const [angle, setAngle] = useState("135");

  const gradient = `linear-gradient(${angle}deg, ${color1}, ${color2})`;
  const cssCode = `background: ${gradient};`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssCode);
    toast.success("CSS copied to clipboard!");
  };

  return (
    <ToolLayout
      title="CSS Gradient Generator"
      description="Create beautiful CSS gradients visually"
    >
      <div className="space-y-4">
        <Card
          className="w-full h-48 rounded-lg"
          style={{ background: gradient }}
        />

        <Card className="p-6 space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="color1">Color 1</Label>
              <div className="flex gap-2">
                <Input
                  id="color1"
                  type="color"
                  value={color1}
                  onChange={(e) => setColor1(e.target.value)}
                  className="w-16 h-10"
                />
                <Input
                  value={color1}
                  onChange={(e) => setColor1(e.target.value)}
                  placeholder="#667eea"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="color2">Color 2</Label>
              <div className="flex gap-2">
                <Input
                  id="color2"
                  type="color"
                  value={color2}
                  onChange={(e) => setColor2(e.target.value)}
                  className="w-16 h-10"
                />
                <Input
                  value={color2}
                  onChange={(e) => setColor2(e.target.value)}
                  placeholder="#764ba2"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="angle">Angle ({angle}°)</Label>
              <Input
                id="angle"
                type="range"
                min="0"
                max="360"
                value={angle}
                onChange={(e) => setAngle(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>CSS Code</Label>
              <Button onClick={copyToClipboard} size="sm">
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
