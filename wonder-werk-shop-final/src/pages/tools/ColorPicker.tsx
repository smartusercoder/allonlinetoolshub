import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UsageGuide } from "@/components/UsageGuide";
import { toolFAQs } from "@/data/faqData";

const ColorPicker = () => {
  const [color, setColor] = useState("#00bcd4");
  const { toast } = useToast();

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})`
      : "";
  };

  const hexToHsl = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return "";
    
    let r = parseInt(result[1], 16) / 255;
    let g = parseInt(result[2], 16) / 255;
    let b = parseInt(result[3], 16) / 255;

    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  };

  const handleCopy = (text: string, format: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${format} copied to clipboard`,
    });
  };

  const formats = [
    { name: "HEX", value: color },
    { name: "RGB", value: hexToRgb(color) },
    { name: "HSL", value: hexToHsl(color) },
  ];

  return (
    <ToolLayout
      title="Color Picker"
      description="Pick colors and convert between formats"
      keywords={["color picker", "hex color", "rgb color", "color selector", "color code generator"]}
      category="DesignTools"
      faqs={toolFAQs["color-picker"]}
      howToSteps={[
        {
          name: "Select Color",
          text: "Click on the color picker box to open the color selector. Choose your desired color by clicking on the color spectrum or entering a specific hex value."
        },
        {
          name: "View Color Codes",
          text: "Once you select a color, you'll instantly see the color values in HEX, RGB, and HSL formats displayed below the picker."
        },
        {
          name: "Copy Color Code",
          text: "Click the copy button next to any format (HEX, RGB, or HSL) to copy that color code to your clipboard for use in your design projects."
        },
        {
          name: "Use in Your Project",
          text: "Paste the copied color code into your CSS, design software, or any application that accepts color values. Each format works with different tools and use cases."
        }
      ]}
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Click the color input to open the color picker",
            "Select your desired color",
            "View the color in HEX, RGB, and HSL formats",
            "Click copy buttons to copy any format",
            "Explore color harmonies below"
          ]}
          tips={[
            "HEX is most common for CSS (#00bcd4)",
            "RGB great for JavaScript (rgb(0, 188, 212))",
            "HSL useful for color adjustments",
            "Color harmonies show complementary colors",
            "Click harmony colors to select them"
          ]}
        />
        <div className="flex flex-col items-center gap-4">
          <div 
            className="w-64 h-64 rounded-2xl border-4 border-border shadow-lg transition-all"
            style={{ backgroundColor: color }}
          />
          <Input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-32 h-12 cursor-pointer"
          />
        </div>

        <div className="space-y-3">
          {formats.map((format) => (
            <div
              key={format.name}
              className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
            >
              <div>
                <p className="text-sm font-medium text-muted-foreground">{format.name}</p>
                <p className="text-lg font-mono">{format.value}</p>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleCopy(format.value, format.name)}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>

        <div>
          <h4 className="font-semibold mb-3">Color Harmonies</h4>
          <div className="grid grid-cols-5 gap-2">
            {[0, 30, 60, 180, 210].map((offset) => {
              const hsl = hexToHsl(color).match(/\d+/g);
              if (!hsl) return null;
              const newHue = (parseInt(hsl[0]) + offset) % 360;
              const harmonyColor = `hsl(${newHue}, ${hsl[1]}%, ${hsl[2]}%)`;
              return (
                <div
                  key={offset}
                  className="aspect-square rounded-lg border-2 border-border cursor-pointer hover:scale-110 transition-transform"
                  style={{ backgroundColor: harmonyColor }}
                  onClick={() => {
                    const rgb = harmonyColor.match(/\d+/g);
                    if (rgb) {
                      const hex = `#${parseInt(rgb[0]).toString(16).padStart(2, '0')}${parseInt(rgb[1]).toString(16).padStart(2, '0')}${parseInt(rgb[2]).toString(16).padStart(2, '0')}`;
                      setColor(hex);
                    }
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default ColorPicker;
