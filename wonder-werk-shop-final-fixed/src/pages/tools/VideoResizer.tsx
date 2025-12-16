import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Maximize2 } from "lucide-react";

export default function VideoResizer() {
  return (
    <ToolLayout title="Video Resizer" description="Change video dimensions and resolution">
      <Card className="p-6">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription className="space-y-3">
            <div className="flex items-start gap-2">
              <Maximize2 className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
              <div>
                <p className="font-medium mb-2">Video Resizing Unavailable</p>
                <p className="text-sm text-muted-foreground">
                  Resizing videos requires re-encoding with different dimensions, which is computationally intensive and not practical in browsers.
                </p>
              </div>
            </div>
            <div className="text-sm">
              <p className="font-medium mb-1">Recommended tools:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
                <li>HandBrake - Set custom dimensions in video settings</li>
                <li>FFmpeg - Command: <code className="bg-muted px-1 rounded">ffmpeg -i input.mp4 -s 1920x1080 output.mp4</code></li>
                <li>Clipchamp - Online video editor</li>
                <li>iMovie or Adobe Premiere - Professional editors</li>
              </ul>
            </div>
          </AlertDescription>
        </Alert>
      </Card>
    </ToolLayout>
  );
}
