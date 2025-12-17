import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const DebtPayoffCalculator = () => {
  const [debtAmount, setDebtAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState("");
  const [result, setResult] = useState<{
    months: number;
    totalInterest: number;
    totalPaid: number;
    payoffDate: string;
  } | null>(null);

  const calculate = () => {
    const debt = parseFloat(debtAmount);
    const rate = parseFloat(interestRate) / 100 / 12;
    const payment = parseFloat(monthlyPayment);
    
    if (isNaN(debt) || isNaN(rate) || isNaN(payment) || payment <= debt * rate) {
      return;
    }
    
    let balance = debt;
    let months = 0;
    let totalInterest = 0;
    
    while (balance > 0 && months < 1200) {
      const interest = balance * rate;
      totalInterest += interest;
      balance = balance + interest - payment;
      months++;
      
      if (balance < 0) balance = 0;
    }
    
    const totalPaid = debt + totalInterest;
    const payoffDate = new Date();
    payoffDate.setMonth(payoffDate.getMonth() + months);
    
    setResult({
      months,
      totalInterest,
      totalPaid,
      payoffDate: payoffDate.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    });
  };

  return (
    <ToolLayout
      title="Debt Payoff Calculator"
      description="Calculate how long it will take to pay off your debt"
    >
      <Card className="p-6">
        <div className="space-y-4 max-w-md mx-auto">
          <div>
            <Label htmlFor="debt">Total Debt ($)</Label>
            <Input
              id="debt"
              type="number"
              min="0"
              placeholder="e.g., 10000"
              value={debtAmount}
              onChange={(e) => setDebtAmount(e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="rate">Annual Interest Rate (%)</Label>
            <Input
              id="rate"
              type="number"
              min="0"
              step="0.1"
              placeholder="e.g., 15"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="payment">Monthly Payment ($)</Label>
            <Input
              id="payment"
              type="number"
              min="0"
              placeholder="e.g., 300"
              value={monthlyPayment}
              onChange={(e) => setMonthlyPayment(e.target.value)}
            />
          </div>
          
          <Button onClick={calculate} className="w-full">Calculate</Button>
          
          {result && (
            <div className="mt-6 space-y-4">
              <div className="p-4 bg-primary/10 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Time to Payoff</p>
                <p className="text-4xl font-bold text-primary">
                  {Math.floor(result.months / 12)} years {result.months % 12} months
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Debt free by {result.payoffDate}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Total Interest</p>
                  <p className="text-xl font-bold text-destructive">${result.totalInterest.toFixed(2)}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Total Paid</p>
                  <p className="text-xl font-bold">${result.totalPaid.toFixed(2)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
};

export default DebtPayoffCalculator;
