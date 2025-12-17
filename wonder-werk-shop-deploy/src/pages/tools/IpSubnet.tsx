import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function IpSubnet() {
  const [ip, setIp] = useState("192.168.1.0");
  const [cidr, setCidr] = useState("24");

  const calculate = () => {
    const c = parseInt(cidr);
    const hosts = Math.pow(2, 32 - c) - 2;
    const networks = Math.pow(2, c);

    return {
      mask: `255.${255 - Math.pow(2, Math.max(0, 16 - c))}.${c >= 16 ? 255 - Math.pow(2, Math.max(0, 24 - c)) : 0}.${c >= 24 ? 255 - Math.pow(2, 32 - c) : 0}`,
      hosts: hosts > 0 ? hosts : 0,
      networks
    };
  };

  const result = calculate();

  return (
    <ToolLayout title="IP Subnet Calculator" description="Calculate subnet information">
      <div className="space-y-4">
        <Input value={ip} onChange={e => setIp(e.target.value)} placeholder="IP Address" />
        <Input type="number" value={cidr} onChange={e => setCidr(e.target.value)} placeholder="CIDR" min="1" max="32" />
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Subnet Mask</div>
            <div className="text-lg font-mono">{result.mask}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Usable Hosts</div>
            <div className="text-lg font-mono">{result.hosts.toLocaleString()}</div>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
