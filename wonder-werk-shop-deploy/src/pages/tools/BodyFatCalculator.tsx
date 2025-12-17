import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { UsageGuide } from "@/components/UsageGuide";

export default function BodyFatCalculator() {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("30");
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("170");
  const [neck, setNeck] = useState("37");
  const [waist, setWaist] = useState("80");
  const [hip, setHip] = useState("95");

  const calculateBodyFat = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    const n = parseFloat(neck);
    const wa = parseFloat(waist);
    const hi = parseFloat(hip);

    if (gender === "male") {
      const bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(wa - n) + 0.15456 * Math.log10(h)) - 450;
      return Math.max(0, bodyFat);
    } else {
      const bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(wa + hi - n) + 0.22100 * Math.log10(h)) - 450;
      return Math.max(0, bodyFat);
    }
  };

  const bodyFat = calculateBodyFat();
  const category = bodyFat < 6 ? "Essential Fat" : bodyFat < 14 ? "Athletes" : bodyFat < 18 ? "Fitness" : bodyFat < 25 ? "Average" : "Obese";

  return (
    <ToolLayout title="Body Fat Calculator" description="Calculate body fat percentage">
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Select your gender",
            "Enter age, weight, height, neck, and waist measurements",
            "For females, also enter hip measurement",
            "View your body fat percentage and category"
          ]}
          tips={[
            "Use a measuring tape for accurate neck/waist/hip measurements",
            "Measure waist at the narrowest point",
            "Categories: Essential Fat (<14%), Athletes (14-18%), Fitness (18-25%)",
            "Track changes over time for fitness progress"
          ]}
          note="This uses the U.S. Navy method for body fat estimation"
        />
      </div>
      <div className="space-y-4 mt-6">
        <Card className="p-6 space-y-4">
          <div className="space-y-2">
            <Label>Gender</Label>
            <div className="flex gap-2">
              <Button
                variant={gender === "male" ? "default" : "outline"}
                onClick={() => setGender("male")}
                className="flex-1"
              >
                Male
              </Button>
              <Button
                variant={gender === "female" ? "default" : "outline"}
                onClick={() => setGender("female")}
                className="flex-1"
              >
                Female
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age (years)</Label>
              <Input id="age" type="number" value={age} onChange={(e) => setAge(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input id="weight" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input id="height" type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="neck">Neck (cm)</Label>
              <Input id="neck" type="number" value={neck} onChange={(e) => setNeck(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="waist">Waist (cm)</Label>
              <Input id="waist" type="number" value={waist} onChange={(e) => setWaist(e.target.value)} />
            </div>
            {gender === "female" && (
              <div className="space-y-2">
                <Label htmlFor="hip">Hip (cm)</Label>
                <Input id="hip" type="number" value={hip} onChange={(e) => setHip(e.target.value)} />
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6 text-center bg-primary/10">
          <div className="text-sm text-muted-foreground">Body Fat Percentage</div>
          <div className="text-4xl font-bold text-primary my-2">{bodyFat.toFixed(1)}%</div>
          <div className="text-sm font-medium">{category}</div>
        </Card>
      </div>
    </ToolLayout>
  );
}
