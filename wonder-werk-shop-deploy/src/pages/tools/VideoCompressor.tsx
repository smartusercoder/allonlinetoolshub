import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Minimize2 } from "lucide-react";

export default function VideoCompressor() {
  return (
    <ToolLayout title="Video Compressor" description="Reduce video file size">
      <Card className="p-6">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription className="space-y-3">
            <div className="flex items-start gap-2">
              <Minimize2 className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
              <div>
                <p className="font-medium mb-2">Video Compression Unavailable</p>
                <p className="text-sm text-muted-foreground">
                  Video compression requires complex codec operations and is computationally intensive, making it impractical for browser-based tools.
                </p>
              </div>
            </div>
            <div className="text-sm">
              <p className="font-medium mb-1">Recommended tools:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
                <li>HandBrake - Free video transcoder with compression presets</li>
                <li>FFmpeg - Command: <code className="bg-muted px-1 rounded">ffmpeg -i input.mp4 -crf 23 output.mp4</code></li>
                <li>Clipchamp - Online video editor with compression</li>
                <li>Adobe Media Encoder - Professional compression tool</li>
              </ul>
            </div>
          </AlertDescription>
        </Alert>
      </Card>
    </ToolLayout>
  );
}
