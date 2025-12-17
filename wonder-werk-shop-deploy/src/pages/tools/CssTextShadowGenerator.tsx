import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

export default function CssTextShadowGenerator() {
  const [hOffset, setHOffset] = useState("2");
  const [vOffset, setVOffset] = useState("2");
  const [blur, setBlur] = useState("4");
  const [color, setColor] = useState("#000000");

  const shadow = `${hOffset}px ${vOffset}px ${blur}px ${color}`;
  const cssCode = `text-shadow: ${shadow};`;

  return (
    <ToolLayout
      title="CSS Text Shadow Generator"
      description="Create custom CSS text shadows"
    >
      <div className="space-y-4">
        <Card className="p-12 text-center bg-background">
          <h1 className="text-6xl font-bold" style={{ textShadow: shadow }}>
            Sample Text
          </h1>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Horizontal: {hOffset}px</Label>
              <Input
                type="range"
                min="-20"
                max="20"
                value={hOffset}
                onChange={(e) => setHOffset(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Vertical: {vOffset}px</Label>
              <Input
                type="range"
                min="-20"
                max="20"
                value={vOffset}
                onChange={(e) => setVOffset(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Blur: {blur}px</Label>
              <Input
                type="range"
                min="0"
                max="50"
                value={blur}
                onChange={(e) => setBlur(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-16 h-10"
                />
                <Input
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
              </div>
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
            <Textarea value={cssCode} readOnly rows={1} className="font-mono" />
          </div>
        </Card>
      </div>
    </ToolLayout>
  );
}
