import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { evaluateScientificExpression } from "@/utils/calculator";

export default function ScientificCalculator() {
  const [display, setDisplay] = useState("0");
  const [memory, setMemory] = useState(0);
  const { toast } = useToast();

  const handleClick = (value: string) => {
    if (display === "0" || display === "Error") {
      setDisplay(value);
    } else {
      setDisplay(display + value);
    }
  };

  const calculate = () => {
    try {
      const result = evaluateScientificExpression(display);
      setDisplay(String(result));
    } catch (error) {
      setDisplay("Error");
      toast({
        title: "Error",
        description: "Invalid expression",
        variant: "destructive",
      });
    }
  };

  const clear = () => setDisplay("0");

  const buttons = [
    ['sin', 'cos', 'tan', '√', '^'],
    ['7', '8', '9', '/', 'π'],
    ['4', '5', '6', '*', 'e'],
    ['1', '2', '3', '-', 'ln'],
    ['0', '.', '=', '+', 'C'],
  ];

  return (
    <ToolLayout
      title="Scientific Calculator"
      description="Advanced scientific calculations"
    >
      <Card className="p-6">
        <div className="space-y-4">
          <Input
            value={display}
            readOnly
            className="text-2xl font-mono text-right bg-muted h-16"
          />

          <div className="grid gap-2">
            {buttons.map((row, i) => (
              <div key={i} className="grid grid-cols-5 gap-2">
                {row.map((btn) => (
                  <Button
                    key={btn}
                    variant={btn === '=' ? "default" : btn === 'C' ? "destructive" : "outline"}
                    onClick={() => {
                      if (btn === '=') calculate();
                      else if (btn === 'C') clear();
                      else if (btn === '√') handleClick('sqrt(');
                      else handleClick(btn);
                    }}
                    className="h-12 text-lg font-semibold"
                  >
                    {btn === '√' ? '√' : btn}
                  </Button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Card>
    </ToolLayout>
  );
}
