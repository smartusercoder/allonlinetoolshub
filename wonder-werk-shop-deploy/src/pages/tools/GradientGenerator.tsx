import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UsageGuide } from "@/components/UsageGuide";

export default function GradientGenerator() {
  const [color1, setColor1] = useState("#3b82f6");
  const [color2, setColor2] = useState("#8b5cf6");
  const [direction, setDirection] = useState("to right");
  const { toast } = useToast();

  const gradientCss = `background: linear-gradient(${direction}, ${color1}, ${color2});`;

  const copyGradient = () => {
    navigator.clipboard.writeText(gradientCss);
    toast({
      title: "Copied!",
      description: "CSS gradient copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="CSS Gradient Generator"
      description="Create beautiful CSS gradients"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Choose two colors using the color pickers or hex inputs",
            "Select the gradient direction from the dropdown",
            "Preview the gradient in the large display area",
            "Click Copy to copy the CSS code to your clipboard"
          ]}
          tips={[
            "Use gradients for modern website backgrounds and buttons",
            "Experiment with different directions for unique effects",
            "Copy the CSS code directly into your stylesheets",
            "Try complementary colors for beautiful gradients"
          ]}
          example="linear-gradient(to right, #3b82f6, #8b5cf6)"
        />
      </div>
      <Card className="p-6 mt-6">
        <div className="space-y-6">
          <div
            className="h-48 rounded-lg"
            style={{ background: `linear-gradient(${direction}, ${color1}, ${color2})` }}
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium">Color 1</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={color1}
                  onChange={(e) => setColor1(e.target.value)}
                  className="w-12 h-10 rounded cursor-pointer"
                />
                <Input value={color1} onChange={(e) => setColor1(e.target.value)} />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Color 2</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={color2}
                  onChange={(e) => setColor2(e.target.value)}
                  className="w-12 h-10 rounded cursor-pointer"
                />
                <Input value={color2} onChange={(e) => setColor2(e.target.value)} />
              </div>
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Direction</label>
            <Select value={direction} onValueChange={setDirection}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="to right">Left to Right</SelectItem>
                <SelectItem value="to left">Right to Left</SelectItem>
                <SelectItem value="to bottom">Top to Bottom</SelectItem>
                <SelectItem value="to top">Bottom to Top</SelectItem>
                <SelectItem value="to bottom right">Diagonal ↘</SelectItem>
                <SelectItem value="to bottom left">Diagonal ↙</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">CSS Code</label>
            <div className="flex gap-2">
              <Input value={gradientCss} readOnly className="font-mono text-sm bg-muted" />
              <Button variant="outline" size="icon" onClick={copyGradient}>
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </ToolLayout>
  );
}
