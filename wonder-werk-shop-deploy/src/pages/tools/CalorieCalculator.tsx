import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { UsageGuide } from "@/components/UsageGuide";

export default function CalorieCalculator() {
  const [age, setAge] = useState("30");
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("170");
  const [gender, setGender] = useState("male");
  const [activity, setActivity] = useState("1.55");

  const w = parseFloat(weight);
  const h = parseFloat(height);
  const a = parseFloat(age);
  const act = parseFloat(activity);

  const bmr = gender === "male" 
    ? 10 * w + 6.25 * h - 5 * a + 5
    : 10 * w + 6.25 * h - 5 * a - 161;

  const tdee = Math.round(bmr * act);

  return (
    <ToolLayout title="Calorie Calculator" description="Calculate daily calorie needs">
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Enter your age, weight (kg), and height (cm)",
            "Select your gender",
            "Choose your activity level",
            "View your Total Daily Energy Expenditure (TDEE)"
          ]}
          tips={[
            "TDEE = calories needed to maintain current weight",
            "Eat less than TDEE to lose weight, more to gain",
            "Activity levels: Sedentary (desk job), Athlete (training daily)",
            "Adjust calories based on your fitness goals"
          ]}
          note="This uses the Mifflin-St Jeor equation for accuracy"
        />
      </div>
      <div className="space-y-4 mt-6">
        <Input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="Age" />
        <Input type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="Weight (kg)" />
        <Input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="Height (cm)" />
        <select value={gender} onChange={e => setGender(e.target.value)} className="w-full p-2 border rounded">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <select value={activity} onChange={e => setActivity(e.target.value)} className="w-full p-2 border rounded">
          <option value="1.2">Sedentary</option>
          <option value="1.375">Light Exercise</option>
          <option value="1.55">Moderate Exercise</option>
          <option value="1.725">Heavy Exercise</option>
          <option value="1.9">Athlete</option>
        </select>
        <Card className="p-6 text-center bg-primary/10">
          <div className="text-sm text-muted-foreground">Daily Calorie Needs</div>
          <div className="text-4xl font-bold text-primary">{tdee}</div>
          <div className="text-sm mt-2">calories/day</div>
        </Card>
      </div>
    </ToolLayout>
  );
}
