import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function NumberFormatter() {
  const [number, setNumber] = useState("1234567.89");

  const num = parseFloat(number) || 0;

  return (
    <ToolLayout title="Number Formatter" description="Format numbers in different styles">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Enter Number</Label>
          <Input value={number} onChange={(e) => setNumber(e.target.value)} placeholder="1234567.89" />
        </div>
        <div className="grid gap-2">
          <Card className="p-3"><strong>With Commas:</strong> {num.toLocaleString()}</Card>
          <Card className="p-3"><strong>Currency (USD):</strong> ${num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Card>
          <Card className="p-3"><strong>Scientific:</strong> {num.toExponential()}</Card>
          <Card className="p-3"><strong>Fixed (2 decimals):</strong> {num.toFixed(2)}</Card>
          <Card className="p-3"><strong>Percentage:</strong> {(num * 100).toFixed(2)}%</Card>
        </div>
      </div>
    </ToolLayout>
  );
}
