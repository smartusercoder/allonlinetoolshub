import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

export default function CssBoxShadowGenerator() {
  const [hOffset, setHOffset] = useState("10");
  const [vOffset, setVOffset] = useState("10");
  const [blur, setBlur] = useState("20");
  const [spread, setSpread] = useState("0");
  const [color, setColor] = useState("#000000");
  const [opacity, setOpacity] = useState("0.3");

  const rgbaColor = `rgba(0, 0, 0, ${opacity})`;
  const shadow = `${hOffset}px ${vOffset}px ${blur}px ${spread}px ${rgbaColor}`;
  const cssCode = `box-shadow: ${shadow};`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssCode);
    toast.success("CSS copied to clipboard!");
  };

  return (
    <ToolLayout
      title="CSS Box Shadow Generator"
      description="Create custom CSS box shadows"
    >
      <div className="space-y-4">
        <Card className="p-12 flex items-center justify-center bg-background">
          <div
            className="w-48 h-48 bg-card rounded-lg"
            style={{ boxShadow: shadow }}
          />
        </Card>

        <Card className="p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Horizontal Offset: {hOffset}px</Label>
              <Input
                type="range"
                min="-50"
                max="50"
                value={hOffset}
                onChange={(e) => setHOffset(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Vertical Offset: {vOffset}px</Label>
              <Input
                type="range"
                min="-50"
                max="50"
                value={vOffset}
                onChange={(e) => setVOffset(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Blur: {blur}px</Label>
              <Input
                type="range"
                min="0"
                max="100"
                value={blur}
                onChange={(e) => setBlur(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Spread: {spread}px</Label>
              <Input
                type="range"
                min="-50"
                max="50"
                value={spread}
                onChange={(e) => setSpread(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Opacity: {opacity}</Label>
              <Input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={opacity}
                onChange={(e) => setOpacity(e.target.value)}
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
