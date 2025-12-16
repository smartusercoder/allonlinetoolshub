import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function BorderRadiusGenerator() {
  const [topLeft, setTopLeft] = useState(0);
  const [topRight, setTopRight] = useState(0);
  const [bottomRight, setBottomRight] = useState(0);
  const [bottomLeft, setBottomLeft] = useState(0);
  const { toast } = useToast();

  const radiusCss = `border-radius: ${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px;`;

  const copyRadius = () => {
    navigator.clipboard.writeText(radiusCss);
    toast({
      title: "Copied!",
      description: "CSS border-radius copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="Border Radius Generator"
      description="Generate CSS border-radius values"
    >
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-center p-12 bg-muted rounded-lg">
            <div
              className="w-48 h-48 bg-primary"
              style={{
                borderRadius: `${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px`
              }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium">Top Left: {topLeft}px</label>
              <Input
                type="range"
                min="0"
                max="200"
                value={topLeft}
                onChange={(e) => setTopLeft(parseInt(e.target.value))}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Top Right: {topRight}px</label>
              <Input
                type="range"
                min="0"
                max="200"
                value={topRight}
                onChange={(e) => setTopRight(parseInt(e.target.value))}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Bottom Right: {bottomRight}px</label>
              <Input
                type="range"
                min="0"
                max="200"
                value={bottomRight}
                onChange={(e) => setBottomRight(parseInt(e.target.value))}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Bottom Left: {bottomLeft}px</label>
              <Input
                type="range"
                min="0"
                max="200"
                value={bottomLeft}
                onChange={(e) => setBottomLeft(parseInt(e.target.value))}
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">CSS Code</label>
            <div className="flex gap-2">
              <Input value={radiusCss} readOnly className="font-mono text-sm bg-muted" />
              <Button variant="outline" size="icon" onClick={copyRadius}>
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </ToolLayout>
  );
}
