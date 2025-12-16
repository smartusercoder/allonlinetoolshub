import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

export default function PlaceholderGenerator() {
  const [width, setWidth] = useState(400);
  const [height, setHeight] = useState(300);
  const [bgColor, setBgColor] = useState("#cccccc");
  const [textColor, setTextColor] = useState("#666666");
  const [text, setText] = useState("");

  const placeholderUrl = `https://via.placeholder.com/${width}x${height}/${bgColor.slice(1)}/${textColor.slice(1)}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

  return (
    <ToolLayout
      title="Placeholder Image Generator"
      description="Generate placeholder images for mockups"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Width: {width}px</Label>
            <Slider
              value={[width]}
              onValueChange={(v) => setWidth(v[0])}
              min={50}
              max={1200}
              step={10}
            />
          </div>
          <div>
            <Label>Height: {height}px</Label>
            <Slider
              value={[height]}
              onValueChange={(v) => setHeight(v[0])}
              min={50}
              max={1200}
              step={10}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Background Color</Label>
            <div className="flex gap-2">
              <Input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-16"
              />
              <Input value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
            </div>
          </div>
          <div>
            <Label>Text Color</Label>
            <div className="flex gap-2">
              <Input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="w-16"
              />
              <Input value={textColor} onChange={(e) => setTextColor(e.target.value)} />
            </div>
          </div>
        </div>

        <div>
          <Label>Custom Text (optional)</Label>
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Leave empty for dimensions"
          />
        </div>

        <Card className="p-6">
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded flex items-center justify-center">
              <img src={placeholderUrl} alt="Placeholder" className="max-w-full" />
            </div>
            
            <div>
              <Label>URL</Label>
              <Input value={placeholderUrl} readOnly />
            </div>
          </div>
        </Card>
      </div>
    </ToolLayout>
  );
}
