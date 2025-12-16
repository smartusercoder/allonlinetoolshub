import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RefreshCw, Copy } from "lucide-react";
import { toast } from "sonner";

export default function FakeAddressGenerator() {
  const [addresses, setAddresses] = useState<string[]>([]);

  const streets = ["Main St", "Oak Ave", "Maple Dr", "Cedar Ln", "Park Blvd", "Lake Rd"];
  const cities = ["Springfield", "Riverside", "Franklin", "Georgetown", "Madison", "Oakland"];
  const states = ["CA", "NY", "TX", "FL", "IL", "PA", "OH", "MI", "NC", "GA"];

  const generateAddress = () => {
    const street = `${Math.floor(Math.random() * 9999) + 1} ${streets[Math.floor(Math.random() * streets.length)]}`;
    const city = cities[Math.floor(Math.random() * cities.length)];
    const state = states[Math.floor(Math.random() * states.length)];
    const zip = Math.floor(Math.random() * 90000) + 10000;
    return `${street}\n${city}, ${state} ${zip}`;
  };

  const generateAddresses = () => {
    setAddresses(Array.from({ length: 10 }, generateAddress));
  };

  if (addresses.length === 0) {
    generateAddresses();
  }

  return (
    <ToolLayout
      title="Fake Address Generator"
      description="Generate realistic fake addresses for testing"
    >
      <div className="space-y-4">
        <Button onClick={generateAddresses} className="w-full">
          <RefreshCw className="mr-2 h-4 w-4" />
          Generate New Addresses
        </Button>

        <div className="grid md:grid-cols-2 gap-4">
          {addresses.map((address, index) => (
            <Card
              key={index}
              className="p-4 cursor-pointer hover:bg-accent transition-colors"
              onClick={() => {
                navigator.clipboard.writeText(address);
                toast.success("Address copied!");
              }}
            >
              <div className="flex items-start justify-between">
                <div className="whitespace-pre-line text-sm">{address}</div>
                <Copy className="h-4 w-4 text-muted-foreground flex-shrink-0 ml-2" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
