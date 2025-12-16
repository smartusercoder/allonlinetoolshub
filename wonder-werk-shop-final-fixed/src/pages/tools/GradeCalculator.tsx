import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { UsageGuide } from "@/components/UsageGuide";

export default function GradeCalculator() {
  const [scores, setScores] = useState<string[]>(["85", "90", "78"]);

  const addScore = () => setScores([...scores, ""]);

  const nums = scores.map(s => parseFloat(s)).filter(n => !isNaN(n));
  const average = nums.length > 0 ? nums.reduce((a, b) => a + b, 0) / nums.length : 0;
  const highest = nums.length > 0 ? Math.max(...nums) : 0;
  const lowest = nums.length > 0 ? Math.min(...nums) : 0;

  const letterGrade = average >= 90 ? "A" : average >= 80 ? "B" : average >= 70 ? "C" : average >= 60 ? "D" : "F";

  return (
    <ToolLayout title="Grade Calculator" description="Calculate average grades">
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Enter your test/assignment scores",
            "Click \"+ Add Score\" to include more scores",
            "View your average percentage and letter grade",
            "See your highest and lowest scores"
          ]}
          tips={[
            "Grade scale: A (90-100), B (80-89), C (70-79), D (60-69), F (<60)",
            "Add as many scores as you need",
            "Perfect for tracking class performance",
            "Updates automatically as you enter scores"
          ]}
        />
      </div>
      <div className="space-y-4 mt-6">
        {scores.map((score, i) => (
          <Input 
            key={i}
            type="number"
            value={score}
            onChange={e => {
              const newScores = [...scores];
              newScores[i] = e.target.value;
              setScores(newScores);
            }}
            placeholder={`Score ${i + 1}`}
          />
        ))}
        <button onClick={addScore} className="w-full p-2 border rounded hover:bg-muted">+ Add Score</button>
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 text-center bg-primary/10">
            <div className="text-3xl font-bold text-primary">{average.toFixed(1)}%</div>
            <div className="text-sm">Average ({letterGrade})</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-xl font-bold">{highest} / {lowest}</div>
            <div className="text-sm">High / Low</div>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
