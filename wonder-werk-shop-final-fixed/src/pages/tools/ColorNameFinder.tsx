import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Palette } from "lucide-react";

const ColorNameFinder = () => {
  const [color, setColor] = useState("#3b82f6");
  const [colorName, setColorName] = useState("Blue");

  const colorNames: Record<string, string> = {
    "#000000": "Black", "#ffffff": "White", "#ff0000": "Red",
    "#00ff00": "Lime", "#0000ff": "Blue", "#ffff00": "Yellow",
    "#00ffff": "Cyan", "#ff00ff": "Magenta", "#c0c0c0": "Silver",
    "#808080": "Gray", "#800000": "Maroon", "#808000": "Olive",
    "#008000": "Green", "#800080": "Purple", "#008080": "Teal",
    "#000080": "Navy", "#ffa500": "Orange", "#ffc0cb": "Pink",
    "#a52a2a": "Brown", "#f0e68c": "Khaki"
  };

  const findClosestColor = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    let closestName = "Unknown";
    let minDistance = Infinity;

    Object.entries(colorNames).forEach(([nameHex, name]) => {
      const nr = parseInt(nameHex.slice(1, 3), 16);
      const ng = parseInt(nameHex.slice(3, 5), 16);
      const nb = parseInt(nameHex.slice(5, 7), 16);

      const distance = Math.sqrt(
        Math.pow(r - nr, 2) + Math.pow(g - ng, 2) + Math.pow(b - nb, 2)
      );

      if (distance < minDistance) {
        minDistance = distance;
        closestName = name;
      }
    });

    setColorName(closestName);
  };

  const handleColorChange = (value: string) => {
    setColor(value);
    findClosestColor(value);
  };

  return (
    <ToolLayout
      title="Color Name Finder"
      description="Find the name of any color"
    >
      <Card className="p-6 space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="color">Pick a Color</Label>
            <div className="flex gap-4 items-center">
              <input
                id="color"
                type="color"
                value={color}
                onChange={(e) => handleColorChange(e.target.value)}
                className="w-20 h-20 rounded cursor-pointer"
              />
              <div className="flex-1">
                <Input
                  value={color}
                  onChange={(e) => handleColorChange(e.target.value)}
                  placeholder="#000000"
                />
              </div>
            </div>
          </div>

          <div className="p-6 bg-muted rounded-lg text-center">
            <Palette className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
            <p className="text-2xl font-bold">{colorName}</p>
            <p className="text-sm text-muted-foreground mt-1">{color.toUpperCase()}</p>
          </div>

          <div className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
            This tool finds the closest matching color name from common web colors.
          </div>
        </div>
      </Card>
    </ToolLayout>
  );
};

export default ColorNameFinder;
