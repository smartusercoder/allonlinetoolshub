import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function BadgeGenerator() {
  const [label, setLabel] = useState("npm");
  const [value, setValue] = useState("v1.0.0");
  const [color, setColor] = useState("blue");

  const colors = {
    blue: "#007ec6",
    green: "#97ca00",
    red: "#e05d44",
    orange: "#fe7d37",
    yellow: "#dfb317",
    purple: "#9f9f9f"
  };

  const badgeUrl = `https://img.shields.io/badge/${encodeURIComponent(label)}-${encodeURIComponent(value)}-${color}`;
  const markdown = `![${label}](${badgeUrl})`;
  const html = `<img src="${badgeUrl}" alt="${label}">`;

  return (
    <ToolLayout
      title="Badge Generator"
      description="Generate badges for your projects"
    >
      <div className="space-y-6">
        <div>
          <Label>Label</Label>
          <Input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="npm"
          />
        </div>

        <div>
          <Label>Value</Label>
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="v1.0.0"
          />
        </div>

        <div>
          <Label>Color</Label>
          <Select value={color} onValueChange={setColor}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(colors).map(c => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Card className="p-6 space-y-4">
          <div className="text-center">
            <img src={badgeUrl} alt={label} className="inline-block" />
          </div>

          <div>
            <Label>Markdown</Label>
            <Input value={markdown} readOnly />
          </div>

          <div>
            <Label>HTML</Label>
            <Input value={html} readOnly />
          </div>

          <div>
            <Label>URL</Label>
            <Input value={badgeUrl} readOnly />
          </div>
        </Card>
      </div>
    </ToolLayout>
  );
}
