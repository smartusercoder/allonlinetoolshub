import { useState, useRef } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Gauge } from "lucide-react";
import { toast } from "sonner";

export default function VideoSpeedController() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [speed, setSpeed] = useState<string>("1.0");
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("video/")) {
      toast.error("Please select a valid video file");
      return;
    }

    setVideoFile(file);
    const url = URL.createObjectURL(file);
    setVideoUrl(url);
    toast.success("Video loaded");
  };

  const applySpeed = () => {
    if (videoRef.current) {
      videoRef.current.playbackRate = parseFloat(speed);
      toast.success(`Playback speed set to ${speed}x`);
    }
  };

  return (
    <ToolLayout title="Video Speed Controller" description="Control video playback speed">
      <Card className="p-6 space-y-6">
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
          <input
            type="file"
            accept="video/*"
            onChange={handleFileSelect}
            className="hidden"
            id="video-upload"
          />
          <label htmlFor="video-upload" className="cursor-pointer">
            <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-medium mb-2">Click to upload video</p>
            {videoFile && <p className="text-sm text-primary mt-2">{videoFile.name}</p>}
          </label>
        </div>

        {videoUrl && (
          <>
            <video
              ref={videoRef}
              src={videoUrl}
              controls
              className="w-full rounded-lg"
            />

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Playback Speed</Label>
                <Select value={speed} onValueChange={setSpeed}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0.25">0.25x (Very Slow)</SelectItem>
                    <SelectItem value="0.5">0.5x (Slow)</SelectItem>
                    <SelectItem value="0.75">0.75x</SelectItem>
                    <SelectItem value="1.0">1.0x (Normal)</SelectItem>
                    <SelectItem value="1.25">1.25x</SelectItem>
                    <SelectItem value="1.5">1.5x (Fast)</SelectItem>
                    <SelectItem value="1.75">1.75x</SelectItem>
                    <SelectItem value="2.0">2.0x (Very Fast)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={applySpeed} className="w-full">
                <Gauge className="mr-2 h-4 w-4" />
                Apply Speed
              </Button>
            </div>
          </>
        )}

        <div className="bg-muted/50 p-4 rounded-lg text-sm text-muted-foreground">
          <p className="font-medium mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Upload your video file</li>
            <li>Select desired playback speed</li>
            <li>Click "Apply Speed" to change the playback rate</li>
            <li>Use video controls to play/pause</li>
          </ul>
        </div>
      </Card>
    </ToolLayout>
  );
}
