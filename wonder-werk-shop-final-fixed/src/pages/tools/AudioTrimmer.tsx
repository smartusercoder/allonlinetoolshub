import { useState, useRef } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Upload, Download, Scissors } from "lucide-react";
import { toast } from "sonner";

export default function AudioTrimmer() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [duration, setDuration] = useState<number>(0);
  const [startTime, setStartTime] = useState<number[]>([0]);
  const [endTime, setEndTime] = useState<number[]>([0]);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("audio/")) {
      toast.error("Please select a valid audio file");
      return;
    }

    setAudioFile(file);
    const url = URL.createObjectURL(file);
    setAudioUrl(url);
    toast.success("Audio loaded");
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      const dur = audioRef.current.duration;
      setDuration(dur);
      setEndTime([dur]);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const trimAudio = async () => {
    if (!audioFile) {
      toast.error("Please select an audio file");
      return;
    }

    if (startTime[0] >= endTime[0]) {
      toast.error("Start time must be before end time");
      return;
    }

    try {
      const audioContext = new AudioContext();
      const arrayBuffer = await audioFile.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

      const startSample = Math.floor(startTime[0] * audioBuffer.sampleRate);
      const endSample = Math.floor(endTime[0] * audioBuffer.sampleRate);
      const newLength = endSample - startSample;

      const trimmedBuffer = audioContext.createBuffer(
        audioBuffer.numberOfChannels,
        newLength,
        audioBuffer.sampleRate
      );

      for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
        const channelData = audioBuffer.getChannelData(channel);
        const newChannelData = trimmedBuffer.getChannelData(channel);
        for (let i = 0; i < newLength; i++) {
          newChannelData[i] = channelData[startSample + i];
        }
      }

      const wavBlob = await audioBufferToWav(trimmedBuffer);
      const url = URL.createObjectURL(wavBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `trimmed-${audioFile.name.replace(/\.[^/.]+$/, "")}.wav`;
      a.click();
      URL.revokeObjectURL(url);

      toast.success("Audio trimmed successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to trim audio");
    }
  };

  const audioBufferToWav = (buffer: AudioBuffer): Promise<Blob> => {
    return new Promise((resolve) => {
      const numberOfChannels = buffer.numberOfChannels;
      const length = buffer.length * numberOfChannels * 2 + 44;
      const arrayBuffer = new ArrayBuffer(length);
      const view = new DataView(arrayBuffer);

      const writeString = (offset: number, string: string) => {
        for (let i = 0; i < string.length; i++) {
          view.setUint8(offset + i, string.charCodeAt(i));
        }
      };

      writeString(0, "RIFF");
      view.setUint32(4, length - 8, true);
      writeString(8, "WAVE");
      writeString(12, "fmt ");
      view.setUint32(16, 16, true);
      view.setUint16(20, 1, true);
      view.setUint16(22, numberOfChannels, true);
      view.setUint32(24, buffer.sampleRate, true);
      view.setUint32(28, buffer.sampleRate * numberOfChannels * 2, true);
      view.setUint16(32, numberOfChannels * 2, true);
      view.setUint16(34, 16, true);
      writeString(36, "data");
      view.setUint32(40, length - 44, true);

      let offset = 44;
      for (let i = 0; i < buffer.length; i++) {
        for (let channel = 0; channel < numberOfChannels; channel++) {
          const sample = Math.max(-1, Math.min(1, buffer.getChannelData(channel)[i]));
          view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true);
          offset += 2;
        }
      }

      resolve(new Blob([arrayBuffer], { type: "audio/wav" }));
    });
  };

  return (
    <ToolLayout title="Audio Trimmer" description="Trim and cut your audio files">
      <Card className="p-6 space-y-6">
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileSelect}
            className="hidden"
            id="audio-upload"
          />
          <label htmlFor="audio-upload" className="cursor-pointer">
            <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-medium mb-2">Click to upload audio</p>
            {audioFile && <p className="text-sm text-primary mt-2">{audioFile.name}</p>}
          </label>
        </div>

        {audioUrl && (
          <>
            <div className="space-y-4">
              <audio
                ref={audioRef}
                src={audioUrl}
                onLoadedMetadata={handleLoadedMetadata}
                controls
                className="w-full"
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

            <Button onClick={trimAudio} className="w-full">
              <Scissors className="mr-2 h-4 w-4" />
              Trim Audio
            </Button>
          </>
        )}

        <div className="bg-muted/50 p-4 rounded-lg text-sm text-muted-foreground">
          <p className="font-medium mb-2">Features:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Output format: WAV</li>
            <li>Preserves audio quality</li>
            <li>All processing happens in your browser</li>
          </ul>
        </div>
      </Card>
    </ToolLayout>
  );
}
