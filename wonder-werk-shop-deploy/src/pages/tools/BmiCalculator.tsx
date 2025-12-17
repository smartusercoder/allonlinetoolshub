import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UsageGuide } from "@/components/UsageGuide";
import { toolFAQs } from "@/data/faqData";

const BmiCalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");

  const calculateBMI = () => {
    if (!weight || !height) return null;

    let bmi = 0;
    if (unit === "metric") {
      // kg and cm
      const heightM = Number(height) / 100;
      bmi = Number(weight) / (heightM * heightM);
    } else {
      // lbs and inches
      bmi = (Number(weight) / (Number(height) * Number(height))) * 703;
    }

    let category = "";
    let color = "";
    if (bmi < 18.5) {
      category = "Underweight";
      color = "text-blue-600 dark:text-blue-400";
    } else if (bmi < 25) {
      category = "Normal weight";
      color = "text-green-600 dark:text-green-400";
    } else if (bmi < 30) {
      category = "Overweight";
      color = "text-yellow-600 dark:text-yellow-400";
    } else {
      category = "Obese";
      color = "text-red-600 dark:text-red-400";
    }

    return { bmi: bmi.toFixed(1), category, color };
  };

  const result = calculateBMI();

  return (
    <ToolLayout
      title="BMI Calculator"
      description="Calculate your Body Mass Index (BMI) instantly. Free online BMI calculator for adults with health categories."
      keywords={[
        "bmi calculator", "body mass index calculator", "bmi checker", "calculate bmi",
        "weight calculator", "healthy weight calculator", "bmi online", "free bmi calculator"
      ]}
      category="health"
      faqs={toolFAQs["bmi-calculator"]}
      howToSteps={[
        {
          name: "Select Unit System",
          text: "Choose between Metric (kg/cm) or Imperial (lbs/inches) measurement system based on your preference."
        },
        {
          name: "Enter Your Weight",
          text: "Input your current weight in kilograms (metric) or pounds (imperial). Be as accurate as possible for best results."
        },
        {
          name: "Enter Your Height",
          text: "Input your height in centimeters (metric) or inches (imperial). Make sure to measure accurately without shoes."
        },
        {
          name: "View Your Results",
          text: "Your BMI is calculated instantly along with your weight category (Underweight, Normal, Overweight, or Obese). Use this as a general health indicator."
        }
      ]}
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Select your unit system (Metric or Imperial)",
            "Enter your weight",
            "Enter your height",
            "Your BMI and category appear automatically"
          ]}
          tips={[
            "Metric uses kilograms and centimeters",
            "Imperial uses pounds and inches",
            "BMI categories: Underweight (<18.5), Normal (18.5-24.9), Overweight (25-29.9), Obese (30+)",
            "BMI is a screening tool, not a diagnostic measure",
            "Consult healthcare professionals for personalized advice"
          ]}
          note="BMI does not account for muscle mass, bone density, or body composition."
        />
        <div className="flex gap-2">
          <button
            onClick={() => setUnit("metric")}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
              unit === "metric"
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80"
            }`}
          >
            Metric (kg, cm)
          </button>
          <button
            onClick={() => setUnit("imperial")}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
              unit === "imperial"
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80"
            }`}
          >
            Imperial (lbs, in)
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Weight ({unit === "metric" ? "kg" : "lbs"})</Label>
            <Input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder={unit === "metric" ? "70" : "154"}
            />
          </div>
          <div className="space-y-2">
            <Label>Height ({unit === "metric" ? "cm" : "inches"})</Label>
            <Input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder={unit === "metric" ? "175" : "69"}
            />
          </div>
        </div>

        {result && (
          <>
            <div className="p-6 bg-primary/5 rounded-xl text-center border-2 border-primary/20">
              <div className="text-sm text-muted-foreground mb-2">Your BMI</div>
              <div className="text-6xl font-bold text-primary mb-2">{result.bmi}</div>
              <div className={`text-xl font-semibold ${result.color}`}>
                {result.category}
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-500/10">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <div>
                  <strong>Underweight:</strong> BMI less than 18.5
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-green-500/10">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <div>
                  <strong>Normal weight:</strong> BMI 18.5 - 24.9
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-yellow-500/10">
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div>
                  <strong>Overweight:</strong> BMI 25 - 29.9
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-red-500/10">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div>
                  <strong>Obese:</strong> BMI 30 or greater
                </div>
              </div>
            </div>

            <div className="p-4 bg-muted/30 rounded-lg text-sm text-muted-foreground">
              <strong>Note:</strong> BMI is a screening tool. It does not directly measure body fat or muscle mass.
              Consult a healthcare professional for personalized advice.
            </div>
          </>
        )}
      </div>
    </ToolLayout>
  );
};

export default BmiCalculator;