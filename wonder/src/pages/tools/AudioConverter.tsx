import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Music } from "lucide-react";

export default function AudioConverter() {
  return (
    <ToolLayout title="Audio Converter" description="Convert between audio formats">
      <Card className="p-6">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription className="space-y-3">
            <div className="flex items-start gap-2">
              <Music className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
              <div>
                <p className="font-medium mb-2">Audio Transcoding Unavailable</p>
                <p className="text-sm text-muted-foreground">
                  Converting between audio formats requires codec libraries and transcoding capabilities that are not available in browsers.
                </p>
              </div>
            </div>
            <div className="text-sm">
              <p className="font-medium mb-1">Recommended tools:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
                <li>Audacity - Free audio editor with format conversion</li>
                <li>FFmpeg - Command: <code className="bg-muted px-1 rounded">ffmpeg -i input.wav output.mp3</code></li>
                <li>Online-audio-converter.com - Web-based converter</li>
                <li>VLC Media Player - Media → Convert/Save</li>
              </ul>
            </div>
          </AlertDescription>
        </Alert>
      </Card>
    </ToolLayout>
  );
}
