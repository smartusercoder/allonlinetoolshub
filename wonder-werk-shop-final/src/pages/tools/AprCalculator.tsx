import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AprCalculator = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [fees, setFees] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [result, setResult] = useState<{
    apr: number;
    monthlyPayment: number;
    totalCost: number;
    totalInterest: number;
  } | null>(null);

  const calculate = () => {
    const amount = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12;
    const totalFees = parseFloat(fees) || 0;
    const months = parseInt(loanTerm) * 12;
    
    if (isNaN(amount) || isNaN(rate) || isNaN(months)) return;
    
    // Calculate monthly payment
    const monthlyPayment = (amount * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
    
    // Total paid over loan term
    const totalPaid = monthlyPayment * months;
    const totalInterest = totalPaid - amount;
    const totalCost = totalPaid + totalFees;
    
    // Calculate APR (simplified formula including fees)
    const apr = ((totalInterest + totalFees) / amount / (months / 12)) * 100;
    
    setResult({
      apr,
      monthlyPayment,
      totalCost,
      totalInterest,
    });
  };

  return (
    <ToolLayout
      title="APR Calculator"
      description="Calculate the Annual Percentage Rate including fees"
    >
      <Card className="p-6">
        <div className="space-y-4 max-w-md mx-auto">
          <div>
            <Label htmlFor="loanAmount">Loan Amount ($)</Label>
            <Input
              id="loanAmount"
              type="number"
              min="0"
              placeholder="e.g., 20000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="interestRate">Interest Rate (%)</Label>
            <Input
              id="interestRate"
              type="number"
              min="0"
              step="0.01"
              placeholder="e.g., 6.5"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="fees">Upfront Fees ($)</Label>
            <Input
              id="fees"
              type="number"
              min="0"
              placeholder="e.g., 500"
              value={fees}
              onChange={(e) => setFees(e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="loanTerm">Loan Term (years)</Label>
            <Input
              id="loanTerm"
              type="number"
              min="1"
              placeholder="e.g., 5"
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
            />
          </div>
          
          <Button onClick={calculate} className="w-full">Calculate APR</Button>
          
          {result && (
            <div className="mt-6 space-y-4">
              <div className="p-4 bg-primary/10 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Annual Percentage Rate (APR)</p>
                <p className="text-4xl font-bold text-primary">{result.apr.toFixed(2)}%</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Monthly Payment</p>
                  <p className="text-xl font-bold">${result.monthlyPayment.toFixed(2)}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Total Interest</p>
                  <p className="text-xl font-bold">${result.totalInterest.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Total Cost (with fees)</p>
                <p className="text-xl font-bold">${result.totalCost.toFixed(2)}</p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
};

export default AprCalculator;
