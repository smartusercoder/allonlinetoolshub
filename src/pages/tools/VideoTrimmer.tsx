import { useState, useRef } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Upload, Download, Scissors } from "lucide-react";
import { toast } from "sonner";

export default function VideoTrimmer() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [duration, setDuration] = useState<number>(0);
  const [startTime, setStartTime] = useState<number[]>([0]);
  const [endTime, setEndTime] = useState<number[]>([0]);
  const [isTrimming, setIsTrimming] = useState(false);
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

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      const dur = videoRef.current.duration;
      setDuration(dur);
      setEndTime([dur]);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const trimVideo = async () => {
    if (!videoFile) {
      toast.error("Please select a video file");
      return;
    }

    if (startTime[0] >= endTime[0]) {
      toast.error("Start time must be before end time");
      return;
    }

    setIsTrimming(true);
    toast.info("Note: Browser-based trimming creates a new recording. For precise frame-accurate trimming, use desktop software.");

    try {
      const video = videoRef.current;
      if (!video) return;

      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");

      const stream = canvas.captureStream(30);
      
      const audioContext = new AudioContext();
      const audioSource = audioContext.createMediaElementSource(video);
      const destination = audioContext.createMediaStreamDestination();
      audioSource.connect(destination);
      audioSource.connect(audioContext.destination);

      stream.addTrack(destination.stream.getAudioTracks()[0]);

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "video/webm;codecs=vp9",
      });

      const chunks: Blob[] = [];
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `trimmed-${videoFile.name.replace(/\.[^/.]+$/, "")}.webm`;
        a.click();
        URL.revokeObjectURL(url);
        toast.success("Video trimmed and downloaded");
        setIsTrimming(false);
      };

      video.currentTime = startTime[0];
      await new Promise((resolve) => {
        video.onseeked = resolve;
      });

      mediaRecorder.start();
      video.play();

      const drawFrame = () => {
        if (video.currentTime >= endTime[0]) {
          video.pause();
          mediaRecorder.stop();
          return;
        }
        ctx?.drawImage(video, 0, 0);
        requestAnimationFrame(drawFrame);
      };

      drawFrame();
    } catch (error) {
      console.error(error);
      toast.error("Failed to trim video. Try using a different format.");
      setIsTrimming(false);
    }
  };

  return (
    <ToolLayout title="Video Trimmer" description="Trim and cut your video files">
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
            <div className="space-y-4">
              <video
                ref={videoRef}
                src={videoUrl}
                onLoadedMetadata={handleLoadedMetadata}
                controls
                className="w-full rounded-lg"
              />

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Start Time: {formatTime(startTime[0])}</Label>
                  <Slider
                    value={startTime}
                    onValueChange={setStartTime}
                    max={duration}
                    step={0.1}
                  />
                </div>

                <div className="space-y-2">
                  <Label>End Time: {formatTime(endTime[0])}</Label>
                  <Slider
                    value={endTime}
                    onValueChange={setEndTime}
                    max={duration}
                    step={0.1}
                  />
                </div>

                <p className="text-sm text-muted-foreground">
                  Duration: {formatTime(endTime[0] - startTime[0])}
                </p>
              </div>
            </div>

            <Button onClick={trimVideo} disabled={isTrimming} className="w-full">
              <Scissors className="mr-2 h-4 w-4" />
              {isTrimming ? "Trimming..." : "Trim Video"}
            </Button>
          </>
        )}

        <div className="bg-muted/50 p-4 rounded-lg text-sm text-muted-foreground">
          <p className="font-medium mb-2">Note:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Output will be in WebM format</li>
            <li>Browser-based trimming may result in quality loss</li>
            <li>For professional editing, use desktop software</li>
          </ul>
        </div>
      </Card>
    </ToolLayout>
  );
}
