import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ValidatedInput } from "@/components/form/ValidatedInput";
import { Hash, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function YoutubeVideoCount() {
  const [channelUrl, setChannelUrl] = useState("");

  const countVideos = () => {
    if (!channelUrl) {
      toast.error("Please enter a YouTube channel URL");
      return;
    }
    toast.info("This tool requires YouTube Data API access");
  };

  return (
    <ToolLayout
      title="YouTube Video Count Checker"
      description="Check the total number of videos on a YouTube channel"
    >
      <Card className="p-6">
        <div className="space-y-6">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <p className="font-medium mb-1">YouTube API Required</p>
              <p className="text-sm">
                Counting videos requires YouTube Data API access.
                The video count is also visible on the channel page directly.
              </p>
            </AlertDescription>
          </Alert>

          <ValidatedInput
            label="YouTube Channel URL"
            value={channelUrl}
            onChange={setChannelUrl}
            placeholder="https://youtube.com/@channelname"
          />

          <Button onClick={countVideos} className="w-full" disabled>
            <Hash className="w-4 h-4 mr-2" />
            Count Videos (Requires API)
          </Button>
        </div>
      </Card>
    </ToolLayout>
  );
}
