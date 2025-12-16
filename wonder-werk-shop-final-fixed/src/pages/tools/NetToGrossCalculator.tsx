import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const NetToGrossCalculator = () => {
  const [netSalary, setNetSalary] = useState("");
  const [taxRate, setTaxRate] = useState("25");
  const [result, setResult] = useState<{ gross: number; taxes: number } | null>(null);

  const calculate = () => {
    const net = parseFloat(netSalary);
    const rate = parseFloat(taxRate) / 100;
    if (isNaN(net) || isNaN(rate)) return;
    const gross = net / (1 - rate);
    setResult({
      gross,
      taxes: gross - net
    });
  };

  return (
    <ToolLayout title="Net to Gross Calculator" description="Calculate gross salary from net pay">
      <Card className="p-6">
        <div className="space-y-4 max-w-md mx-auto">
          <div>
            <Label>Net Salary ($)</Label>
            <Input type="number" value={netSalary} onChange={(e) => setNetSalary(e.target.value)} placeholder="e.g., 4000" />
          </div>
          <div>
            <Label>Tax Rate (%)</Label>
            <Input type="number" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} placeholder="e.g., 25" />
          </div>
          <Button onClick={calculate} className="w-full">Calculate Gross Salary</Button>
          {result && (
            <div className="space-y-4 mt-4">
              <div className="p-4 bg-primary/10 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Gross Salary</p>
                <p className="text-3xl font-bold text-primary">${result.gross.toFixed(2)}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Taxes Withheld</p>
                <p className="text-xl font-bold">${result.taxes.toFixed(2)}</p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
};

export default NetToGrossCalculator;
