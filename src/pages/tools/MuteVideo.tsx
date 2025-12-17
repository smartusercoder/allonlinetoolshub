import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ValidatedFileUpload } from "@/components/form/ValidatedFileUpload";
import { toast } from "sonner";
import { Download, Volume2, VolumeX, Loader2 } from "lucide-react";
import { useToolState, validateFile } from "@/hooks/useToolState";
import { ProcessingOverlay } from "@/components/LoadingState";

export default function MuteVideo() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [mutedVideoUrl, setMutedVideoUrl] = useState<string>("");
  const { isProcessing, executeWithErrorHandling } = useToolState();

  const handleFileChange = (file: File | null) => {
    if (file && !validateFile(file, { acceptedTypes: ["video/*"], maxSizeMB: 200 })) {
      return;
    }
    setVideoFile(file);
    setMutedVideoUrl("");
  };

  const muteVideo = async () => {
    if (!videoFile) {
      toast.error("Please upload a video file");
      return;
    }

    await executeWithErrorHandling(async () => {
      const url = URL.createObjectURL(videoFile);
      setMutedVideoUrl(url);
      return url;
    }, {
      successMessage: "Video loaded with muted audio",
      errorMessage: "Failed to process video"
    });
  };

  return (
    <ToolLayout
      title="Mute Video"
      description="Remove audio from video files"
    >
      <Card className="p-6 relative">
        <ProcessingOverlay isProcessing={isProcessing} message="Processing video..." />
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Volume2 className="w-5 h-5" />
            <span>→</span>
            <VolumeX className="w-5 h-5" />
            <span className="text-sm">Remove audio track from videos</span>
          </div>

          <ValidatedFileUpload
            label="Upload Video"
            accept="video/*"
            onFileSelect={handleFileChange}
            helperText="Select a video file to mute"
          />

          <Button 
            onClick={muteVideo} 
            disabled={!videoFile || isProcessing}
            className="w-full"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              "Mute Video"
            )}
          </Button>

          {mutedVideoUrl && (
            <div className="space-y-4">
              <div className="border rounded-lg overflow-hidden">
                <video 
                  src={mutedVideoUrl} 
                  controls 
                  muted
                  className="w-full"
                />
              </div>
              
              <p className="text-sm text-muted-foreground">
                Note: Full video encoding with audio removal requires server-side processing. 
                The video above plays with muted audio for preview.
              </p>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
}
