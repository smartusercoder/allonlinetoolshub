import { useState, useRef } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, Square, Download, Play, Pause } from "lucide-react";
import { toast } from "sonner";

export default function VoiceRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        stream.getTracks().forEach((track) => track.stop());
        toast.success("Recording saved!");
      };

      mediaRecorder.start();
      setIsRecording(true);
      toast.success("Recording started");
    } catch (error) {
      toast.error("Failed to access microphone. Make sure you grant permission.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const downloadRecording = () => {
    if (audioUrl) {
      const a = document.createElement("a");
      a.href = audioUrl;
      a.download = `voice-recording-${Date.now()}.webm`;
      a.click();
    }
  };

  return (
    <ToolLayout title="Voice Recorder" description="Record audio using your microphone">
      <Card className="p-6 space-y-6">
        <div className="flex justify-center gap-4">
          {!isRecording ? (
            <Button onClick={startRecording} size="lg">
              <Mic className="mr-2 h-5 w-5" />
              Start Recording
            </Button>
          ) : (
            <Button onClick={stopRecording} variant="destructive" size="lg">
              <Square className="mr-2 h-5 w-5" />
              Stop Recording
            </Button>
          )}
        </div>

        {isRecording && (
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-destructive/10 text-destructive rounded-lg">
              <span className="animate-pulse w-3 h-3 rounded-full bg-destructive" />
              Recording...
            </div>
          </div>
        )}

        {audioUrl && (
          <div className="space-y-4">
            <audio
              ref={audioRef}
              src={audioUrl}
              onEnded={() => setIsPlaying(false)}
              className="hidden"
            />
            <div className="flex justify-center gap-4">
              <Button onClick={togglePlayback} variant="outline">
                {isPlaying ? (
                  <Pause className="mr-2 h-4 w-4" />
                ) : (
                  <Play className="mr-2 h-4 w-4" />
                )}
                {isPlaying ? "Pause" : "Play"}
              </Button>
              <Button onClick={downloadRecording}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
            <audio src={audioUrl} controls className="w-full" />
          </div>
        )}

        <div className="bg-muted/50 p-4 rounded-lg text-sm text-muted-foreground">
          <p className="font-medium mb-2">Note:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Your browser will ask for microphone permission</li>
            <li>Recording is saved in WebM audio format</li>
            <li>Works best in Chrome and Firefox</li>
          </ul>
        </div>
      </Card>
    </ToolLayout>
  );
}
