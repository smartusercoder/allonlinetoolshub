import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle } from "lucide-react";

const PrimeChecker = () => {
  const [number, setNumber] = useState("");

  const isPrime = (n: number): boolean => {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;

    for (let i = 5; i * i <= n; i += 6) {
      if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    return true;
  };

  const findFactors = (n: number): number[] => {
    const factors: number[] = [];
    for (let i = 1; i <= Math.sqrt(n); i++) {
      if (n % i === 0) {
        factors.push(i);
        if (i !== n / i) factors.push(n / i);
      }
    }
    return factors.sort((a, b) => a - b);
  };

  const num = parseInt(number);
  const result = number.trim() && !isNaN(num) && num > 0 ? isPrime(num) : null;
  const factors = result !== null ? findFactors(num) : [];

  return (
    <ToolLayout
      title="Prime Number Checker"
      description="Check if a number is prime and find its factors"
    >
      <Card>
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-2">
            <Label>Number to Check</Label>
            <Input
              type="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="Enter a positive integer"
            />
          </div>

          {result !== null && (
            <Alert className={result ? "border-green-500 bg-green-50 dark:bg-green-950" : "border-blue-500 bg-blue-50 dark:bg-blue-950"}>
              <div className="flex items-center gap-2">
                {result ? (
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                ) : (
                  <XCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                )}
                <AlertDescription className={result ? "text-green-900 dark:text-green-100" : "text-blue-900 dark:text-blue-100"}>
                  {result ? (
                    <span className="font-semibold">✓ {num} is a prime number!</span>
                  ) : (
                    <span className="font-semibold">{num} is not a prime number</span>
                  )}
                </AlertDescription>
              </div>
            </Alert>
          )}

          {factors.length > 0 && (
            <div className="space-y-2">
              <Label>Factors of {num}</Label>
              <div className="p-4 bg-muted rounded-lg">
                <p className="font-mono">{factors.join(", ")}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Total: {factors.length} factor{factors.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
          )}

          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">What is a prime number?</p>
            <p className="text-sm">
              A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself.
            </p>
            <p className="text-sm mt-2 font-mono text-xs">
              Examples: 2, 3, 5, 7, 11, 13, 17, 19, 23...
            </p>
          </div>
        </CardContent>
      </Card>
    </ToolLayout>
  );
};

export default PrimeChecker;
