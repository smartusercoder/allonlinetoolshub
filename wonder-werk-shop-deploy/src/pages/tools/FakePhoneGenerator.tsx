import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RefreshCw, Copy } from "lucide-react";
import { toast } from "sonner";

export default function FakePhoneGenerator() {
  const [phones, setPhones] = useState<string[]>([]);

  const areaCodes = ["555", "202", "312", "415", "213", "646", "305", "617", "469", "713"];

  const generatePhone = () => {
    const area = areaCodes[Math.floor(Math.random() * areaCodes.length)];
    const exchange = Math.floor(Math.random() * 900) + 100;
    const number = Math.floor(Math.random() * 9000) + 1000;
    return `(${area}) ${exchange}-${number}`;
  };

  const generatePhones = () => {
    setPhones(Array.from({ length: 20 }, generatePhone));
  };

  if (phones.length === 0) {
    generatePhones();
  }

  return (
    <ToolLayout
      title="Fake Phone Number Generator"
      description="Generate fake phone numbers for testing"
    >
      <div className="space-y-4">
        <Button onClick={generatePhones} className="w-full">
          <RefreshCw className="mr-2 h-4 w-4" />
          Generate New Phone Numbers
        </Button>

        <div className="grid md:grid-cols-4 gap-4">
          {phones.map((phone, index) => (
            <Card
              key={index}
              className="p-4 cursor-pointer hover:bg-accent transition-colors text-center"
              onClick={() => {
                navigator.clipboard.writeText(phone);
                toast.success("Phone number copied!");
              }}
            >
              <div className="flex items-center justify-center gap-2">
                <span className="font-mono">{phone}</span>
                <Copy className="h-4 w-4 text-muted-foreground" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
