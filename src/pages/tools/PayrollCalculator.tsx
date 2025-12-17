import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const PayrollCalculator = () => {
  const [grossPay, setGrossPay] = useState("");
  const [federalTax, setFederalTax] = useState("22");
  const [stateTax, setStateTax] = useState("5");
  const [socialSecurity, setSocialSecurity] = useState("6.2");
  const [medicare, setMedicare] = useState("1.45");
  const [result, setResult] = useState<{ net: number; totalTax: number; breakdown: { name: string; amount: number }[] } | null>(null);

  const calculate = () => {
    const gross = parseFloat(grossPay);
    if (isNaN(gross)) return;
    
    const breakdown = [
      { name: "Federal Tax", amount: gross * (parseFloat(federalTax) / 100) },
      { name: "State Tax", amount: gross * (parseFloat(stateTax) / 100) },
      { name: "Social Security", amount: gross * (parseFloat(socialSecurity) / 100) },
      { name: "Medicare", amount: gross * (parseFloat(medicare) / 100) }
    ];
    const totalTax = breakdown.reduce((sum, item) => sum + item.amount, 0);
    setResult({ net: gross - totalTax, totalTax, breakdown });
  };

  return (
    <ToolLayout title="Payroll Calculator" description="Calculate payroll deductions">
      <Card className="p-6">
        <div className="space-y-4 max-w-md mx-auto">
          <div>
            <Label>Gross Pay ($)</Label>
            <Input type="number" value={grossPay} onChange={(e) => setGrossPay(e.target.value)} placeholder="e.g., 5000" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Federal Tax (%)</Label>
              <Input type="number" value={federalTax} onChange={(e) => setFederalTax(e.target.value)} />
            </div>
            <div>
              <Label>State Tax (%)</Label>
              <Input type="number" value={stateTax} onChange={(e) => setStateTax(e.target.value)} />
            </div>
            <div>
              <Label>Social Security (%)</Label>
              <Input type="number" value={socialSecurity} onChange={(e) => setSocialSecurity(e.target.value)} />
            </div>
            <div>
              <Label>Medicare (%)</Label>
              <Input type="number" value={medicare} onChange={(e) => setMedicare(e.target.value)} />
            </div>
          </div>
          <Button onClick={calculate} className="w-full">Calculate</Button>
          {result && (
            <div className="space-y-4 mt-4">
              <div className="p-4 bg-primary/10 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Net Pay</p>
                <p className="text-3xl font-bold text-primary">${result.net.toFixed(2)}</p>
              </div>
              <div className="space-y-2">
                {result.breakdown.map(item => (
                  <div key={item.name} className="flex justify-between p-2 bg-muted rounded">
                    <span>{item.name}</span>
                    <span>-${item.amount.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
};

export default PayrollCalculator;
