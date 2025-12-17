import { useEffect, useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Monitor } from "lucide-react";

const WhatIsMyBrowser = () => {
  const [browserInfo, setBrowserInfo] = useState({
    name: "",
    version: "",
    os: "",
    userAgent: "",
  });

  useEffect(() => {
    const ua = navigator.userAgent;
    let browserName = "Unknown";
    let browserVersion = "Unknown";
    let os = "Unknown";

    // Detect browser
    if (ua.indexOf("Firefox") > -1) {
      browserName = "Firefox";
      browserVersion = ua.match(/Firefox\/([0-9.]+)/)?.[1] || "Unknown";
    } else if (ua.indexOf("Chrome") > -1 && ua.indexOf("Edg") === -1) {
      browserName = "Chrome";
      browserVersion = ua.match(/Chrome\/([0-9.]+)/)?.[1] || "Unknown";
    } else if (ua.indexOf("Safari") > -1 && ua.indexOf("Chrome") === -1) {
      browserName = "Safari";
      browserVersion = ua.match(/Version\/([0-9.]+)/)?.[1] || "Unknown";
    } else if (ua.indexOf("Edg") > -1) {
      browserName = "Edge";
      browserVersion = ua.match(/Edg\/([0-9.]+)/)?.[1] || "Unknown";
    }

    // Detect OS
    if (ua.indexOf("Win") > -1) os = "Windows";
    else if (ua.indexOf("Mac") > -1) os = "MacOS";
    else if (ua.indexOf("Linux") > -1) os = "Linux";
    else if (ua.indexOf("Android") > -1) os = "Android";
    else if (ua.indexOf("iOS") > -1) os = "iOS";

    setBrowserInfo({
      name: browserName,
      version: browserVersion,
      os: os,
      userAgent: ua,
    });
  }, []);

  return (
    <ToolLayout
      title="What Is My Browser"
      description="Detect your web browser and system information"
    >
      <div className="space-y-6">
        <Card className="p-8">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
              <Monitor className="w-10 h-10 text-primary" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">{browserInfo.name}</h2>
              <p className="text-xl text-muted-foreground">Version {browserInfo.version}</p>
            </div>

            <div className="w-full max-w-md space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium text-muted-foreground mb-1">Operating System</p>
                <p className="text-lg font-semibold">{browserInfo.os}</p>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium text-muted-foreground mb-1">User Agent</p>
                <p className="text-xs font-mono break-all">{browserInfo.userAgent}</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-muted/50">
          <h3 className="font-semibold mb-3">Browser Information</h3>
          <p className="text-sm text-muted-foreground">
            This tool detects your current web browser, version, and operating system using your browser's user agent string.
          </p>
        </Card>
      </div>
    </ToolLayout>
  );
};

export default WhatIsMyBrowser;