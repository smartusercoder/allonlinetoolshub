import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ValidatedInput } from "@/components/form/ValidatedInput";
import { Download, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function YoutubeChannelBanner() {
  const [channelUrl, setChannelUrl] = useState("");

  const downloadBanner = () => {
    if (!channelUrl) {
      toast.error("Please enter a YouTube channel URL");
      return;
    }
    toast.info("This tool requires YouTube Data API or web scraping");
  };

  return (
    <ToolLayout
      title="YouTube Channel Banner Downloader"
      description="Download YouTube channel banner images"
    >
      <Card className="p-6">
        <div className="space-y-6">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <p className="font-medium mb-1">Limited Access</p>
              <p className="text-sm">
                Channel banners require API access or web scraping. 
                You can screenshot the banner from the channel page directly or use browser extensions.
              </p>
            </AlertDescription>
          </Alert>

          <ValidatedInput
            label="YouTube Channel URL"
            value={channelUrl}
            onChange={setChannelUrl}
            placeholder="https://youtube.com/@channelname"
          />

          <Button onClick={downloadBanner} className="w-full" disabled>
            <Download className="w-4 h-4 mr-2" />
            Download Banner (Requires API)
          </Button>
        </div>
      </Card>
    </ToolLayout>
  );
}
