import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function WifiQrCode() {
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [encryption, setEncryption] = useState("WPA");
  const { toast } = useToast();

  const wifiString = `WIFI:T:${encryption};S:${ssid};P:${password};;`;
  const qrUrl = ssid ? `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(wifiString)}` : "";

  const copyString = () => {
    navigator.clipboard.writeText(wifiString);
    toast({
      title: "Copied!",
      description: "WiFi string copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="WiFi QR Code Generator"
      description="Generate QR codes for WiFi networks"
    >
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium">Network Name (SSID)</label>
            <Input
              value={ssid}
              onChange={(e) => setSsid(e.target.value)}
              placeholder="Enter WiFi network name"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter WiFi password"
            />
          </div>

          {qrUrl && (
            <div className="space-y-4">
              <div className="flex justify-center p-8 bg-muted rounded-lg">
                <img src={qrUrl} alt="WiFi QR Code" className="rounded" />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">WiFi String</label>
                <div className="flex gap-2">
                  <Textarea value={wifiString} readOnly rows={2} className="font-mono text-sm bg-muted" />
                  <Button variant="outline" size="icon" onClick={copyString}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <p className="text-sm text-muted-foreground text-center">
                Scan this QR code with your phone to connect to the WiFi network
              </p>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
}
