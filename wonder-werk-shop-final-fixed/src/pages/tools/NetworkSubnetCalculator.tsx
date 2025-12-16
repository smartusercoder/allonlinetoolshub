import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function NetworkSubnetCalculator() {
  const [ip, setIp] = useState("192.168.1.0");
  const [cidr, setCidr] = useState("24");

  const calculate = () => {
    const mask = cidr ? parseInt(cidr) : 24;
    const hosts = Math.pow(2, 32 - mask) - 2;
    const subnets = Math.pow(2, mask - (mask > 16 ? 16 : 8));
    
    return {
      mask: `255.255.255.${256 - Math.pow(2, 32 - mask)}`,
      hosts: hosts > 0 ? hosts : 0,
      subnets,
      network: ip,
      broadcast: ip.split('.').slice(0, 3).join('.') + '.255'
    };
  };

  const result = calculate();

  return (
    <ToolLayout
      title="Network Subnet Calculator"
      description="Calculate network subnet information"
    >
      <Card className="p-6 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="ip">IP Address</Label>
            <Input
              id="ip"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
              placeholder="192.168.1.0"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cidr">CIDR Prefix</Label>
            <Input
              id="cidr"
              type="number"
              min="0"
              max="32"
              value={cidr}
              onChange={(e) => setCidr(e.target.value)}
              placeholder="24"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Card className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Subnet Mask</div>
            <div className="font-mono font-bold">{result.mask}</div>
          </Card>

          <Card className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Usable Hosts</div>
            <div className="font-bold">{result.hosts.toLocaleString()}</div>
          </Card>

          <Card className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Network Address</div>
            <div className="font-mono font-bold">{result.network}</div>
          </Card>

          <Card className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Broadcast Address</div>
            <div className="font-mono font-bold">{result.broadcast}</div>
          </Card>
        </div>
      </Card>
    </ToolLayout>
  );
}
