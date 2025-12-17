import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Youtube, Search, Eye, ThumbsUp, MessageSquare, Calendar, Clock, ExternalLink, AlertCircle, Calculator } from "lucide-react";
import { toast } from "sonner";

interface VideoStats {
  videoId: string;
  title: string;
  views: number;
  likes: number;
  comments: number;
  duration: string;
  publishedAt: string;
  thumbnail: string;
}

export default function YoutubeVideoStatistics() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState<VideoStats | null>(null);
  
  // Manual entry mode
  const [manualMode, setManualMode] = useState(false);
  const [manualStats, setManualStats] = useState({
    views: "",
    likes: "",
    comments: "",
    daysOld: ""
  });

  const extractVideoId = (input: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([^&\s?]+)/,
      /^[a-zA-Z0-9_-]{11}$/
    ];
    
    for (const pattern of patterns) {
      const match = input.match(pattern);
      if (match) return match[1] || match[0];
    }
    return null;
  };

  const fetchVideoStats = async () => {
    const videoId = extractVideoId(url.trim());
    
    if (!videoId) {
      toast.error("Please enter a valid YouTube URL or video ID");
      return;
    }

    setIsLoading(true);
    setStats(null);

    try {
      // Note: Without an API key, we can only provide thumbnail and link
      // The YouTube Data API requires authentication
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // We can get the thumbnail without an API
      const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      
      setStats({
        videoId,
        title: "Video statistics require YouTube Data API",
        views: 0,
        likes: 0,
        comments: 0,
        duration: "Unknown",
        publishedAt: "Unknown",
        thumbnail
      });

      toast.info("For full stats, use the manual calculator or YouTube Studio");
    } catch (error) {
      toast.error("Failed to fetch video info");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toLocaleString();
  };

  const calculateEngagement = () => {
    const views = parseInt(manualStats.views) || 0;
    const likes = parseInt(manualStats.likes) || 0;
    const comments = parseInt(manualStats.comments) || 0;
    const daysOld = parseInt(manualStats.daysOld) || 1;

    if (views === 0) return null;

    const likeRate = ((likes / views) * 100).toFixed(2);
    const commentRate = ((comments / views) * 100).toFixed(3);
    const engagementRate = (((likes + comments) / views) * 100).toFixed(2);
    const viewsPerDay = Math.round(views / daysOld);
    const likesPerDay = Math.round(likes / daysOld);

    return { likeRate, commentRate, engagementRate, viewsPerDay, likesPerDay };
  };

  const engagement = calculateEngagement();

  return (
    <ToolLayout 
      title="YouTube Video Statistics" 
      description="Analyze YouTube video statistics and engagement metrics"
    >
      <Card className="p-6">
        <div className="space-y-6">
          {/* Mode toggle */}
          <div className="flex gap-2">
            <Button 
              variant={!manualMode ? "default" : "outline"} 
              size="sm"
              onClick={() => setManualMode(false)}
            >
              URL Lookup
            </Button>
            <Button 
              variant={manualMode ? "default" : "outline"} 
              size="sm"
              onClick={() => setManualMode(true)}
            >
              <Calculator className="h-4 w-4 mr-1" />
              Manual Calculator
            </Button>
          </div>

          {!manualMode ? (
            <>
              {/* URL Input */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="url">YouTube Video URL</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      id="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://youtube.com/watch?v=... or video ID"
                      onKeyDown={(e) => e.key === 'Enter' && fetchVideoStats()}
                    />
                    <Button onClick={fetchVideoStats} disabled={isLoading}>
                      {isLoading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-background border-t-transparent" />
                      ) : (
                        <>
                          <Search className="h-4 w-4 mr-2" />
                          Lookup
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Video Preview */}
              {stats && (
                <div className="space-y-4">
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                    <img 
                      src={stats.thumbnail} 
                      alt="Video thumbnail"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${stats.videoId}/hqdefault.jpg`;
                      }}
                    />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button asChild>
                      <a 
                        href={`https://www.youtube.com/watch?v=${stats.videoId}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <Youtube className="h-4 w-4 mr-2" />
                        Watch on YouTube
                      </a>
                    </Button>
                    <Button variant="outline" asChild>
                      <a 
                        href={`https://studio.youtube.com/video/${stats.videoId}/analytics`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        YouTube Studio (owners only)
                      </a>
                    </Button>
                  </div>

                  <div className="bg-muted/30 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Note:</strong> Full video statistics require the YouTube Data API with authentication. 
                      Use the Manual Calculator below to analyze your own stats, or view them in YouTube Studio if you own the video.
                    </p>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Manual stats input */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="views">Views</Label>
                  <Input
                    id="views"
                    type="number"
                    value={manualStats.views}
                    onChange={(e) => setManualStats(s => ({ ...s, views: e.target.value }))}
                    placeholder="1000000"
                  />
                </div>
                <div>
                  <Label htmlFor="likes">Likes</Label>
                  <Input
                    id="likes"
                    type="number"
                    value={manualStats.likes}
                    onChange={(e) => setManualStats(s => ({ ...s, likes: e.target.value }))}
                    placeholder="50000"
                  />
                </div>
                <div>
                  <Label htmlFor="comments">Comments</Label>
                  <Input
                    id="comments"
                    type="number"
                    value={manualStats.comments}
                    onChange={(e) => setManualStats(s => ({ ...s, comments: e.target.value }))}
                    placeholder="2000"
                  />
                </div>
                <div>
                  <Label htmlFor="daysOld">Days Since Published</Label>
                  <Input
                    id="daysOld"
                    type="number"
                    value={manualStats.daysOld}
                    onChange={(e) => setManualStats(s => ({ ...s, daysOld: e.target.value }))}
                    placeholder="30"
                  />
                </div>
              </div>

              {/* Calculated metrics */}
              {engagement && (
                <div className="space-y-4">
                  <h3 className="font-semibold">Engagement Analysis</h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-muted/50 p-4 rounded-lg text-center">
                      <ThumbsUp className="h-6 w-6 mx-auto mb-2 text-green-500" />
                      <p className="text-2xl font-bold">{engagement.likeRate}%</p>
                      <p className="text-xs text-muted-foreground">Like Rate</p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg text-center">
                      <MessageSquare className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                      <p className="text-2xl font-bold">{engagement.commentRate}%</p>
                      <p className="text-xs text-muted-foreground">Comment Rate</p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg text-center">
                      <Eye className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <p className="text-2xl font-bold">{engagement.engagementRate}%</p>
                      <p className="text-xs text-muted-foreground">Total Engagement</p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg text-center">
                      <Calendar className="h-6 w-6 mx-auto mb-2 text-orange-500" />
                      <p className="text-2xl font-bold">{formatNumber(engagement.viewsPerDay)}</p>
                      <p className="text-xs text-muted-foreground">Views/Day</p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg text-center">
                      <Clock className="h-6 w-6 mx-auto mb-2 text-purple-500" />
                      <p className="text-2xl font-bold">{formatNumber(engagement.likesPerDay)}</p>
                      <p className="text-xs text-muted-foreground">Likes/Day</p>
                    </div>
                  </div>

                  {/* Benchmarks */}
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Engagement Benchmarks:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• <strong>Like rate:</strong> 4%+ is excellent, 2-4% is good, &lt;2% is average</li>
                      <li>• <strong>Comment rate:</strong> 0.5%+ is excellent, 0.1-0.5% is good</li>
                      <li>• <strong>Total engagement:</strong> 5%+ is viral territory</li>
                    </ul>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Info section */}
          <div className="bg-muted/30 p-4 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <p className="font-medium text-foreground mb-1">About YouTube Statistics:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Public API access requires a YouTube Data API key</li>
                  <li>Use the manual calculator to analyze your own video stats</li>
                  <li>Video owners can see detailed analytics in YouTube Studio</li>
                  <li>Third-party tools like SocialBlade provide public estimates</li>
                </ul>
              </div>
            </div>
          </div>

          {/* External tools */}
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" asChild>
              <a href="https://socialblade.com/youtube/" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3 w-3 mr-1" />
                SocialBlade
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href="https://vidiq.com/" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3 w-3 mr-1" />
                VidIQ
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href="https://www.tubebuddy.com/" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3 w-3 mr-1" />
                TubeBuddy
              </a>
            </Button>
          </div>
        </div>
      </Card>
    </ToolLayout>
  );
}
