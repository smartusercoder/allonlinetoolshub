import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function LeaseCalculator() {
  const [price, setPrice] = useState("30000");
  const [down, setDown] = useState("3000");
  const [rate, setRate] = useState("4.5");
  const [months, setMonths] = useState("36");

  const p = parseFloat(price) - parseFloat(down);
  const r = parseFloat(rate) / 100 / 12;
  const n = parseFloat(months);

  const payment = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

  const faqs = [
    {
      question: "How do lease payments work?",
      answer: "Lease payments are calculated based on the vehicle price, down payment, interest rate (money factor), and lease term. You pay for the depreciation plus interest over the lease period."
    },
    {
      question: "Should I make a down payment on a lease?",
      answer: "While a down payment reduces monthly payments, many experts recommend minimal or no down payment on leases since you don't own the vehicle."
    },
    {
      question: "What's a typical lease term?",
      answer: "Common lease terms are 24, 36, or 48 months. 36 months is most popular as it often aligns with warranty coverage."
    },
    {
      question: "Does this include taxes and fees?",
      answer: "This calculator shows base monthly payment only. Actual payments will be higher due to sales tax, registration, and other fees."
    },
    {
      question: "Can I use this for any type of lease?",
      answer: "Yes, this works for car leases, equipment leases, or any financed lease with an interest rate."
    }
  ];

  const howToSteps = [
    {
      name: "Enter vehicle price",
      text: "Input the total price or MSRP of the vehicle or item you're leasing."
    },
    {
      name: "Add down payment",
      text: "Enter any down payment or capitalized cost reduction you're making upfront."
    },
    {
      name: "Set interest rate",
      text: "Input the annual percentage rate (APR) or money factor converted to APR."
    },
    {
      name: "Choose lease term",
      text: "Enter the lease duration in months (typically 24, 36, or 48 months)."
    },
    {
      name: "View monthly payment",
      text: "The calculator displays your estimated monthly lease payment."
    }
  ];

  return (
    <ToolLayout 
      title="Lease Calculator" 
      description="Calculate lease payments"
      faqs={faqs}
      howToSteps={howToSteps}
    >
      <div className="space-y-4">
        <Input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" />
        <Input type="number" value={down} onChange={e => setDown(e.target.value)} placeholder="Down Payment" />
        <Input type="number" value={rate} onChange={e => setRate(e.target.value)} placeholder="Interest Rate %" />
        <Input type="number" value={months} onChange={e => setMonths(e.target.value)} placeholder="Lease Term (months)" />
        <Card className="p-6 text-center bg-primary/10">
          <div className="text-sm">Monthly Payment</div>
          <div className="text-4xl font-bold text-primary">${isNaN(payment) ? "0" : payment.toFixed(2)}</div>
        </Card>
      </div>
    </ToolLayout>
  );
}
