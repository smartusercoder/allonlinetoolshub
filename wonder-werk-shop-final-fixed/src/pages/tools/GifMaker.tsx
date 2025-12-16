import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Image } from "lucide-react";

export default function GifMaker() {
  return (
    <ToolLayout title="GIF Maker" description="Create animated GIFs from videos">
      <Card className="p-6">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription className="space-y-3">
            <div className="flex items-start gap-2">
              <Image className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
              <div>
                <p className="font-medium mb-2">Video Processing Unavailable</p>
                <p className="text-sm text-muted-foreground">
                  Creating GIFs from videos requires frame extraction and encoding which is computationally intensive for browsers.
                </p>
              </div>
            </div>
            <div className="text-sm">
              <p className="font-medium mb-1">Recommended tools:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
                <li>GIPHY - Online GIF maker and editor</li>
                <li>ezgif.com - Simple online GIF creator</li>
                <li>FFmpeg - Command: <code className="bg-muted px-1 rounded">ffmpeg -i video.mp4 output.gif</code></li>
                <li>Photoshop - Professional GIF creation</li>
              </ul>
            </div>
          </AlertDescription>
        </Alert>
      </Card>
    </ToolLayout>
  );
}
