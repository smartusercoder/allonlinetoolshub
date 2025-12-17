import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DollarSign } from "lucide-react";

const CurrencyFormat = () => {
  const [amount, setAmount] = useState("");

  const formats = [
    { name: "US Dollar", symbol: "$", format: (n: number) => `$${n.toFixed(2)}` },
    { name: "Euro", symbol: "€", format: (n: number) => `€${n.toFixed(2)}` },
    { name: "British Pound", symbol: "£", format: (n: number) => `£${n.toFixed(2)}` },
    { name: "Japanese Yen", symbol: "¥", format: (n: number) => `¥${Math.round(n)}` },
    { name: "Indian Rupee", symbol: "₹", format: (n: number) => `₹${n.toFixed(2)}` },
    { name: "Chinese Yuan", symbol: "¥", format: (n: number) => `¥${n.toFixed(2)}` },
  ];

  const num = parseFloat(amount) || 0;

  return (
    <ToolLayout
      title="Currency Formatter"
      description="Format numbers as different currencies"
    >
      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="1234.56"
          />
        </div>

        {amount && (
          <div className="space-y-2 pt-4 border-t">
            {formats.map((fmt, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-md">
                <span className="text-sm text-muted-foreground">{fmt.name}</span>
                <span className="font-mono font-bold">{fmt.format(num)}</span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </ToolLayout>
  );
};

export default CurrencyFormat;
