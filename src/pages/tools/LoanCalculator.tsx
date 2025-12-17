import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { UsageGuide } from "@/components/UsageGuide";
import { toolFAQs } from "@/data/faqData";

export default function LoanCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");

  const calculatePayment = () => {
    if (!principal || !rate || !years) return 0;
    
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100 / 12;
    const n = parseFloat(years) * 12;
    
    if (r === 0) return p / n;
    
    return (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  };

  const monthlyPayment = calculatePayment();
  const totalPayment = monthlyPayment * (parseFloat(years) || 0) * 12;
  const totalInterest = totalPayment - (parseFloat(principal) || 0);

  return (
    <ToolLayout
      title="Loan Calculator"
      description="Calculate monthly loan payments, total interest, and amortization. Free loan payment calculator for mortgages, auto loans, and personal loans."
      keywords={[
        "loan calculator", "loan payment calculator", "mortgage calculator", "car loan calculator",
        "monthly payment calculator", "interest calculator", "amortization calculator"
      ]}
      category="math"
      faqs={toolFAQs["loan-calculator"]}
      howToSteps={[
        {
          name: "Enter Loan Amount",
          text: "Input the total amount you want to borrow (principal). This is the purchase price minus any down payment you'll make."
        },
        {
          name: "Enter Interest Rate",
          text: "Input the annual interest rate as a percentage. This is the APR (Annual Percentage Rate) your lender offers."
        },
        {
          name: "Enter Loan Term",
          text: "Enter how many years you'll take to repay the loan. Common terms are 15 or 30 years for mortgages, 3-7 years for auto loans."
        },
        {
          name: "Review Results",
          text: "See your monthly payment, total amount you'll pay over the life of the loan, and total interest paid. Use this to compare different loan options."
        }
      ]}
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Enter loan amount (principal)",
            "Enter annual interest rate",
            "Enter loan term in years",
            "See monthly payment, total payment, and total interest"
          ]}
          tips={[
            "Perfect for mortgages, car loans, personal loans",
            "Helps compare different loan offers",
            "Shows true cost including interest",
            "Plan your budget with accurate monthly payments"
          ]}
          example="$200,000 loan at 5% for 30 years"
        />
      </div>
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium">
              Loan Amount ($)
            </label>
            <Input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              placeholder="Enter loan amount"
              min="0"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Annual Interest Rate (%)
            </label>
            <Input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="Enter interest rate"
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Loan Term (Years)
            </label>
            <Input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              placeholder="Enter loan term"
              min="1"
            />
          </div>

          {principal && rate && years && (
            <div className="space-y-4 pt-4 border-t">
              <div className="p-4 bg-primary/10 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">
                  Monthly Payment
                </div>
                <div className="text-3xl font-bold text-primary">
                  ${monthlyPayment.toFixed(2)}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">
                    Total Payment
                  </div>
                  <div className="text-xl font-bold">
                    ${totalPayment.toFixed(2)}
                  </div>
                </div>
                
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">
                    Total Interest
                  </div>
                  <div className="text-xl font-bold text-orange-600">
                    ${totalInterest.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
}
