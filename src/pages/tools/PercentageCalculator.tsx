import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UsageGuide } from "@/components/UsageGuide";
import { toolFAQs } from "@/data/faqData";

const PercentageCalculator = () => {
  const [value, setValue] = useState("");
  const [total, setTotal] = useState("");
  const [percent, setPercent] = useState("");

  const calculatePercentage = () => {
    if (value && total) {
      return ((Number(value) / Number(total)) * 100).toFixed(2);
    }
    return "";
  };

  const calculateValue = () => {
    if (percent && total) {
      return ((Number(percent) / 100) * Number(total)).toFixed(2);
    }
    return "";
  };

  const increase = () => {
    if (value && percent) {
      const result = Number(value) * (1 + Number(percent) / 100);
      return result.toFixed(2);
    }
    return "";
  };

  const decrease = () => {
    if (value && percent) {
      const result = Number(value) * (1 - Number(percent) / 100);
      return result.toFixed(2);
    }
    return "";
  };

  return (
    <ToolLayout
      title="Percentage Calculator"
      description="Calculate percentages easily. Find what percent one number is of another, calculate percentage increase/decrease, and more."
      keywords={[
        "percentage calculator", "percent calculator", "calculate percentage", "percentage increase",
        "percentage decrease", "what percent is", "percent of number"
      ]}
      category="math"
      faqs={toolFAQs["percentage-calculator"]}
      howToSteps={[
        {
          name: "Choose Calculation Type",
          text: "Select which percentage calculation you need: find what percent X is of Y, calculate X% of a number, or calculate percentage increase/decrease."
        },
        {
          name: "Enter Your Values",
          text: "Input the numbers required for your calculation. The tool will guide you based on the type of percentage calculation you selected."
        },
        {
          name: "View Instant Results",
          text: "Results are calculated automatically as you type. All percentage calculations update in real-time for quick comparisons."
        },
        {
          name: "Use the Results",
          text: "Copy your result or perform additional calculations. Perfect for discounts, tips, grades, financial calculations, and more."
        }
      ]}
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Choose the calculation you need from the three sections",
            "Enter your values in the input fields",
            "Results appear automatically",
            "Mix and match values across different sections"
          ]}
          tips={[
            "\"What is X% of Y?\" - Find percentage of a value (e.g., 20% of 100 = 20)",
            "\"What % is X of Y?\" - Find what percentage one value is of another",
            "\"Increase/Decrease\" - Calculate value changes by percentage",
            "Perfect for discounts, tips, tax calculations, and data analysis"
          ]}
          example="What is 15% of 200? = 30"
        />
      </div>
      <div className="space-y-8">
        {/* What is X% of Y */}
        <div className="space-y-4 p-4 border rounded-lg">
          <h3 className="font-semibold">What is X% of Y?</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Percentage (%)</Label>
              <Input
                type="number"
                value={percent}
                onChange={(e) => setPercent(e.target.value)}
                placeholder="e.g., 15"
              />
            </div>
            <div className="space-y-2">
              <Label>of Value</Label>
              <Input
                type="number"
                value={total}
                onChange={(e) => setTotal(e.target.value)}
                placeholder="e.g., 200"
              />
            </div>
          </div>
          {calculateValue() && (
            <div className="p-4 bg-primary/5 rounded-lg text-center">
              <div className="text-sm text-muted-foreground">Result</div>
              <div className="text-3xl font-bold text-primary">{calculateValue()}</div>
            </div>
          )}
        </div>

        {/* What % is X of Y */}
        <div className="space-y-4 p-4 border rounded-lg">
          <h3 className="font-semibold">What percentage is X of Y?</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Value</Label>
              <Input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="e.g., 30"
              />
            </div>
            <div className="space-y-2">
              <Label>of Total</Label>
              <Input
                type="number"
                value={total}
                onChange={(e) => setTotal(e.target.value)}
                placeholder="e.g., 200"
              />
            </div>
          </div>
          {calculatePercentage() && (
            <div className="p-4 bg-primary/5 rounded-lg text-center">
              <div className="text-sm text-muted-foreground">Result</div>
              <div className="text-3xl font-bold text-primary">{calculatePercentage()}%</div>
            </div>
          )}
        </div>

        {/* Increase/Decrease by % */}
        <div className="space-y-4 p-4 border rounded-lg">
          <h3 className="font-semibold">Increase/Decrease Value by %</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Value</Label>
              <Input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="e.g., 100"
              />
            </div>
            <div className="space-y-2">
              <Label>Percentage (%)</Label>
              <Input
                type="number"
                value={percent}
                onChange={(e) => setPercent(e.target.value)}
                placeholder="e.g., 20"
              />
            </div>
          </div>
          {(increase() || decrease()) && (
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-green-500/10 rounded-lg text-center">
                <div className="text-sm text-muted-foreground">Increase</div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">+{increase()}</div>
              </div>
              <div className="p-4 bg-red-500/10 rounded-lg text-center">
                <div className="text-sm text-muted-foreground">Decrease</div>
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">-{decrease()}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
};

export default PercentageCalculator;