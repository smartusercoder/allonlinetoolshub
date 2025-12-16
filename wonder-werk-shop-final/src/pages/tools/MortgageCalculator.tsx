import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { UsageGuide } from "@/components/UsageGuide";

export default function MortgageCalculator() {
  const [principal, setPrincipal] = useState("300000");
  const [rate, setRate] = useState("3.5");
  const [years, setYears] = useState("30");
  const [downPayment, setDownPayment] = useState("60000");

  const loanAmount = parseFloat(principal) - parseFloat(downPayment);
  const monthlyRate = parseFloat(rate) / 100 / 12;
  const numPayments = parseFloat(years) * 12;

  const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
  const totalPayment = monthlyPayment * numPayments;
  const totalInterest = totalPayment - loanAmount;

  return (
    <ToolLayout
      title="Mortgage Calculator"
      description="Calculate monthly mortgage payments"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Enter the home price",
            "Enter your down payment amount",
            "Set the interest rate (annual percentage)",
            "Choose the loan term in years"
          ]}
          tips={[
            "20% down payment typically avoids PMI insurance",
            "Interest rates vary based on credit score and market",
            "30-year loans have lower payments but more total interest",
            "Use this to budget before buying a home"
          ]}
          example="$300k home - $60k down = $1,264/month at 3.5% for 30 years"
        />
      </div>
      <Card className="p-6 mt-6">
        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium">Home Price ($)</label>
            <Input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              min="0"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Down Payment ($)</label>
            <Input
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
              min="0"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Interest Rate (%)</label>
            <Input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Loan Term (Years)</label>
            <Input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              min="1"
            />
          </div>

          <div className="space-y-4 pt-4 border-t">
            <div className="p-4 bg-primary/10 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Monthly Payment</div>
              <div className="text-3xl font-bold text-primary">
                ${isNaN(monthlyPayment) ? "0" : monthlyPayment.toFixed(2)}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Loan Amount</div>
                <div className="text-lg font-bold">
                  ${loanAmount.toLocaleString()}
                </div>
              </div>
              
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Total Payment</div>
                <div className="text-lg font-bold">
                  ${isNaN(totalPayment) ? "0" : totalPayment.toLocaleString(undefined, {maximumFractionDigits: 0})}
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Total Interest</div>
                <div className="text-lg font-bold text-orange-600">
                  ${isNaN(totalInterest) ? "0" : totalInterest.toLocaleString(undefined, {maximumFractionDigits: 0})}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </ToolLayout>
  );
}
