import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Palette } from "lucide-react";

export default function ImageColorize() {
  return (
    <ToolLayout
      title="Colorize Photo"
      description="Add color to black and white photos"
    >
      <Card className="p-6">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription className="space-y-3">
            <div className="flex items-start gap-2">
              <Palette className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
              <div>
                <p className="font-medium mb-2">AI Colorization Not Available</p>
                <p className="text-sm text-muted-foreground">
                  Automatic photo colorization requires advanced AI models that are too large for browser-based processing.
                </p>
              </div>
            </div>
            <div className="text-sm">
              <p className="font-medium mb-1">Recommended services:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
                <li>DeOldify - Open-source AI colorization</li>
                <li>Palette.fm - Online AI colorization service</li>
                <li>MyHeritage In Color - Photo colorization tool</li>
                <li>Photoshop Neural Filters - Professional colorization</li>
              </ul>
            </div>
          </AlertDescription>
        </Alert>
      </Card>
    </ToolLayout>
  );
}
