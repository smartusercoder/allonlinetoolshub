import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UsageGuide } from "@/components/UsageGuide";

const IpLookup = () => {
  const [ip, setIp] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const lookupIp = async () => {
    if (!ip.trim()) {
      toast({
        title: "Error",
        description: "Please enter an IP address",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`https://ipapi.co/${ip}/json/`);
      const data = await response.json();
      
      if (data.error) {
        toast({
          title: "Error",
          description: data.reason || "Invalid IP address",
          variant: "destructive",
        });
      } else {
        setResult(data);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to lookup IP address",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout
      title="IP Address Lookup"
      description="Get information about IP addresses including location and ISP"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Enter an IP address (e.g., 8.8.8.8)",
            "Click \"Lookup\" button",
            "View location, ISP, and other details",
            "See city, region, country, timezone, and coordinates"
          ]}
          tips={[
            "Works with both IPv4 and IPv6",
            "Shows geolocation information",
            "Identifies ISP and organization",
            "Useful for network troubleshooting",
            "Great for analyzing web traffic sources"
          ]}
          example="Try: 8.8.8.8 (Google DNS)"
        />
      </div>
      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="ip">IP Address</Label>
          <div className="flex gap-2">
            <Input
              id="ip"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
              placeholder="Enter IP address (e.g., 8.8.8.8)"
            />
            <Button onClick={lookupIp} disabled={loading}>
              <Search className="mr-2 h-4 w-4" />
              Lookup
            </Button>
          </div>
        </div>

        {result && (
          <div className="space-y-3 pt-4 border-t">
            <h3 className="font-semibold text-lg">IP Information</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-sm text-muted-foreground">IP Address</p>
                <p className="font-medium">{result.ip}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">City</p>
                <p className="font-medium">{result.city || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Region</p>
                <p className="font-medium">{result.region || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Country</p>
                <p className="font-medium">{result.country_name || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Postal Code</p>
                <p className="font-medium">{result.postal || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">ISP</p>
                <p className="font-medium">{result.org || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Timezone</p>
                <p className="font-medium">{result.timezone || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Coordinates</p>
                <p className="font-medium">
                  {result.latitude}, {result.longitude}
                </p>
              </div>
            </div>
          </div>
        )}
      </Card>
    </ToolLayout>
  );
};

export default IpLookup;
