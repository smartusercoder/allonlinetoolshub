import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UsageGuide } from "@/components/UsageGuide";
import { toolFAQs } from "@/data/faqData";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState("100");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");

  // Static exchange rates (base: USD)
  const exchangeRates: { [key: string]: number } = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 149.50,
    CHF: 0.88,
    CAD: 1.36,
    AUD: 1.53,
    CNY: 7.24,
    INR: 83.12,
    BRL: 4.97,
    MXN: 17.15,
    ZAR: 18.65,
    SGD: 1.35,
    HKD: 7.83,
    KRW: 1319.50,
    RUB: 92.50,
    TRY: 28.75
  };

  const currencies = [
    { code: "USD", name: "US Dollar", symbol: "$" },
    { code: "EUR", name: "Euro", symbol: "€" },
    { code: "GBP", name: "British Pound", symbol: "£" },
    { code: "JPY", name: "Japanese Yen", symbol: "¥" },
    { code: "CHF", name: "Swiss Franc", symbol: "CHF" },
    { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
    { code: "AUD", name: "Australian Dollar", symbol: "A$" },
    { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
    { code: "INR", name: "Indian Rupee", symbol: "₹" },
    { code: "BRL", name: "Brazilian Real", symbol: "R$" },
    { code: "MXN", name: "Mexican Peso", symbol: "MX$" },
    { code: "ZAR", name: "South African Rand", symbol: "R" },
    { code: "SGD", name: "Singapore Dollar", symbol: "S$" },
    { code: "HKD", name: "Hong Kong Dollar", symbol: "HK$" },
    { code: "KRW", name: "South Korean Won", symbol: "₩" },
    { code: "RUB", name: "Russian Ruble", symbol: "₽" },
    { code: "TRY", name: "Turkish Lira", symbol: "₺" }
  ];

  const convert = () => {
    const amt = parseFloat(amount);
    if (!amt || isNaN(amt)) return "0.00";

    const fromRate = exchangeRates[fromCurrency];
    const toRate = exchangeRates[toCurrency];
    
    const result = (amt / fromRate) * toRate;
    return result.toFixed(2);
  };

  const result = convert();
  const rate = (exchangeRates[toCurrency] / exchangeRates[fromCurrency]).toFixed(4);

  return (
    <ToolLayout
      title="Currency Converter"
      description="Convert between different currencies"
      faqs={toolFAQs["currency-converter"]}
      howToSteps={[
        {
          name: "Enter Amount",
          text: "Type the amount you want to convert in the input field. You can enter any positive number including decimals."
        },
        {
          name: "Select Source Currency",
          text: "Choose the currency you're converting FROM using the dropdown menu. Select from 17 major world currencies including USD, EUR, GBP, and more."
        },
        {
          name: "Select Target Currency",
          text: "Choose the currency you want to convert TO. The conversion will be calculated instantly as you make your selection."
        },
        {
          name: "View Results",
          text: "See your converted amount displayed prominently along with the current exchange rate between the two currencies."
        }
      ]}
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Enter the amount you want to convert",
            "Select the source currency (From)",
            "Select the target currency (To)",
            "Conversion result appears automatically with exchange rate"
          ]}
          tips={[
            "Supports 17 major world currencies",
            "Shows both converted amount and exchange rate",
            "Perfect for travel planning and international business",
            "Includes USD, EUR, GBP, JPY, and more"
          ]}
          note="Exchange rates are static for demonstration. For real-time rates, integrate with a currency API."
        />
      </div>
      <Card>
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-2">
            <Label>Amount</Label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="100"
              step="0.01"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>From</Label>
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map(currency => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.symbol} {currency.code} - {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>To</Label>
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map(currency => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.symbol} {currency.code} - {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="p-6 bg-muted rounded-lg text-center">
            <p className="text-sm text-muted-foreground mb-2">
              {amount} {fromCurrency} =
            </p>
            <p className="text-4xl font-bold text-primary">
              {currencies.find(c => c.code === toCurrency)?.symbol}{result} {toCurrency}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              1 {fromCurrency} = {rate} {toCurrency}
            </p>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> Exchange rates are static for demonstration. 
              For real-time rates, integrate with a currency API service.
            </p>
          </div>
        </CardContent>
      </Card>
    </ToolLayout>
  );
};

export default CurrencyConverter;
