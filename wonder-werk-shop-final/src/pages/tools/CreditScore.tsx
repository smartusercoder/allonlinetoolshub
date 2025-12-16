import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CreditScore() {
  const [income, setIncome] = useState("");
  const [debt, setDebt] = useState("");
  const [history, setHistory] = useState("5");

  const calculate = () => {
    const inc = parseFloat(income) || 0;
    const dbt = parseFloat(debt) || 0;
    const yrs = parseFloat(history) || 0;

    let score = 300;
    const debtRatio = inc > 0 ? (dbt / inc) * 100 : 100;

    if (debtRatio < 30) score += 200;
    else if (debtRatio < 50) score += 150;
    else score += 50;

    score += Math.min(yrs * 40, 200);
    score = Math.min(850, score);

    return {
      score: Math.round(score),
      rating: score >= 750 ? "Excellent" : score >= 650 ? "Good" : score >= 550 ? "Fair" : "Poor"
    };
  };

  const result = income && debt ? calculate() : null;

  return (
    <ToolLayout title="Credit Score Estimator" description="Estimate credit score">
      <div className="space-y-6">
        <Input type="number" value={income} onChange={e => setIncome(e.target.value)} placeholder="Monthly Income" />
        <Input type="number" value={debt} onChange={e => setDebt(e.target.value)} placeholder="Total Debt" />
        <Input type="number" value={history} onChange={e => setHistory(e.target.value)} placeholder="Credit History (years)" />
        {result && (
          <Card className="p-6 text-center bg-primary/10">
            <div className="text-5xl font-bold text-primary">{result.score}</div>
            <div className="text-lg mt-2">{result.rating}</div>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}
