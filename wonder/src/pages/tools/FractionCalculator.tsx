import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function FractionCalculator() {
  const [num1, setNum1] = useState("1");
  const [den1, setDen1] = useState("2");
  const [num2, setNum2] = useState("1");
  const [den2, setDen2] = useState("3");
  const [operation, setOperation] = useState<string>("+");

  const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);

  const calculate = () => {
    const n1 = parseInt(num1) || 0;
    const d1 = parseInt(den1) || 1;
    const n2 = parseInt(num2) || 0;
    const d2 = parseInt(den2) || 1;

    let resultNum = 0;
    let resultDen = 1;

    switch (operation) {
      case "+":
        resultNum = n1 * d2 + n2 * d1;
        resultDen = d1 * d2;
        break;
      case "-":
        resultNum = n1 * d2 - n2 * d1;
        resultDen = d1 * d2;
        break;
      case "*":
        resultNum = n1 * n2;
        resultDen = d1 * d2;
        break;
      case "/":
        resultNum = n1 * d2;
        resultDen = d1 * n2;
        break;
    }

    const divisor = gcd(Math.abs(resultNum), Math.abs(resultDen));
    resultNum /= divisor;
    resultDen /= divisor;

    if (resultDen < 0) {
      resultNum = -resultNum;
      resultDen = -resultDen;
    }

    return { num: resultNum, den: resultDen };
  };

  const result = calculate();

  return (
    <ToolLayout
      title="Fraction Calculator"
      description="Calculate with fractions"
    >
      <Card className="p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] gap-2 items-end">
            <div>
              <label className="block mb-2 text-sm font-medium">Numerator</label>
              <Input
                type="number"
                value={num1}
                onChange={(e) => setNum1(e.target.value)}
              />
            </div>
            <div className="text-2xl font-bold pb-2">/</div>
            <div>
              <label className="block mb-2 text-sm font-medium">Denominator</label>
              <Input
                type="number"
                value={den1}
                onChange={(e) => setDen1(e.target.value)}
              />
            </div>

            <div className="pb-2">
              <Select value={operation} onValueChange={setOperation}>
                <SelectTrigger className="w-16">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="+">+</SelectItem>
                  <SelectItem value="-">-</SelectItem>
                  <SelectItem value="*">×</SelectItem>
                  <SelectItem value="/">÷</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Numerator</label>
              <Input
                type="number"
                value={num2}
                onChange={(e) => setNum2(e.target.value)}
              />
            </div>
            <div className="text-2xl font-bold pb-2">/</div>
            <div>
              <label className="block mb-2 text-sm font-medium">Denominator</label>
              <Input
                type="number"
                value={den2}
                onChange={(e) => setDen2(e.target.value)}
              />
            </div>
          </div>

          <div className="p-6 bg-primary/10 rounded-lg text-center">
            <div className="text-sm text-muted-foreground mb-2">Result</div>
            <div className="text-4xl font-bold text-primary">
              {result.num} / {result.den}
            </div>
            <div className="text-lg text-muted-foreground mt-2">
              = {(result.num / result.den).toFixed(4)}
            </div>
          </div>
        </div>
      </Card>
    </ToolLayout>
  );
}
