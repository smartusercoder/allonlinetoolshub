import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ValidatedInput } from "@/components/form/ValidatedInput";
import { BarChart3, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function YoutubeChannelStatistics() {
  const [channelUrl, setChannelUrl] = useState("");

  const getStatistics = () => {
    if (!channelUrl) {
      toast.error("Please enter a YouTube channel URL");
      return;
    }
    toast.info("This tool requires YouTube Data API access");
  };

  return (
    <ToolLayout
      title="YouTube Channel Statistics"
      description="Get detailed statistics for any YouTube channel"
    >
      <Card className="p-6">
        <div className="space-y-6">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <p className="font-medium mb-1">YouTube API Required</p>
              <p className="text-sm">
                Getting channel statistics requires YouTube Data API access.
                Use YouTube Studio for your own channel or third-party analytics tools.
              </p>
            </AlertDescription>
          </Alert>

          <ValidatedInput
            label="YouTube Channel URL"
            value={channelUrl}
            onChange={setChannelUrl}
            placeholder="https://youtube.com/@channelname"
          />

          <Button onClick={getStatistics} className="w-full" disabled>
            <BarChart3 className="w-4 h-4 mr-2" />
            Get Statistics (Requires API)
          </Button>
        </div>
      </Card>
    </ToolLayout>
  );
}
