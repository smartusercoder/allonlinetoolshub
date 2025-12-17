import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";

export default function RandomColorGenerator() {
  const [colors, setColors] = useState<string[]>([]);

  const generateColors = () => {
    const newColors = Array.from({ length: 12 }, () =>
      '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
    );
    setColors(newColors);
  };

  if (colors.length === 0) {
    generateColors();
  }

  return (
    <ToolLayout
      title="Random Color Generator"
      description="Generate random colors for your design projects"
    >
      <div className="space-y-4">
        <Button onClick={generateColors} className="w-full">
          <RefreshCw className="mr-2 h-4 w-4" />
          Generate New Colors
        </Button>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {colors.map((color, index) => (
            <Card
              key={index}
              className="p-4 cursor-pointer hover:scale-105 transition-transform"
              onClick={() => navigator.clipboard.writeText(color)}
            >
              <div
                className="w-full h-24 rounded-lg mb-2"
                style={{ backgroundColor: color }}
              />
              <div className="text-center font-mono text-sm">{color}</div>
            </Card>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
