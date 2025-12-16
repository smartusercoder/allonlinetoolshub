import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function BrowserDetector() {
  const [info] = useState(() => {
    const ua = navigator.userAgent;
    const platform = navigator.platform;
    const language = navigator.language;
    
    let browserName = 'Unknown';
    let browserVersion = 'Unknown';
    
    if (ua.indexOf('Firefox') > -1) {
      browserName = 'Firefox';
      browserVersion = ua.match(/Firefox\/([0-9.]+)/)?.[1] || 'Unknown';
    } else if (ua.indexOf('Edg') > -1) {
      browserName = 'Edge';
      browserVersion = ua.match(/Edg\/([0-9.]+)/)?.[1] || 'Unknown';
    } else if (ua.indexOf('Chrome') > -1) {
      browserName = 'Chrome';
      browserVersion = ua.match(/Chrome\/([0-9.]+)/)?.[1] || 'Unknown';
    } else if (ua.indexOf('Safari') > -1) {
      browserName = 'Safari';
      browserVersion = ua.match(/Version\/([0-9.]+)/)?.[1] || 'Unknown';
    }
    
    let os = 'Unknown';
    if (platform.indexOf('Win') > -1) os = 'Windows';
    else if (platform.indexOf('Mac') > -1) os = 'macOS';
    else if (platform.indexOf('Linux') > -1) os = 'Linux';
    else if (/Android/.test(ua)) os = 'Android';
    else if (/iPhone|iPad|iPod/.test(ua)) os = 'iOS';

    return {
      browser: browserName,
      version: browserVersion,
      os,
      platform,
      language,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      colorDepth: window.screen.colorDepth,
      pixelRatio: window.devicePixelRatio,
      userAgent: ua
    };
  });

  return (
    <ToolLayout
      title="Browser & Screen Info"
      description="Detect browser, OS, and screen information"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Browser</div>
          <div className="text-xl font-bold">{info.browser}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Version</div>
          <div className="text-xl font-bold">{info.version}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Operating System</div>
          <div className="text-xl font-bold">{info.os}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Language</div>
          <div className="text-xl font-bold">{info.language}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Screen Resolution</div>
          <div className="text-xl font-bold">{info.screenWidth} × {info.screenHeight}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Window Size</div>
          <div className="text-xl font-bold">{info.windowWidth} × {info.windowHeight}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Color Depth</div>
          <div className="text-xl font-bold">{info.colorDepth}-bit</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Pixel Ratio</div>
          <div className="text-xl font-bold">{info.pixelRatio}x</div>
        </Card>
        <Card className="p-4 col-span-2">
          <div className="text-sm text-muted-foreground mb-2">User Agent</div>
          <div className="text-xs font-mono break-all">{info.userAgent}</div>
        </Card>
      </div>
    </ToolLayout>
  );
}
