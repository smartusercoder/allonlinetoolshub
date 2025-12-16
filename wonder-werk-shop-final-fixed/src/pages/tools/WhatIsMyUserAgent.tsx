import { useState, useEffect } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const WhatIsMyUserAgent = () => {
  const [userAgent, setUserAgent] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    setUserAgent(navigator.userAgent);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(userAgent);
    toast({
      title: "Copied!",
      description: "User agent copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="What Is My User Agent"
      description="Display your browser's user agent string"
    >
      <div className="space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Your User Agent</h3>
              <Button onClick={copyToClipboard} variant="outline" size="sm">
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <p className="font-mono text-sm break-all">{userAgent}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-muted/50">
          <h3 className="font-semibold mb-3">What is a User Agent?</h3>
          <p className="text-sm text-muted-foreground mb-3">
            A user agent string is a text string that web browsers send to web servers to identify themselves. It contains information about:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            <li>Browser name and version</li>
            <li>Operating system</li>
            <li>Device type</li>
            <li>Rendering engine</li>
          </ul>
        </Card>
      </div>
    </ToolLayout>
  );
};

export default WhatIsMyUserAgent;