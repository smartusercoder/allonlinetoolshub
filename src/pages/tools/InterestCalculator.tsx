import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const InterestCalculator = () => {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [compounding, setCompounding] = useState("yearly");
  const [result, setResult] = useState<{
    simple: number;
    compound: number;
    simpleInterest: number;
    compoundInterest: number;
  } | null>(null);

  const calculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);
    
    if (isNaN(p) || isNaN(r) || isNaN(t)) return;
    
    const compoundingPeriods: Record<string, number> = {
      yearly: 1,
      "semi-annually": 2,
      quarterly: 4,
      monthly: 12,
      daily: 365,
    };
    
    const n = compoundingPeriods[compounding];
    
    // Simple interest
    const simpleInterest = p * r * t;
    const simple = p + simpleInterest;
    
    // Compound interest
    const compound = p * Math.pow(1 + r / n, n * t);
    const compoundInterest = compound - p;
    
    setResult({ simple, compound, simpleInterest, compoundInterest });
  };

  return (
    <ToolLayout
      title="Interest Calculator"
      description="Calculate simple and compound interest on your savings"
    >
      <Card className="p-6">
        <div className="space-y-4 max-w-md mx-auto">
          <div>
            <Label htmlFor="principal">Principal Amount ($)</Label>
            <Input
              id="principal"
              type="number"
              min="0"
              placeholder="e.g., 10000"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="rate">Annual Interest Rate (%)</Label>
            <Input
              id="rate"
              type="number"
              min="0"
              step="0.01"
              placeholder="e.g., 5"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="time">Time Period (years)</Label>
            <Input
              id="time"
              type="number"
              min="0"
              step="0.5"
              placeholder="e.g., 5"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          
          <div>
            <Label>Compounding Frequency</Label>
            <Select value={compounding} onValueChange={setCompounding}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yearly">Yearly</SelectItem>
                <SelectItem value="semi-annually">Semi-annually</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button onClick={calculate} className="w-full">Calculate</Button>
          
          {result && (
            <div className="mt-6 space-y-4">
              <div className="p-4 bg-primary/10 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Compound Interest Total</p>
                <p className="text-3xl font-bold text-primary">${result.compound.toFixed(2)}</p>
                <p className="text-sm text-green-600">+${result.compoundInterest.toFixed(2)} interest</p>
              </div>
              
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Simple Interest Total</p>
                <p className="text-2xl font-bold">${result.simple.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">+${result.simpleInterest.toFixed(2)} interest</p>
              </div>
              
              <div className="p-4 bg-green-500/10 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Extra with Compound Interest</p>
                <p className="text-xl font-bold text-green-600">
                  +${(result.compoundInterest - result.simpleInterest).toFixed(2)}
                </p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
};

export default InterestCalculator;
