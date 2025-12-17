import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { UsageGuide } from "@/components/UsageGuide";

export default function GpaCalculator() {
  const [grades, setGrades] = useState([{ grade: "A", credits: "3" }]);

  const addGrade = () => {
    setGrades([...grades, { grade: "A", credits: "3" }]);
  };

  const gradePoints: Record<string, number> = {
    'A+': 4.3, 'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D': 1.0, 'F': 0.0
  };

  const totalPoints = grades.reduce((sum, g) => {
    return sum + (gradePoints[g.grade] || 0) * parseFloat(g.credits || "0");
  }, 0);

  const totalCredits = grades.reduce((sum, g) => sum + parseFloat(g.credits || "0"), 0);
  const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";

  return (
    <ToolLayout title="GPA Calculator" description="Calculate grade point average">
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Select the letter grade for each course",
            "Enter the number of credits for that course",
            "Click \"+ Add Course\" to add more courses",
            "Your GPA is calculated automatically"
          ]}
          tips={[
            "GPA scale: A+ = 4.3, A = 4.0, B = 3.0, C = 2.0, D = 1.0, F = 0.0",
            "Credits are weighted - more credits = more impact on GPA",
            "Most universities use a 4.0 scale",
            "Add all your courses for cumulative GPA"
          ]}
        />
      </div>
      <div className="space-y-4 mt-6">
        {grades.map((g, i) => (
          <div key={i} className="grid grid-cols-2 gap-2">
            <select 
              value={g.grade}
              onChange={e => {
                const newGrades = [...grades];
                newGrades[i].grade = e.target.value;
                setGrades(newGrades);
              }}
              className="p-2 border rounded"
            >
              {Object.keys(gradePoints).map(grade => (
                <option key={grade} value={grade}>{grade}</option>
              ))}
            </select>
            <Input 
              type="number"
              value={g.credits}
              onChange={e => {
                const newGrades = [...grades];
                newGrades[i].credits = e.target.value;
                setGrades(newGrades);
              }}
              placeholder="Credits"
            />
          </div>
        ))}
        <button onClick={addGrade} className="w-full p-2 border rounded hover:bg-muted">+ Add Course</button>
        <Card className="p-6 text-center bg-primary/10">
          <div className="text-sm">Your GPA</div>
          <div className="text-5xl font-bold text-primary">{gpa}</div>
        </Card>
      </div>
    </ToolLayout>
  );
}
