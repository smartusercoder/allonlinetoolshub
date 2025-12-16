import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy } from "lucide-react";
import { toast } from "sonner";

export default function InvoiceNumberGenerator() {
  const [prefix, setPrefix] = useState("INV");
  const [format, setFormat] = useState("sequential");
  const [startNumber, setStartNumber] = useState("1001");

  const generateInvoiceNumber = () => {
    const year = new Date().getFullYear();
    const month = String(new Date().getMonth() + 1).padStart(2, '0');
    const num = startNumber.padStart(4, '0');
    
    if (format === "sequential") {
      return `${prefix}-${num}`;
    } else if (format === "date") {
      return `${prefix}-${year}${month}-${num}`;
    } else {
      return `${prefix}-${year}-${num}`;
    }
  };

  const invoiceNumber = generateInvoiceNumber();

  return (
    <ToolLayout
      title="Invoice Number Generator"
      description="Generate formatted invoice numbers"
    >
      <Card className="p-6 space-y-4">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="prefix">Prefix</Label>
            <Input
              id="prefix"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              placeholder="INV"
            />
          </div>

          <div className="space-y-2">
            <Label>Format</Label>
            <Select value={format} onValueChange={setFormat}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sequential">Sequential</SelectItem>
                <SelectItem value="date">With Date</SelectItem>
                <SelectItem value="year">With Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="start">Start Number</Label>
            <Input
              id="start"
              type="number"
              value={startNumber}
              onChange={(e) => setStartNumber(e.target.value)}
            />
          </div>
        </div>

        <Card className="p-8 bg-primary/10 text-center">
          <div className="text-sm text-muted-foreground mb-2">Generated Invoice Number</div>
          <div className="text-4xl font-bold text-primary mb-4 font-mono">{invoiceNumber}</div>
          <Button onClick={() => {
            navigator.clipboard.writeText(invoiceNumber);
            toast.success("Invoice number copied!");
          }}>
            <Copy className="mr-2 h-4 w-4" />
            Copy Invoice Number
          </Button>
        </Card>
      </Card>
    </ToolLayout>
  );
}
