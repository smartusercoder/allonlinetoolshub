import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { UsageGuide } from "@/components/UsageGuide";

export default function CreditCardValidator() {
  const [cardNumber, setCardNumber] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [cardType, setCardType] = useState("");
  const { toast } = useToast();

  const detectCardType = (number: string) => {
    const patterns: Record<string, RegExp> = {
      'Visa': /^4/,
      'Mastercard': /^5[1-5]/,
      'American Express': /^3[47]/,
      'Discover': /^6(?:011|5)/,
      'Diners Club': /^3(?:0[0-5]|[68])/,
      'JCB': /^35/
    };

    for (const [type, pattern] of Object.entries(patterns)) {
      if (pattern.test(number)) return type;
    }
    return 'Unknown';
  };

  const luhnCheck = (number: string) => {
    const digits = number.replace(/\D/g, '');
    let sum = 0;
    let isEven = false;

    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = parseInt(digits[i]);

      if (isEven) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }

      sum += digit;
      isEven = !isEven;
    }

    return sum % 10 === 0;
  };

  const validate = (value: string) => {
    setCardNumber(value);
    const cleaned = value.replace(/\s/g, '');
    
    if (cleaned.length === 0) {
      setIsValid(null);
      setCardType('');
      return;
    }

    const type = detectCardType(cleaned);
    setCardType(type);
    
    if (cleaned.length >= 13 && cleaned.length <= 19) {
      const valid = luhnCheck(cleaned);
      setIsValid(valid);
      
      if (valid) {
        toast({
          title: "Valid Card",
          description: `This appears to be a valid ${type} card number`,
        });
      }
    } else {
      setIsValid(false);
    }
  };

  return (
    <ToolLayout
      title="Credit Card Validator"
      description="Validate credit card numbers using Luhn algorithm"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Enter a credit card number (with or without spaces)",
            "Validation happens automatically as you type",
            "See if the format is valid using the Luhn algorithm",
            "Card type is detected automatically (Visa, Mastercard, etc.)"
          ]}
          tips={[
            "This only validates the number format, not if the card is active",
            "All data stays in your browser - nothing is sent anywhere",
            "Detects Visa, Mastercard, Amex, Discover, and more",
            "Luhn algorithm is the industry standard checksum",
            "Perfect for testing payment forms"
          ]}
          note="This tool validates format only. It does not verify if a card exists or is active."
        />
      </div>
      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="card">Card Number</Label>
          <Input
            id="card"
            value={cardNumber}
            onChange={(e) => validate(e.target.value)}
            placeholder="4111 1111 1111 1111"
            maxLength={19}
          />
          <p className="text-xs text-muted-foreground">
            This tool only validates the format. No data is stored or sent.
          </p>
        </div>

        {isValid !== null && (
          <Card className={`p-6 ${isValid ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold">
                {isValid ? '✓ Valid' : '✗ Invalid'}
              </div>
              {cardType && (
                <div className="text-lg">
                  Card Type: <span className="font-semibold">{cardType}</span>
                </div>
              )}
            </div>
          </Card>
        )}
      </Card>
    </ToolLayout>
  );
}
