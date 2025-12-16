import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

export default function CssAnimationGenerator() {
  const [animation, setAnimation] = useState("fadeIn");
  const [duration, setDuration] = useState("1s");
  const [timing, setTiming] = useState("ease");

  const animations = {
    fadeIn: "@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }",
    slideIn: "@keyframes slideIn { from { transform: translateX(-100%); } to { transform: translateX(0); } }",
    bounce: "@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }",
    rotate: "@keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }",
    pulse: "@keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }"
  };

  const cssCode = `${animations[animation as keyof typeof animations]}\n\n.animated {\n  animation: ${animation} ${duration} ${timing};\n}`;

  return (
    <ToolLayout
      title="CSS Animation Generator"
      description="Create CSS animations with ease"
    >
      <div className="space-y-4">
        <Card className="p-12 flex items-center justify-center bg-background">
          <div
            className="w-24 h-24 bg-primary rounded-lg"
            style={{ animation: `${animation} ${duration} ${timing} infinite` }}
          />
        </Card>

        <Card className="p-6 space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Animation</Label>
              <Select value={animation} onValueChange={setAnimation}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fadeIn">Fade In</SelectItem>
                  <SelectItem value="slideIn">Slide In</SelectItem>
                  <SelectItem value="bounce">Bounce</SelectItem>
                  <SelectItem value="rotate">Rotate</SelectItem>
                  <SelectItem value="pulse">Pulse</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Duration</Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0.5s">0.5s</SelectItem>
                  <SelectItem value="1s">1s</SelectItem>
                  <SelectItem value="2s">2s</SelectItem>
                  <SelectItem value="3s">3s</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Timing</Label>
              <Select value={timing} onValueChange={setTiming}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ease">Ease</SelectItem>
                  <SelectItem value="linear">Linear</SelectItem>
                  <SelectItem value="ease-in">Ease In</SelectItem>
                  <SelectItem value="ease-out">Ease Out</SelectItem>
                  <SelectItem value="ease-in-out">Ease In Out</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>CSS Code</Label>
              <Button onClick={() => {
                navigator.clipboard.writeText(cssCode);
                toast.success("Copied!");
              }} size="sm">
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </Button>
            </div>
            <Textarea value={cssCode} readOnly rows={8} className="font-mono text-xs" />
          </div>
        </Card>
      </div>
    </ToolLayout>
  );
}
