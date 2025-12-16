import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RefreshCw, Copy, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function CreditCardGenerator() {
  const [cardType, setCardType] = useState("visa");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiry, setExpiry] = useState("");
  const { toast } = useToast();

  const luhnCheck = (num: string) => {
    let sum = 0;
    let isEven = false;
    for (let i = num.length - 1; i >= 0; i--) {
      let digit = parseInt(num[i]);
      if (isEven) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      isEven = !isEven;
    }
    return sum % 10 === 0;
  };

  const generateCard = () => {
    let prefix = "";
    switch (cardType) {
      case "visa":
        prefix = "4";
        break;
      case "mastercard":
        prefix = "5" + Math.floor(Math.random() * 5 + 1);
        break;
      case "amex":
        prefix = "3" + (Math.random() < 0.5 ? "4" : "7");
        break;
    }

    let number = prefix;
    const length = cardType === "amex" ? 15 : 16;
    
    while (number.length < length - 1) {
      number += Math.floor(Math.random() * 10);
    }

    // Add check digit
    for (let i = 0; i < 10; i++) {
      if (luhnCheck(number + i)) {
        number += i;
        break;
      }
    }

    setCardNumber(number.match(/.{1,4}/g)?.join(" ") || "");
    setCvv(Math.floor(Math.random() * 900 + 100).toString());
    
    const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
    const year = String(new Date().getFullYear() + Math.floor(Math.random() * 5) + 1).slice(-2);
    setExpiry(`${month}/${year}`);
  };

  const copyCard = () => {
    navigator.clipboard.writeText(`${cardNumber}\nCVV: ${cvv}\nExpiry: ${expiry}`);
    toast({
      title: "Copied!",
      description: "Test card details copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="Test Credit Card Generator"
      description="Generate test credit card numbers for development"
    >
      <Card className="p-6">
        <div className="space-y-6">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              These are FAKE test cards for development only. Do not use for real transactions!
            </AlertDescription>
          </Alert>

          <div>
            <label className="block mb-2 text-sm font-medium">Card Type</label>
            <Select value={cardType} onValueChange={setCardType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="visa">Visa</SelectItem>
                <SelectItem value="mastercard">Mastercard</SelectItem>
                <SelectItem value="amex">American Express</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={generateCard} className="w-full">
            <RefreshCw className="w-4 h-4 mr-2" />
            Generate Test Card
          </Button>

          {cardNumber && (
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium">Card Number</label>
                <Input value={cardNumber} readOnly className="font-mono text-lg bg-muted" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">CVV</label>
                  <Input value={cvv} readOnly className="font-mono bg-muted" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">Expiry</label>
                  <Input value={expiry} readOnly className="font-mono bg-muted" />
                </div>
              </div>

              <Button onClick={copyCard} variant="outline" className="w-full">
                <Copy className="w-4 h-4 mr-2" />
                Copy Card Details
              </Button>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
}
