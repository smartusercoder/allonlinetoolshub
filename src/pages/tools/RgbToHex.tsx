import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UsageGuide } from "@/components/UsageGuide";

const RgbToHex = () => {
  const [r, setR] = useState("255");
  const [g, setG] = useState("0");
  const [b, setB] = useState("0");
  const [hex, setHex] = useState("");
  const { toast } = useToast();

  const componentToHex = (c: number) => {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  const convert = () => {
    const red = parseInt(r) || 0;
    const green = parseInt(g) || 0;
    const blue = parseInt(b) || 0;

    if (red < 0 || red > 255 || green < 0 || green > 255 || blue < 0 || blue > 255) {
      toast({
        title: "Error",
        description: "RGB values must be between 0 and 255",
        variant: "destructive",
      });
      return;
    }

    const hexColor = "#" + componentToHex(red) + componentToHex(green) + componentToHex(blue);
    setHex(hexColor.toUpperCase());
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(hex);
    toast({
      title: "Copied!",
      description: "HEX color copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="RGB to HEX Converter"
      description="Convert RGB color values to HEX format"
    >
      <UsageGuide
        steps={[
          "Enter Red, Green, Blue values (0-255)",
          "Click \"Convert to HEX\"",
          "HEX color code appears with preview",
          "Copy the HEX code for use in CSS"
        ]}
        tips={[
          "Each RGB value must be 0-255",
          "HEX format is perfect for CSS and HTML",
          "Color preview shows the result",
          "RGB(255, 0, 0) = Red"
        ]}
        example="rgb(255, 0, 0) → #FF0000"
      />
      <div className="space-y-6 mt-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Red (0-255)</label>
                <Input
                  type="number"
                  value={r}
                  onChange={(e) => setR(e.target.value)}
                  min="0"
                  max="255"
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Green (0-255)</label>
                <Input
                  type="number"
                  value={g}
                  onChange={(e) => setG(e.target.value)}
                  min="0"
                  max="255"
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Blue (0-255)</label>
                <Input
                  type="number"
                  value={b}
                  onChange={(e) => setB(e.target.value)}
                  min="0"
                  max="255"
                  className="w-full"
                />
              </div>
            </div>

            <Button onClick={convert} className="w-full">
              Convert to HEX
            </Button>

            {hex && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">HEX Color</label>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <div className="flex items-center gap-4">
                  <div
                    className="w-20 h-20 rounded-lg border-2 border-border"
                    style={{ backgroundColor: hex }}
                  />
                  <div className="flex-1 p-4 bg-muted rounded-lg">
                    <p className="text-2xl font-mono font-bold">{hex}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      RGB({r}, {g}, {b})
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6 bg-muted/50">
          <h3 className="font-semibold mb-3">Examples</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>RGB(255, 0, 0) → #FF0000 (Red)</li>
            <li>RGB(0, 255, 0) → #00FF00 (Green)</li>
            <li>RGB(0, 0, 255) → #0000FF (Blue)</li>
            <li>RGB(255, 255, 255) → #FFFFFF (White)</li>
          </ul>
        </Card>
      </div>
    </ToolLayout>
  );
};

export default RgbToHex;