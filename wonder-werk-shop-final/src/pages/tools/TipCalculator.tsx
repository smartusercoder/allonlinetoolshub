import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UsageGuide } from "@/components/UsageGuide";

const TipCalculator = () => {
  const [bill, setBill] = useState("");
  const [tipPercent, setTipPercent] = useState(15);
  const [people, setPeople] = useState(1);

  const calculate = () => {
    if (!bill || Number(bill) <= 0) return null;

    const billAmount = Number(bill);
    const tipAmount = (billAmount * tipPercent) / 100;
    const total = billAmount + tipAmount;
    const perPerson = total / people;
    const tipPerPerson = tipAmount / people;

    return {
      tipAmount: tipAmount.toFixed(2),
      total: total.toFixed(2),
      perPerson: perPerson.toFixed(2),
      tipPerPerson: tipPerPerson.toFixed(2)
    };
  };

  const result = calculate();

  return (
    <ToolLayout
      title="Tip Calculator"
      description="Calculate tips and split bills easily"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Enter the bill amount",
            "Adjust tip percentage using slider or preset buttons",
            "Set number of people to split the bill",
            "See tip amount, total, and per-person breakdown"
          ]}
          tips={[
            "Quick preset buttons: 10%, 15%, 18%, 20%, 25%",
            "Slider for custom tip percentages",
            "Automatic bill splitting calculation",
            "Shows individual share including tip",
            "Perfect for restaurants and group dining"
          ]}
        />
        <div className="space-y-2">
          <Label>Bill Amount ($)</Label>
          <Input
            type="number"
            value={bill}
            onChange={(e) => setBill(e.target.value)}
            placeholder="0.00"
            step="0.01"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Tip Percentage</Label>
            <span className="text-2xl font-bold text-primary">{tipPercent}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="30"
            value={tipPercent}
            onChange={(e) => setTipPercent(Number(e.target.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex gap-2">
            {[10, 15, 18, 20, 25].map((percent) => (
              <button
                key={percent}
                onClick={() => setTipPercent(percent)}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  tipPercent === percent
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {percent}%
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Number of People</Label>
          <Input
            type="number"
            value={people}
            onChange={(e) => setPeople(Math.max(1, Number(e.target.value)))}
            min="1"
          />
        </div>

        {result && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-primary/5 rounded-lg text-center border">
                <div className="text-sm text-muted-foreground mb-1">Tip Amount</div>
                <div className="text-3xl font-bold text-primary">${result.tipAmount}</div>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg text-center border">
                <div className="text-sm text-muted-foreground mb-1">Total</div>
                <div className="text-3xl font-bold text-primary">${result.total}</div>
              </div>
            </div>

            {people > 1 && (
              <div className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl border-2 border-primary/20">
                <div className="text-center mb-4">
                  <div className="text-sm text-muted-foreground">Per Person</div>
                  <div className="text-4xl font-bold text-primary">${result.perPerson}</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    (includes ${result.tipPerPerson} tip)
                  </div>
                </div>
              </div>
            )}

            <div className="p-4 bg-muted/30 rounded-lg space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Original Bill:</span>
                <span className="font-semibold">${bill}</span>
              </div>
              <div className="flex justify-between">
                <span>Tip ({tipPercent}%):</span>
                <span className="font-semibold">${result.tipAmount}</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="font-bold">Total:</span>
                <span className="font-bold">${result.total}</span>
              </div>
              {people > 1 && (
                <div className="flex justify-between border-t pt-2 text-primary">
                  <span className="font-bold">Each Person Pays:</span>
                  <span className="font-bold">${result.perPerson}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default TipCalculator;