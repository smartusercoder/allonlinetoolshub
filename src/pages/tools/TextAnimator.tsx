import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TextAnimator() {
  const [text, setText] = useState("Animated Text");
  const [animation, setAnimation] = useState("bounce");

  const animations = [
    { value: "bounce", label: "Bounce" },
    { value: "pulse", label: "Pulse" },
    { value: "shake", label: "Shake" },
    { value: "swing", label: "Swing" },
    { value: "fade", label: "Fade" },
    { value: "slide", label: "Slide" },
  ];

  return (
    <ToolLayout
      title="Text Animator"
      description="Create animated text effects"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Text</Label>
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to animate..."
          />
        </div>

        <div className="space-y-2">
          <Label>Animation Style</Label>
          <Select value={animation} onValueChange={setAnimation}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {animations.map((anim) => (
                <SelectItem key={anim.value} value={anim.value}>
                  {anim.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Card className="p-12 flex items-center justify-center min-h-[200px]">
          <div
            className={`text-4xl font-bold text-primary ${
              animation === "bounce" ? "animate-bounce" : ""
            } ${animation === "pulse" ? "animate-pulse" : ""} ${
              animation === "shake" ? "animate-shake" : ""
            } ${animation === "swing" ? "animate-swing" : ""} ${
              animation === "fade" ? "animate-fade" : ""
            } ${animation === "slide" ? "animate-slide" : ""}`}
          >
            {text}
          </div>
        </Card>

        <div className="text-sm text-muted-foreground space-y-1">
          <p className="font-medium">CSS Class:</p>
          <code className="bg-muted px-2 py-1 rounded block">
            animate-{animation}
          </code>
        </div>
      </div>
    </ToolLayout>
  );
}
