import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ValidatedInput } from "@/components/form/ValidatedInput";
import { Download, Image } from "lucide-react";
import { toast } from "sonner";

export default function YoutubeThumbnailDownloader() {
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnails, setThumbnails] = useState<{ quality: string; url: string }[]>([]);

  const extractVideoId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const getThumbnails = () => {
    if (!videoUrl) {
      toast.error("Please enter a YouTube video URL");
      return;
    }

    const videoId = extractVideoId(videoUrl);
    if (!videoId) {
      toast.error("Invalid YouTube URL");
      return;
    }

    const thumbnailList = [
      { quality: "Maximum Resolution", url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` },
      { quality: "Standard Definition", url: `https://img.youtube.com/vi/${videoId}/sddefault.jpg` },
      { quality: "High Quality", url: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` },
      { quality: "Medium Quality", url: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` },
      { quality: "Default", url: `https://img.youtube.com/vi/${videoId}/default.jpg` },
    ];

    setThumbnails(thumbnailList);
    toast.success("Thumbnails loaded successfully!");
  };

  const downloadThumbnail = (url: string, quality: string) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = `youtube-thumbnail-${quality.toLowerCase().replace(/\s/g, "-")}.jpg`;
    a.target = "_blank";
    a.click();
    toast.success("Download started!");
  };

  return (
    <ToolLayout
      title="YouTube Thumbnail Downloader"
      description="Download high-quality YouTube video thumbnails"
    >
      <Card className="p-6">
        <div className="space-y-6">
          <ValidatedInput
            label="YouTube Video URL"
            value={videoUrl}
            onChange={setVideoUrl}
            placeholder="https://youtube.com/watch?v=..."
          />

          <Button onClick={getThumbnails} className="w-full">
            <Image className="w-4 h-4 mr-2" />
            Get Thumbnails
          </Button>

          {thumbnails.length > 0 && (
            <div className="space-y-4">
              {thumbnails.map((thumb, index) => (
                <div key={index} className="border rounded-lg overflow-hidden">
                  <img 
                    src={thumb.url} 
                    alt={thumb.quality}
                    className="w-full"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="p-3 flex items-center justify-between bg-muted">
                    <span className="text-sm font-medium">{thumb.quality}</span>
                    <Button 
                      size="sm" 
                      onClick={() => downloadThumbnail(thumb.url, thumb.quality)}
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
}
