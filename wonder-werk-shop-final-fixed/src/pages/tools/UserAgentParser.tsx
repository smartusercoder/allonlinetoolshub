import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { UsageGuide } from "@/components/UsageGuide";

const UserAgentParser = () => {
  const [userAgent, setUserAgent] = useState(navigator.userAgent);

  const parseUserAgent = (ua: string) => {
    const info = {
      browser: "Unknown",
      version: "Unknown",
      os: "Unknown",
      device: "Desktop",
      mobile: false
    };

    // Detect browser
    if (ua.includes("Firefox/")) {
      info.browser = "Firefox";
      info.version = ua.split("Firefox/")[1].split(" ")[0];
    } else if (ua.includes("Edg/")) {
      info.browser = "Edge";
      info.version = ua.split("Edg/")[1].split(" ")[0];
    } else if (ua.includes("Chrome/")) {
      info.browser = "Chrome";
      info.version = ua.split("Chrome/")[1].split(" ")[0];
    } else if (ua.includes("Safari/") && !ua.includes("Chrome")) {
      info.browser = "Safari";
      info.version = ua.split("Version/")[1]?.split(" ")[0] || "Unknown";
    } else if (ua.includes("Opera/") || ua.includes("OPR/")) {
      info.browser = "Opera";
      info.version = ua.includes("OPR/") ? ua.split("OPR/")[1].split(" ")[0] : ua.split("Opera/")[1].split(" ")[0];
    }

    // Detect OS
    if (ua.includes("Windows NT 10.0")) info.os = "Windows 10";
    else if (ua.includes("Windows NT 6.3")) info.os = "Windows 8.1";
    else if (ua.includes("Windows NT 6.2")) info.os = "Windows 8";
    else if (ua.includes("Windows NT 6.1")) info.os = "Windows 7";
    else if (ua.includes("Mac OS X")) {
      const match = ua.match(/Mac OS X (\d+[._]\d+([._]\d+)?)/);
      info.os = match ? `macOS ${match[1].replace(/_/g, ".")}` : "macOS";
    } else if (ua.includes("Android")) {
      const match = ua.match(/Android (\d+(\.\d+)?)/);
      info.os = match ? `Android ${match[1]}` : "Android";
    } else if (ua.includes("iPhone") || ua.includes("iPad")) {
      const match = ua.match(/OS (\d+_\d+(_\d+)?)/);
      info.os = match ? `iOS ${match[1].replace(/_/g, ".")}` : "iOS";
    } else if (ua.includes("Linux")) info.os = "Linux";

    // Detect device
    if (ua.includes("Mobile") || ua.includes("Android")) {
      info.mobile = true;
      info.device = "Mobile";
    } else if (ua.includes("Tablet") || ua.includes("iPad")) {
      info.device = "Tablet";
    }

    return info;
  };

  const info = parseUserAgent(userAgent);

  return (
    <ToolLayout
      title="User Agent Parser"
      description="Parse and analyze user agent strings"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Your current user agent is loaded by default",
            "Paste any user agent string to analyze it",
            "View browser, version, OS, and device type",
            "See if it's a mobile or desktop device"
          ]}
          tips={[
            "User agents identify browsers and devices",
            "Useful for analytics and testing",
            "Great for debugging browser-specific issues",
            "Parse user agents from server logs",
            "Identify bot traffic vs real users"
          ]}
        />
      </div>
      <Card>
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-2">
            <Label>User Agent String</Label>
            <Textarea
              value={userAgent}
              onChange={(e) => setUserAgent(e.target.value)}
              placeholder="Enter user agent string"
              rows={4}
              className="font-mono text-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Browser</p>
              <p className="text-xl font-semibold">{info.browser}</p>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Version</p>
              <p className="text-xl font-semibold">{info.version}</p>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Operating System</p>
              <p className="text-xl font-semibold">{info.os}</p>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Device Type</p>
              <p className="text-xl font-semibold">{info.device}</p>
            </div>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Additional Info</p>
            <ul className="text-sm space-y-1">
              <li><strong>Mobile Device:</strong> {info.mobile ? "Yes" : "No"}</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </ToolLayout>
  );
};

export default UserAgentParser;
