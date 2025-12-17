import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator as CalcIcon } from "lucide-react";
import { UsageGuide } from "@/components/UsageGuide";
import { evaluateExpression } from "@/utils/calculator";
import { toolFAQs } from "@/data/faqData";

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");

  const handleNumber = (num: string) => {
    setDisplay(display === "0" ? num : display + num);
  };

  const handleOperator = (op: string) => {
    setEquation(display + " " + op + " ");
    setDisplay("0");
  };

  const calculate = () => {
    try {
      const fullEquation = equation + display;
      const normalized = fullEquation.replace(/×/g, "*").replace(/÷/g, "/");
      const result = evaluateExpression(normalized);
      setDisplay(result.toString());
      setEquation("");
    } catch {
      setDisplay("Error");
    }
  };

  const clear = () => {
    setDisplay("0");
    setEquation("");
  };

  const Button_Calc = ({ value, onClick, className = "" }: any) => (
    <button
      onClick={onClick}
      className={`p-4 text-lg font-semibold rounded-lg transition-colors ${className || "bg-muted hover:bg-muted/80"}`}
    >
      {value}
    </button>
  );

  return (
    <ToolLayout
      title="Calculator"
      description="Free online calculator for quick math calculations. Perform addition, subtraction, multiplication, and division easily."
      keywords={[
        "online calculator", "free calculator", "math calculator", "simple calculator",
        "basic calculator", "web calculator", "calculation tool"
      ]}
      category="math"
      faqs={toolFAQs["calculator"]}
      howToSteps={[
        {
          name: "Enter First Number",
          text: "Click the number buttons to enter your first value. The number will appear in the display area at the top."
        },
        {
          name: "Select Operation",
          text: "Click an operator button (+, -, ×, ÷) to choose what calculation you want to perform."
        },
        {
          name: "Enter Second Number",
          text: "Enter your second number using the number buttons. You can continue adding more operations if needed."
        },
        {
          name: "Get Result",
          text: "Press the equals (=) button to calculate and display your result. Use C to clear and start a new calculation."
        }
      ]}
    >
      <div className="max-w-md mx-auto space-y-4">
        <UsageGuide
          steps={[
            "Click number buttons to enter values",
            "Click operator buttons (+, -, ×, ÷) for calculations",
            "Press = to see the result",
            "Use C to clear and start over"
          ]}
          tips={[
            "Perfect for quick everyday calculations",
            "Supports decimal numbers (use . button)",
            "Chain multiple operations together",
            "Red C button clears everything"
          ]}
        />
        <div className="p-6 bg-muted/30 rounded-lg">
          <div className="text-sm text-muted-foreground mb-1">{equation || " "}</div>
          <div className="text-4xl font-bold text-right font-mono">{display}</div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          <Button_Calc value="C" onClick={clear} className="bg-red-500/20 hover:bg-red-500/30 text-red-600 dark:text-red-400" />
          <Button_Calc value="÷" onClick={() => handleOperator("÷")} />
          <Button_Calc value="×" onClick={() => handleOperator("×")} />
          <Button_Calc value="-" onClick={() => handleOperator("-")} />

          <Button_Calc value="7" onClick={() => handleNumber("7")} />
          <Button_Calc value="8" onClick={() => handleNumber("8")} />
          <Button_Calc value="9" onClick={() => handleNumber("9")} />
          <Button_Calc value="+" onClick={() => handleOperator("+")} />

          <Button_Calc value="4" onClick={() => handleNumber("4")} />
          <Button_Calc value="5" onClick={() => handleNumber("5")} />
          <Button_Calc value="6" onClick={() => handleNumber("6")} />
          <button className="row-span-2 p-4 text-lg font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90" onClick={calculate}>=</button>

          <Button_Calc value="1" onClick={() => handleNumber("1")} />
          <Button_Calc value="2" onClick={() => handleNumber("2")} />
          <Button_Calc value="3" onClick={() => handleNumber("3")} />

          <Button_Calc value="0" onClick={() => handleNumber("0")} className="col-span-2" />
          <Button_Calc value="." onClick={() => handleNumber(".")} />
        </div>
      </div>
    </ToolLayout>
  );
};

export default Calculator;