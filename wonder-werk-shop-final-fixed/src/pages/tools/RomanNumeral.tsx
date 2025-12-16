import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const RomanNumeral = () => {
  const [decimal, setDecimal] = useState("");
  const [roman, setRoman] = useState("");
  const { toast } = useToast();

  const toRoman = (num: number): string => {
    if (num < 1 || num > 3999) return "Out of range (1-3999)";
    
    const romanNumerals: [number, string][] = [
      [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
      [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
      [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']
    ];

    let result = '';
    for (const [value, numeral] of romanNumerals) {
      while (num >= value) {
        result += numeral;
        num -= value;
      }
    }
    return result;
  };

  const fromRoman = (str: string): number => {
    const romanValues: Record<string, number> = {
      'I': 1, 'V': 5, 'X': 10, 'L': 50,
      'C': 100, 'D': 500, 'M': 1000
    };

    let result = 0;
    for (let i = 0; i < str.length; i++) {
      const current = romanValues[str[i]];
      const next = romanValues[str[i + 1]];
      
      if (next && current < next) {
        result -= current;
      } else {
        result += current;
      }
    }
    return result;
  };

  const handleDecimalInput = (value: string) => {
    setDecimal(value);
    if (value && !isNaN(Number(value))) {
      setRoman(toRoman(Number(value)));
    } else {
      setRoman("");
    }
  };

  const handleRomanInput = (value: string) => {
    const upper = value.toUpperCase();
    setRoman(upper);
    if (/^[IVXLCDM]+$/.test(upper)) {
      setDecimal(fromRoman(upper).toString());
    } else if (value === "") {
      setDecimal("");
    }
  };

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied!", description: "Copied to clipboard" });
  };

  return (
    <ToolLayout
      title="Roman Numeral Converter"
      description="Convert between Roman and Arabic numerals"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Arabic Number (1-3999)</Label>
            {decimal && (
              <Button onClick={() => copy(decimal)} variant="ghost" size="sm">
                <Copy className="w-4 h-4 mr-1" />
                Copy
              </Button>
            )}
          </div>
          <Input
            type="number"
            value={decimal}
            onChange={(e) => handleDecimalInput(e.target.value)}
            placeholder="e.g., 2024"
            min="1"
            max="3999"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Roman Numeral</Label>
            {roman && (
              <Button onClick={() => copy(roman)} variant="ghost" size="sm">
                <Copy className="w-4 h-4 mr-1" />
                Copy
              </Button>
            )}
          </div>
          <Input
            value={roman}
            onChange={(e) => handleRomanInput(e.target.value)}
            placeholder="e.g., MMXXIV"
            className="font-mono uppercase"
          />
        </div>

        <div className="text-sm text-muted-foreground p-4 bg-muted/30 rounded-lg space-y-2">
          <p><strong>Roman Numeral Symbols:</strong></p>
          <div className="grid grid-cols-2 gap-2 font-mono">
            <div>I = 1</div>
            <div>V = 5</div>
            <div>X = 10</div>
            <div>L = 50</div>
            <div>C = 100</div>
            <div>D = 500</div>
            <div>M = 1000</div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default RomanNumeral;