import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Loader2, Tag, Video } from "lucide-react";
import { toast } from "sonner";

export default function YoutubeTagExtractor() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoData, setVideoData] = useState<{
    videoId: string;
    title?: string;
    tags?: string[];
    description?: string;
  } | null>(null);

  const extractVideoId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /^([a-zA-Z0-9_-]{11})$/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const extractTags = async () => {
    if (!url) {
      toast.error("Please enter a YouTube URL or video ID");
      return;
    }

    const videoId = extractVideoId(url);
    if (!videoId) {
      toast.error("Invalid YouTube URL or video ID");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`https://www.youtube.com/watch?v=${videoId}`);
      const html = await response.text();

      const titleMatch = html.match(/<meta name="title" content="([^"]+)"/);
      const descMatch = html.match(/<meta name="description" content="([^"]+)"/);
      const keywordsMatch = html.match(/<meta name="keywords" content="([^"]+)"/);

      const title = titleMatch ? titleMatch[1] : "Unknown";
      const description = descMatch ? descMatch[1] : "";
      const tags = keywordsMatch ? keywordsMatch[1].split(",").map(t => t.trim()).filter(t => t) : [];

      setVideoData({
        videoId,
        title,
        description,
        tags: tags.length > 0 ? tags : ["No tags found (video may not have public tags)"]
      });

      toast.success("Tags extracted successfully!");
    } catch (error) {
      toast.error("Failed to extract tags. The video may be private or deleted.");
      setVideoData({
        videoId,
        tags: ["Unable to extract tags"]
      });
    } finally {
      setLoading(false);
    }
  };

  const copyTags = () => {
    if (!videoData?.tags) return;
    const tagText = videoData.tags.join(", ");
    navigator.clipboard.writeText(tagText);
    toast.success("Tags copied to clipboard!");
  };

  const copyTagsAsArray = () => {
    if (!videoData?.tags) return;
    const tagText = JSON.stringify(videoData.tags, null, 2);
    navigator.clipboard.writeText(tagText);
    toast.success("Tags copied as JSON array!");
  };

  return (
    <ToolLayout 
      title="YouTube Tag Extractor" 
      description="Extract tags and metadata from YouTube videos"
    >
      <div className="space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="url">YouTube Video URL or ID</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  id="url"
                  type="text"
                  placeholder="https://youtube.com/watch?v=... or video ID"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && extractTags()}
                  className="flex-1"
                />
                <Button onClick={extractTags} disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Extracting...
                    </>
                  ) : (
                    <>
                      <Tag className="w-4 h-4 mr-2" />
                      Extract Tags
                    </>
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Supports: youtube.com/watch?v=..., youtu.be/..., or just the video ID
              </p>
            </div>
          </div>
        </Card>

        {videoData && (
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Video className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Video Information</h3>
              </div>

              {videoData.title && (
                <div>
                  <Label className="text-xs text-muted-foreground">Title</Label>
                  <p className="font-medium mt-1">{videoData.title}</p>
                </div>
              )}

              <div>
                <Label className="text-xs text-muted-foreground">Video ID</Label>
                <p className="font-mono text-sm mt-1">{videoData.videoId}</p>
              </div>

              {videoData.description && (
                <div>
                  <Label className="text-xs text-muted-foreground">Description</Label>
                  <p className="text-sm mt-1 line-clamp-3">{videoData.description}</p>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label>Tags ({videoData.tags?.length || 0})</Label>
                  <div className="flex gap-2">
                    <Button 
                      onClick={copyTags} 
                      variant="outline" 
                      size="sm"
                      disabled={!videoData.tags || videoData.tags.length === 0}
                    >
                      <Copy className="w-3 h-3 mr-2" />
                      Copy Tags
                    </Button>
                    <Button 
                      onClick={copyTagsAsArray} 
                      variant="outline" 
                      size="sm"
                      disabled={!videoData.tags || videoData.tags.length === 0}
                    >
                      <Copy className="w-3 h-3 mr-2" />
                      Copy as JSON
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {videoData.tags && videoData.tags.length > 0 ? (
                    videoData.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-sm">
                        {tag}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No tags found</p>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t">
                <a
                  href={`https://www.youtube.com/watch?v=${videoData.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline flex items-center gap-1"
                >
                  View video on YouTube →
                </a>
              </div>
            </div>
          </Card>
        )}

        <Card className="p-6 bg-muted/50">
          <h3 className="font-semibold mb-3">About YouTube Tags</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              YouTube tags (also known as keywords) help identify the content of your video and improve its discoverability in search results. This tool extracts publicly available tags from YouTube videos.
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Tags help YouTube understand your video content</li>
              <li>Not all videos have public tags visible</li>
              <li>Tags are different from hashtags in video descriptions</li>
              <li>Use relevant tags to improve video SEO</li>
            </ul>
          </div>
        </Card>
      </div>
    </ToolLayout>
  );
}
