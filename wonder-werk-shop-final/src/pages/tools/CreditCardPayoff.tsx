import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CreditCardPayoff = () => {
  const [balance, setBalance] = useState("");
  const [apr, setApr] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState("");
  const [desiredMonths, setDesiredMonths] = useState("");
  
  const [paymentResult, setPaymentResult] = useState<{
    months: number;
    totalInterest: number;
    payoffDate: string;
  } | null>(null);
  
  const [monthsResult, setMonthsResult] = useState<{
    requiredPayment: number;
    totalInterest: number;
  } | null>(null);

  const calculateFromPayment = () => {
    const bal = parseFloat(balance);
    const rate = parseFloat(apr) / 100 / 12;
    const payment = parseFloat(monthlyPayment);
    
    if (isNaN(bal) || isNaN(rate) || isNaN(payment) || payment <= bal * rate) return;
    
    let remaining = bal;
    let months = 0;
    let totalInterest = 0;
    
    while (remaining > 0 && months < 600) {
      const interest = remaining * rate;
      totalInterest += interest;
      remaining = remaining + interest - payment;
      months++;
    }
    
    const payoffDate = new Date();
    payoffDate.setMonth(payoffDate.getMonth() + months);
    
    setPaymentResult({
      months,
      totalInterest,
      payoffDate: payoffDate.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    });
  };

  const calculateFromMonths = () => {
    const bal = parseFloat(balance);
    const rate = parseFloat(apr) / 100 / 12;
    const months = parseInt(desiredMonths);
    
    if (isNaN(bal) || isNaN(rate) || isNaN(months) || months <= 0) return;
    
    const requiredPayment = (bal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
    const totalInterest = (requiredPayment * months) - bal;
    
    setMonthsResult({ requiredPayment, totalInterest });
  };

  return (
    <ToolLayout
      title="Credit Card Payoff Calculator"
      description="Calculate how to pay off your credit card debt faster"
    >
      <Card className="p-6">
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto">
            <div>
              <Label htmlFor="balance">Credit Card Balance ($)</Label>
              <Input
                id="balance"
                type="number"
                min="0"
                placeholder="e.g., 5000"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="apr">APR (%)</Label>
              <Input
                id="apr"
                type="number"
                min="0"
                step="0.1"
                placeholder="e.g., 19.99"
                value={apr}
                onChange={(e) => setApr(e.target.value)}
              />
            </div>
          </div>
          
          <Tabs defaultValue="payment" className="max-w-xl mx-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="payment">By Monthly Payment</TabsTrigger>
              <TabsTrigger value="months">By Desired Months</TabsTrigger>
            </TabsList>
            
            <TabsContent value="payment" className="space-y-4 mt-4">
              <div>
                <Label htmlFor="monthlyPayment">Monthly Payment ($)</Label>
                <Input
                  id="monthlyPayment"
                  type="number"
                  min="0"
                  placeholder="e.g., 200"
                  value={monthlyPayment}
                  onChange={(e) => setMonthlyPayment(e.target.value)}
                />
              </div>
              <Button onClick={calculateFromPayment} className="w-full">Calculate</Button>
              
              {paymentResult && (
                <div className="mt-4 space-y-3">
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Debt Free In</p>
                    <p className="text-3xl font-bold text-primary">{paymentResult.months} months</p>
                    <p className="text-sm text-muted-foreground">{paymentResult.payoffDate}</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Total Interest Paid</p>
                    <p className="text-xl font-bold text-destructive">${paymentResult.totalInterest.toFixed(2)}</p>
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="months" className="space-y-4 mt-4">
              <div>
                <Label htmlFor="desiredMonths">Pay Off In (months)</Label>
                <Input
                  id="desiredMonths"
                  type="number"
                  min="1"
                  placeholder="e.g., 24"
                  value={desiredMonths}
                  onChange={(e) => setDesiredMonths(e.target.value)}
                />
              </div>
              <Button onClick={calculateFromMonths} className="w-full">Calculate</Button>
              
              {monthsResult && (
                <div className="mt-4 space-y-3">
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Required Monthly Payment</p>
                    <p className="text-3xl font-bold text-primary">${monthsResult.requiredPayment.toFixed(2)}</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Total Interest Paid</p>
                    <p className="text-xl font-bold text-destructive">${monthsResult.totalInterest.toFixed(2)}</p>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </ToolLayout>
  );
};

export default CreditCardPayoff;
