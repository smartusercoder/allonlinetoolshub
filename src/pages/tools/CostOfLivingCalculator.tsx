import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CostOfLivingCalculator = () => {
  const [currentSalary, setCurrentSalary] = useState("");
  const [currentIndex, setCurrentIndex] = useState("100");
  const [newIndex, setNewIndex] = useState("");
  const [result, setResult] = useState<{ equivalentSalary: number; difference: number } | null>(null);

  const calculate = () => {
    const salary = parseFloat(currentSalary);
    const current = parseFloat(currentIndex);
    const newIdx = parseFloat(newIndex);
    if (isNaN(salary) || isNaN(current) || isNaN(newIdx)) return;
    
    const equivalentSalary = salary * (newIdx / current);
    setResult({
      equivalentSalary,
      difference: equivalentSalary - salary
    });
  };

  return (
    <ToolLayout title="Cost of Living Calculator" description="Compare salaries between locations">
      <Card className="p-6">
        <div className="space-y-4 max-w-md mx-auto">
          <div>
            <Label>Current Salary ($)</Label>
            <Input type="number" value={currentSalary} onChange={(e) => setCurrentSalary(e.target.value)} placeholder="e.g., 75000" />
          </div>
          <div>
            <Label>Current Location Index (baseline = 100)</Label>
            <Input type="number" value={currentIndex} onChange={(e) => setCurrentIndex(e.target.value)} placeholder="100" />
          </div>
          <div>
            <Label>New Location Index</Label>
            <Input type="number" value={newIndex} onChange={(e) => setNewIndex(e.target.value)} placeholder="e.g., 120" />
          </div>
          <Button onClick={calculate} className="w-full">Calculate Equivalent Salary</Button>
          {result && (
            <div className="space-y-4 mt-4">
              <div className="p-4 bg-primary/10 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Equivalent Salary Needed</p>
                <p className="text-3xl font-bold text-primary">${result.equivalentSalary.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Difference</p>
                <p className={`font-bold ${result.difference >= 0 ? "text-red-600" : "text-green-600"}`}>
                  {result.difference >= 0 ? "+" : ""}${result.difference.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </p>
              </div>
              <p className="text-xs text-muted-foreground text-center">Higher index = higher cost of living</p>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
};

export default CostOfLivingCalculator;
