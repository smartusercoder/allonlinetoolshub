import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addDays, addWeeks, differenceInWeeks, format } from "date-fns";

const PregnancyDueDate = () => {
  const [lmpDate, setLmpDate] = useState("");
  const [result, setResult] = useState<{ dueDate: Date; weeksPregnant: number; trimester: string } | null>(null);

  const calculate = () => {
    if (!lmpDate) return;
    const lmp = new Date(lmpDate);
    const dueDate = addDays(lmp, 280); // 40 weeks
    const today = new Date();
    const weeksPregnant = differenceInWeeks(today, lmp);
    
    let trimester = "First Trimester";
    if (weeksPregnant >= 13 && weeksPregnant < 27) trimester = "Second Trimester";
    else if (weeksPregnant >= 27) trimester = "Third Trimester";

    setResult({ dueDate, weeksPregnant: Math.max(0, weeksPregnant), trimester });
  };

  return (
    <ToolLayout title="Pregnancy Due Date Calculator" description="Calculate estimated due date from last menstrual period">
      <Card className="p-6">
        <div className="space-y-4 max-w-md mx-auto">
          <div>
            <Label>First Day of Last Menstrual Period (LMP)</Label>
            <Input type="date" value={lmpDate} onChange={(e) => setLmpDate(e.target.value)} />
          </div>
          <Button onClick={calculate} className="w-full">Calculate Due Date</Button>
          {result && (
            <div className="space-y-4 mt-4">
              <div className="p-4 bg-pink-500/10 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Estimated Due Date</p>
                <p className="text-2xl font-bold text-pink-600">{format(result.dueDate, "MMMM d, yyyy")}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-2xl font-bold">{result.weeksPregnant}</p>
                  <p className="text-sm text-muted-foreground">weeks pregnant</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-lg font-bold">{result.trimester}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
};

export default PregnancyDueDate;
