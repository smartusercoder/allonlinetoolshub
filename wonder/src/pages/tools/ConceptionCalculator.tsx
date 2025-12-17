import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { subDays, format } from "date-fns";

const ConceptionCalculator = () => {
  const [dueDate, setDueDate] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState<{ conceptionDate: Date } | null>(null);

  const fromDueDate = () => {
    if (!dueDate) return;
    const conception = subDays(new Date(dueDate), 266); // 38 weeks
    setResult({ conceptionDate: conception });
  };

  const fromBirthDate = () => {
    if (!birthDate) return;
    const conception = subDays(new Date(birthDate), 266);
    setResult({ conceptionDate: conception });
  };

  return (
    <ToolLayout title="Conception Calculator" description="Estimate conception date">
      <Card className="p-6">
        <div className="space-y-4 max-w-md mx-auto">
          <div>
            <Label>Due Date (if pregnant)</Label>
            <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          </div>
          <Button onClick={fromDueDate} className="w-full">Calculate from Due Date</Button>
          <div className="text-center text-muted-foreground">— or —</div>
          <div>
            <Label>Child's Birth Date</Label>
            <Input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
          </div>
          <Button onClick={fromBirthDate} variant="outline" className="w-full">Calculate from Birth Date</Button>
          {result && (
            <div className="p-6 bg-pink-500/10 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Estimated Conception Date</p>
              <p className="text-2xl font-bold text-pink-600">{format(result.conceptionDate, "MMMM d, yyyy")}</p>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
};

export default ConceptionCalculator;
