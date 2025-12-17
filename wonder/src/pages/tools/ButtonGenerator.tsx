import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function ButtonGenerator() {
  const [text, setText] = useState("Click Me");
  const [bgColor, setBgColor] = useState("#3b82f6");
  const [textColor, setTextColor] = useState("#ffffff");
  const [borderRadius, setBorderRadius] = useState("8");
  const [padding, setPadding] = useState("12 24");

  const cssCode = `.custom-button {
  background-color: ${bgColor};
  color: ${textColor};
  border: none;
  border-radius: ${borderRadius}px;
  padding: ${padding.split(' ')[0]}px ${padding.split(' ')[1] || padding.split(' ')[0]}px;
  font-size: 16px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.custom-button:hover {
  opacity: 0.8;
}`;

  const htmlCode = `<button class="custom-button">${text}</button>`;

  return (
    <ToolLayout
      title="CSS Button Generator"
      description="Generate custom CSS buttons"
    >
      <div className="space-y-6">
        <div>
          <Label>Button Text</Label>
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
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
              <Input
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
              />
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
              <Input
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Border Radius (px)</Label>
            <Input
              type="number"
              value={borderRadius}
              onChange={(e) => setBorderRadius(e.target.value)}
            />
          </div>

          <div>
            <Label>Padding (vertical horizontal)</Label>
            <Input
              value={padding}
              onChange={(e) => setPadding(e.target.value)}
              placeholder="12 24"
            />
          </div>
        </div>

        <Card className="p-6 space-y-4">
          <div className="text-center py-8">
            <button
              style={{
                backgroundColor: bgColor,
                color: textColor,
                border: "none",
                borderRadius: `${borderRadius}px`,
                padding: `${padding.split(' ')[0]}px ${padding.split(' ')[1] || padding.split(' ')[0]}px`,
                fontSize: "16px",
                cursor: "pointer"
              }}
            >
              {text}
            </button>
          </div>

          <div>
            <Label>CSS Code</Label>
            <Textarea value={cssCode} readOnly rows={12} />
          </div>

          <div>
            <Label>HTML Code</Label>
            <Textarea value={htmlCode} readOnly rows={1} />
          </div>
        </Card>
      </div>
    </ToolLayout>
  );
}
