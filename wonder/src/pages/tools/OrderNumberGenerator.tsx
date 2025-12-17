import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy } from "lucide-react";
import { toast } from "sonner";

export default function OrderNumberGenerator() {
  const [prefix, setPrefix] = useState("ORD");
  const [length, setLength] = useState("8");

  const generateOrderNumber = () => {
    const num = length;
    const random = Math.floor(Math.random() * Math.pow(10, parseInt(num))).toString().padStart(parseInt(num), '0');
    return `${prefix}${random}`;
  };

  const [orderNumber, setOrderNumber] = useState(generateOrderNumber());

  return (
    <ToolLayout
      title="Order Number Generator"
      description="Generate unique order numbers"
    >
      <Card className="p-6 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="prefix">Prefix</Label>
            <Input
              id="prefix"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              placeholder="ORD"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="length">Number Length</Label>
            <Input
              id="length"
              type="number"
              min="4"
              max="12"
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
          </div>
        </div>

        <Card className="p-8 bg-primary/10 text-center">
          <div className="text-sm text-muted-foreground mb-2">Generated Order Number</div>
          <div className="text-4xl font-bold text-primary mb-4 font-mono">{orderNumber}</div>
          <div className="flex gap-2 justify-center">
            <Button onClick={() => setOrderNumber(generateOrderNumber())}>
              Generate New
            </Button>
            <Button onClick={() => {
              navigator.clipboard.writeText(orderNumber);
              toast.success("Order number copied!");
            }} variant="outline">
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </Button>
          </div>
        </Card>
      </Card>
    </ToolLayout>
  );
}
