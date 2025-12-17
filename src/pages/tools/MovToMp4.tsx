import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Film } from "lucide-react";

export default function MovToMp4() {
  return (
    <ToolLayout title="MOV to MP4" description="Convert MOV videos to MP4 format">
      <Card className="p-6">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription className="space-y-3">
            <div className="flex items-start gap-2">
              <Film className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
              <div>
                <p className="font-medium mb-2">Video Transcoding Unavailable</p>
                <p className="text-sm text-muted-foreground">
                  Converting video formats requires codec transcoding which is computationally intensive and not practical in browsers.
                </p>
              </div>
            </div>
            <div className="text-sm">
              <p className="font-medium mb-1">Recommended tools:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
                <li>HandBrake - Free, open-source video transcoder</li>
                <li>VLC Media Player - Can convert video formats</li>
                <li>FFmpeg - Command: <code className="bg-muted px-1 rounded">ffmpeg -i input.mov output.mp4</code></li>
                <li>CloudConvert - Online video converter</li>
              </ul>
            </div>
          </AlertDescription>
        </Alert>
      </Card>
    </ToolLayout>
  );
}
