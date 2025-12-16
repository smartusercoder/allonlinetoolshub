import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ValidatedInput } from "@/components/form/ValidatedInput";
import { Globe, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function YoutubeRegionChecker() {
  const [videoUrl, setVideoUrl] = useState("");

  const checkRegion = () => {
    if (!videoUrl) {
      toast.error("Please enter a YouTube video URL");
      return;
    }
    toast.info("This tool requires YouTube Data API access");
  };

  return (
    <ToolLayout
      title="YouTube Region Restriction Checker"
      description="Check if a YouTube video is restricted in certain regions"
    >
      <Card className="p-6">
        <div className="space-y-6">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <p className="font-medium mb-1">YouTube API Required</p>
              <p className="text-sm">
                Checking region restrictions requires YouTube Data API access.
                Alternative: Use YouTube Studio for your own videos or third-party tools.
              </p>
            </AlertDescription>
          </Alert>

          <ValidatedInput
            label="YouTube Video URL"
            value={videoUrl}
            onChange={setVideoUrl}
            placeholder="https://youtube.com/watch?v=..."
          />

          <Button onClick={checkRegion} className="w-full" disabled>
            <Globe className="w-4 h-4 mr-2" />
            Check Region Restrictions (Requires API)
          </Button>
        </div>
      </Card>
    </ToolLayout>
  );
}
