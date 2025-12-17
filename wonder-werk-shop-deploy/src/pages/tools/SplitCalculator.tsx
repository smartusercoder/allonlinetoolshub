import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function SplitCalculator() {
  const [total, setTotal] = useState("100");
  const [people, setPeople] = useState("4");

  const amount = parseFloat(total) / parseFloat(people);

  const faqs = [
    {
      question: "How do I split a bill evenly?",
      answer: "Enter the total amount and the number of people. The calculator instantly shows how much each person should pay for an equal split."
    },
    {
      question: "Can I include tips in the calculation?",
      answer: "Yes, add the tip amount to the total before entering it. For example, if the bill is $100 and you want to add a 20% tip, enter $120 as the total."
    },
    {
      question: "What if the split isn't even?",
      answer: "This tool divides evenly. For unequal splits where people pay different amounts, you'll need to calculate individual shares separately."
    },
    {
      question: "Does it handle decimal results?",
      answer: "Yes, the calculator displays results to two decimal places for precise penny-level accuracy."
    }
  ];

  const howToSteps = [
    {
      name: "Enter total amount",
      text: "Type the total cost you want to split among people (e.g., restaurant bill, shared expenses)."
    },
    {
      name: "Enter number of people",
      text: "Input how many people will be splitting the cost equally."
    },
    {
      name: "View individual share",
      text: "The calculator instantly shows the exact amount each person needs to pay."
    }
  ];

  return (
    <ToolLayout 
      title="Split Calculator" 
      description="Split costs between people"
      faqs={faqs}
      howToSteps={howToSteps}
    >
      <div className="space-y-4">
        <Input type="number" value={total} onChange={e => setTotal(e.target.value)} placeholder="Total Amount" />
        <Input type="number" value={people} onChange={e => setPeople(e.target.value)} placeholder="Number of People" min="1" />
        <Card className="p-8 text-center bg-primary/10">
          <div className="text-sm text-muted-foreground">Each Person Pays</div>
          <div className="text-5xl font-bold text-primary">${isNaN(amount) ? "0.00" : amount.toFixed(2)}</div>
        </Card>
      </div>
    </ToolLayout>
  );
}
