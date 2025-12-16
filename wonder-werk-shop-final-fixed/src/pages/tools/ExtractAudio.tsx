import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Music } from "lucide-react";

export default function ExtractAudio() {
  return (
    <ToolLayout title="Extract Audio from Video" description="Extract audio track from video files">
      <Card className="p-6">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription className="space-y-3">
            <div className="flex items-start gap-2">
              <Music className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
              <div>
                <p className="font-medium mb-2">Media Processing Unavailable</p>
                <p className="text-sm text-muted-foreground">
                  Extracting audio from video requires demuxing and transcoding capabilities that are best handled by specialized tools.
                </p>
              </div>
            </div>
            <div className="text-sm">
              <p className="font-medium mb-1">Recommended tools:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
                <li>VLC Media Player - Media → Convert/Save</li>
                <li>FFmpeg - Command: <code className="bg-muted px-1 rounded">ffmpeg -i video.mp4 audio.mp3</code></li>
                <li>Audacity - Free audio editor with import capabilities</li>
                <li>Online-audio-converter.com - Web-based converter</li>
              </ul>
            </div>
          </AlertDescription>
        </Alert>
      </Card>
    </ToolLayout>
  );
}
