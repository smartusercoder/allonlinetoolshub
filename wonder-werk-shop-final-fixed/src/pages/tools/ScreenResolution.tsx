import { useState, useEffect } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Monitor } from "lucide-react";

const ScreenResolution = () => {
  const [resolution, setResolution] = useState({
    width: 0,
    height: 0,
    availWidth: 0,
    availHeight: 0,
    colorDepth: 0,
    pixelRatio: 0,
  });

  useEffect(() => {
    const updateResolution = () => {
      setResolution({
        width: window.screen.width,
        height: window.screen.height,
        availWidth: window.screen.availWidth,
        availHeight: window.screen.availHeight,
        colorDepth: window.screen.colorDepth,
        pixelRatio: window.devicePixelRatio,
      });
    };

    updateResolution();
    window.addEventListener("resize", updateResolution);
    return () => window.removeEventListener("resize", updateResolution);
  }, []);

  return (
    <ToolLayout
      title="What Is My Screen Resolution"
      description="Check your display resolution and screen properties"
    >
      <div className="space-y-6">
        <Card className="p-8">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
              <Monitor className="w-10 h-10 text-primary" />
            </div>

            <div className="space-y-2">
              <h2 className="text-4xl font-bold">
                {resolution.width} × {resolution.height}
              </h2>
              <p className="text-lg text-muted-foreground">Screen Resolution</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium text-muted-foreground mb-1">Available Width</p>
                <p className="text-2xl font-bold">{resolution.availWidth}px</p>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium text-muted-foreground mb-1">Available Height</p>
                <p className="text-2xl font-bold">{resolution.availHeight}px</p>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium text-muted-foreground mb-1">Color Depth</p>
                <p className="text-2xl font-bold">{resolution.colorDepth}-bit</p>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium text-muted-foreground mb-1">Pixel Ratio</p>
                <p className="text-2xl font-bold">{resolution.pixelRatio}x</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-muted/50">
          <h3 className="font-semibold mb-3">Screen Information</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><strong>Screen Resolution:</strong> Total display dimensions</li>
            <li><strong>Available:</strong> Usable screen space (excludes taskbars)</li>
            <li><strong>Color Depth:</strong> Bits per pixel for color representation</li>
            <li><strong>Pixel Ratio:</strong> Physical vs CSS pixels (for Retina/Hi-DPI displays)</li>
          </ul>
        </Card>
      </div>
    </ToolLayout>
  );
};

export default ScreenResolution;