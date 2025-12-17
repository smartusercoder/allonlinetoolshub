import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

const categories = [
  { id: "housing", name: "Housing", recommended: 30 },
  { id: "transportation", name: "Transportation", recommended: 15 },
  { id: "food", name: "Food", recommended: 15 },
  { id: "utilities", name: "Utilities", recommended: 10 },
  { id: "healthcare", name: "Healthcare", recommended: 5 },
  { id: "savings", name: "Savings", recommended: 10 },
  { id: "entertainment", name: "Entertainment", recommended: 5 },
  { id: "other", name: "Other", recommended: 10 },
];

const BudgetCalculator = () => {
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState<Record<string, string>>({});

  const totalExpenses = Object.values(expenses).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
  const incomeNum = parseFloat(income) || 0;
  const remaining = incomeNum - totalExpenses;

  return (
    <ToolLayout
      title="Budget Calculator"
      description="Create and track your monthly budget"
    >
      <Card className="p-6">
        <div className="space-y-6">
          <div className="max-w-md">
            <Label htmlFor="income">Monthly Income ($)</Label>
            <Input
              id="income"
              type="number"
              min="0"
              placeholder="e.g., 5000"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
            />
          </div>
          
          {incomeNum > 0 && (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                {categories.map((cat) => {
                  const value = parseFloat(expenses[cat.id] || "0");
                  const percentage = incomeNum > 0 ? (value / incomeNum) * 100 : 0;
                  const isOver = percentage > cat.recommended;
                  
                  return (
                    <div key={cat.id} className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor={cat.id}>{cat.name}</Label>
                        <span className="text-xs text-muted-foreground">
                          Recommended: {cat.recommended}%
                        </span>
                      </div>
                      <Input
                        id={cat.id}
                        type="number"
                        min="0"
                        placeholder="0"
                        value={expenses[cat.id] || ""}
                        onChange={(e) => setExpenses({ ...expenses, [cat.id]: e.target.value })}
                      />
                      <div className="flex items-center gap-2">
                        <Progress 
                          value={Math.min(percentage, 100)} 
                          className={`h-2 ${isOver ? "[&>div]:bg-destructive" : ""}`}
                        />
                        <span className={`text-xs ${isOver ? "text-destructive" : "text-muted-foreground"}`}>
                          {percentage.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Total Income</p>
                  <p className="text-2xl font-bold">${incomeNum.toFixed(2)}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Total Expenses</p>
                  <p className="text-2xl font-bold">${totalExpenses.toFixed(2)}</p>
                </div>
                <div className={`p-4 rounded-lg text-center ${remaining >= 0 ? "bg-green-500/10" : "bg-destructive/10"}`}>
                  <p className="text-sm text-muted-foreground">Remaining</p>
                  <p className={`text-2xl font-bold ${remaining >= 0 ? "text-green-600" : "text-destructive"}`}>
                    ${remaining.toFixed(2)}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
};

export default BudgetCalculator;
