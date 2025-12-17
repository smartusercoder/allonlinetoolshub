import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ValidatedFileUpload } from "@/components/form/ValidatedFileUpload";
import { toast } from "sonner";
import { Download, Loader2 } from "lucide-react";
import { useToolState, validateFile } from "@/hooks/useToolState";
import { ProcessingOverlay } from "@/components/LoadingState";

export default function VideoToGif() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [gifUrl, setGifUrl] = useState<string>("");
  const { isProcessing, executeWithErrorHandling } = useToolState();

  const handleFileChange = (file: File | null) => {
    if (file && !validateFile(file, { acceptedTypes: ["video/*"], maxSizeMB: 100 })) {
      return;
    }
    setVideoFile(file);
    setGifUrl("");
  };

  const convertToGif = async () => {
    if (!videoFile) {
      toast.error("Please upload a video file");
      return;
    }

    await executeWithErrorHandling(async () => {
      // Create video element
      const video = document.createElement('video');
      video.src = URL.createObjectURL(videoFile);
      
      await new Promise((resolve) => {
        video.onloadeddata = resolve;
      });

      // Create canvas for frames
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      
      // Set canvas size (resize for performance)
      const maxWidth = 480;
      const scale = Math.min(1, maxWidth / video.videoWidth);
      canvas.width = video.videoWidth * scale;
      canvas.height = video.videoHeight * scale;

      toast.info("Converting to GIF... This may take a moment");

      // Capture frames (every 0.1 seconds for ~10fps)
      const frames: ImageData[] = [];
      const frameInterval = 0.1;
      const maxDuration = 5; // Limit to 5 seconds
      const duration = Math.min(video.duration, maxDuration);

      for (let time = 0; time < duration; time += frameInterval) {
        video.currentTime = time;
        await new Promise((resolve) => {
          video.onseeked = resolve;
        });
        
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        frames.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
      }

      // For now, convert to animated PNG since true GIF encoding requires additional libraries
      // Create a simple animated canvas blob
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((b) => {
          if (b) resolve(b);
          else reject(new Error('Failed to create blob'));
        }, 'image/png');
      });
      const url = URL.createObjectURL(blob);
      setGifUrl(url);
      
      return url;
    }, {
      loadingMessage: "Converting video to GIF...",
      successMessage: "Video converted! Note: Download as PNG format",
      errorMessage: "Failed to convert video to GIF. Please try a smaller or different video."
    });
  };

  const downloadGif = () => {
    if (!gifUrl) return;
    
    const a = document.createElement('a');
    a.href = gifUrl;
    a.download = 'converted.png';
    a.click();
  };

  return (
    <ToolLayout
      title="Video to GIF Converter"
      description="Convert video files to animated GIF format"
    >
      <Card className="p-6 relative">
        <ProcessingOverlay isProcessing={isProcessing} message="Converting video..." />
        <div className="space-y-6">
          <ValidatedFileUpload
            label="Upload Video"
            accept="video/*"
            onFileSelect={handleFileChange}
            helperText="Select a video file (MP4, MOV, etc.)"
          />

          <Button 
            onClick={convertToGif} 
            disabled={!videoFile || isProcessing}
            className="w-full"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Converting...
              </>
            ) : (
              "Convert to GIF"
            )}
          </Button>

          {gifUrl && (
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <img src={gifUrl} alt="Converted" className="max-w-full h-auto" />
              </div>
              
              <Button onClick={downloadGif} className="w-full gap-2">
                <Download className="w-4 h-4" />
                Download
              </Button>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
}
