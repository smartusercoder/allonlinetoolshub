import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function PaycheckCalculator() {
  const [salary, setSalary] = useState("60000");
  const [tax, setTax] = useState("25");
  const [frequency, setFrequency] = useState("26");

  const annual = parseFloat(salary);
  const taxRate = parseFloat(tax) / 100;
  const periods = parseFloat(frequency);

  const gross = annual / periods;
  const taxes = gross * taxRate;
  const net = gross - taxes;

  return (
    <ToolLayout title="Paycheck Calculator" description="Calculate take-home pay">
      <div className="space-y-4">
        <Input type="number" value={salary} onChange={e => setSalary(e.target.value)} placeholder="Annual Salary" />
        <Input type="number" value={tax} onChange={e => setTax(e.target.value)} placeholder="Tax Rate %" />
        <select value={frequency} onChange={e => setFrequency(e.target.value)} className="w-full p-2 border rounded">
          <option value="12">Monthly (12/year)</option>
          <option value="24">Semi-monthly (24/year)</option>
          <option value="26">Bi-weekly (26/year)</option>
          <option value="52">Weekly (52/year)</option>
        </select>
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4 text-center">
            <div className="text-lg font-bold">${gross.toFixed(2)}</div>
            <div className="text-xs">Gross</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-lg font-bold text-red-600">${taxes.toFixed(2)}</div>
            <div className="text-xs">Taxes</div>
          </Card>
          <Card className="p-4 text-center bg-primary/10">
            <div className="text-lg font-bold text-primary">${net.toFixed(2)}</div>
            <div className="text-xs">Net Pay</div>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
