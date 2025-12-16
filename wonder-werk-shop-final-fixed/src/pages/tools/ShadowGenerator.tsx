import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ShadowGenerator() {
  const [hOffset, setHOffset] = useState(0);
  const [vOffset, setVOffset] = useState(4);
  const [blur, setBlur] = useState(6);
  const [spread, setSpread] = useState(0);
  const [color, setColor] = useState("#000000");
  const [opacity, setOpacity] = useState(0.1);
  const { toast } = useToast();

  const rgbaColor = `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, ${opacity})`;
  const shadowCss = `box-shadow: ${hOffset}px ${vOffset}px ${blur}px ${spread}px ${rgbaColor};`;

  const copyShadow = () => {
    navigator.clipboard.writeText(shadowCss);
    toast({
      title: "Copied!",
      description: "CSS shadow copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="CSS Shadow Generator"
      description="Generate CSS box shadows"
    >
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-center p-12 bg-muted rounded-lg">
            <div
              className="w-48 h-32 bg-background rounded-lg"
              style={{ boxShadow: `${hOffset}px ${vOffset}px ${blur}px ${spread}px ${rgbaColor}` }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium">Horizontal Offset: {hOffset}px</label>
              <Input
                type="range"
                min="-50"
                max="50"
                value={hOffset}
                onChange={(e) => setHOffset(parseInt(e.target.value))}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Vertical Offset: {vOffset}px</label>
              <Input
                type="range"
                min="-50"
                max="50"
                value={vOffset}
                onChange={(e) => setVOffset(parseInt(e.target.value))}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Blur: {blur}px</label>
              <Input
                type="range"
                min="0"
                max="100"
                value={blur}
                onChange={(e) => setBlur(parseInt(e.target.value))}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Spread: {spread}px</label>
              <Input
                type="range"
                min="-50"
                max="50"
                value={spread}
                onChange={(e) => setSpread(parseInt(e.target.value))}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-12 h-10 rounded cursor-pointer"
                />
                <Input value={color} onChange={(e) => setColor(e.target.value)} />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Opacity: {opacity}</label>
              <Input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={opacity}
                onChange={(e) => setOpacity(parseFloat(e.target.value))}
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">CSS Code</label>
            <div className="flex gap-2">
              <Input value={shadowCss} readOnly className="font-mono text-sm bg-muted" />
              <Button variant="outline" size="icon" onClick={copyShadow}>
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </ToolLayout>
  );
}
