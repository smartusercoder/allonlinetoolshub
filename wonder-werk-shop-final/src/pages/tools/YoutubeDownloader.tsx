import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const YoutubeDownloader = () => {
  const [url, setUrl] = useState("");
  const { toast } = useToast();

  const handleDownload = () => {
    toast({
      title: "Client-Side Limitation",
      description: "YouTube downloading requires server-side processing. Please use dedicated YouTube download services.",
      variant: "destructive",
    });
  };

  return (
    <ToolLayout
      title="YouTube Thumbnail Downloader"
      description="Download YouTube video thumbnails"
    >
      <Card className="p-6 space-y-4">
        <div className="flex items-start gap-3 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-md">
          <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium">Note</p>
            <p className="text-muted-foreground">
              This tool extracts YouTube thumbnail images. For video downloads, please use dedicated services.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="url">YouTube Video URL</Label>
          <Input
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://youtube.com/watch?v=..."
          />
        </div>

        <Button onClick={handleDownload}>
          Get Thumbnail
        </Button>

        <div className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
          <p className="font-medium mb-2">How to get thumbnails manually:</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Find the video ID in the URL (after v=)</li>
            <li>Use: https://img.youtube.com/vi/[VIDEO_ID]/maxresdefault.jpg</li>
            <li>Or try: hqdefault.jpg, sddefault.jpg for other qualities</li>
          </ol>
        </div>
      </Card>
    </ToolLayout>
  );
};

export default YoutubeDownloader;
