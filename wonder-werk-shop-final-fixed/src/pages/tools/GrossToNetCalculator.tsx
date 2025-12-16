import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const GrossToNetCalculator = () => {
  const [grossSalary, setGrossSalary] = useState("");
  const [taxRate, setTaxRate] = useState("25");
  const [result, setResult] = useState<{ net: number; taxes: number } | null>(null);

  const calculate = () => {
    const gross = parseFloat(grossSalary);
    const rate = parseFloat(taxRate) / 100;
    if (isNaN(gross) || isNaN(rate)) return;
    const taxes = gross * rate;
    setResult({
      net: gross - taxes,
      taxes
    });
  };

  return (
    <ToolLayout title="Gross to Net Calculator" description="Calculate net salary from gross pay">
      <Card className="p-6">
        <div className="space-y-4 max-w-md mx-auto">
          <div>
            <Label>Gross Salary ($)</Label>
            <Input type="number" value={grossSalary} onChange={(e) => setGrossSalary(e.target.value)} placeholder="e.g., 5000" />
          </div>
          <div>
            <Label>Tax Rate (%)</Label>
            <Input type="number" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} placeholder="e.g., 25" />
          </div>
          <Button onClick={calculate} className="w-full">Calculate Net Salary</Button>
          {result && (
            <div className="space-y-4 mt-4">
              <div className="p-4 bg-primary/10 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Net Salary (Take-Home)</p>
                <p className="text-3xl font-bold text-primary">${result.net.toFixed(2)}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Taxes Deducted</p>
                <p className="text-xl font-bold">${result.taxes.toFixed(2)}</p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
};

export default GrossToNetCalculator;
