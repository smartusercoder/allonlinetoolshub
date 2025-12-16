import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function HourlyWage() {
  const [salary, setSalary] = useState("60000");
  const [hours, setHours] = useState("40");

  const annual = parseFloat(salary);
  const weekly = parseFloat(hours);
  const hourly = annual / (weekly * 52);

  const faqs = [
    {
      question: "How is hourly wage calculated from salary?",
      answer: "Divide your annual salary by the number of hours you work per year. The formula is: Annual Salary ÷ (Hours per Week × 52 weeks)."
    },
    {
      question: "Should I include overtime in calculations?",
      answer: "No, use your regular scheduled hours. Overtime is typically paid at a different rate and should be calculated separately."
    },
    {
      question: "Does this include benefits?",
      answer: "No, this calculates base hourly rate from salary only. Benefits, bonuses, and other compensation are not included."
    },
    {
      question: "What if I work irregular hours?",
      answer: "Use your average weekly hours. For most accurate results, calculate your average over a typical month or quarter."
    },
    {
      question: "Is this before or after taxes?",
      answer: "This calculates gross hourly wage before taxes and deductions. Your take-home pay will be lower after taxes."
    }
  ];

  const howToSteps = [
    {
      name: "Enter annual salary",
      text: "Input your yearly salary amount before taxes (gross annual income)."
    },
    {
      name: "Enter weekly hours",
      text: "Type the average number of hours you work each week."
    },
    {
      name: "View hourly rate",
      text: "The calculator shows your equivalent hourly wage based on a 52-week year."
    }
  ];

  return (
    <ToolLayout 
      title="Hourly Wage Calculator" 
      description="Convert salary to hourly rate"
      faqs={faqs}
      howToSteps={howToSteps}
    >
      <div className="space-y-4">
        <Input type="number" value={salary} onChange={e => setSalary(e.target.value)} placeholder="Annual Salary" />
        <Input type="number" value={hours} onChange={e => setHours(e.target.value)} placeholder="Hours per Week" />
        <Card className="p-6 text-center bg-primary/10">
          <div className="text-sm">Hourly Wage</div>
          <div className="text-4xl font-bold text-primary">${hourly.toFixed(2)}/hr</div>
        </Card>
      </div>
    </ToolLayout>
  );
}
