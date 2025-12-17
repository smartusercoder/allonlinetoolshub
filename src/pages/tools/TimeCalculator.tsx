import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function TimeCalculator() {
  const [time, setTime] = useState("10:00");
  const [amount, setAmount] = useState("2");
  const [unit, setUnit] = useState("hours");
  const [operation, setOperation] = useState("add");

  const calculate = () => {
    const [h, m] = time.split(':').map(Number);
    let totalMinutes = h * 60 + m;
    
    const amountNum = parseInt(amount) || 0;
    let minutesToModify = 0;
    
    switch (unit) {
      case 'hours':
        minutesToModify = amountNum * 60;
        break;
      case 'minutes':
        minutesToModify = amountNum;
        break;
      case 'days':
        minutesToModify = amountNum * 24 * 60;
        break;
    }
    
    if (operation === 'add') {
      totalMinutes += minutesToModify;
    } else {
      totalMinutes -= minutesToModify;
    }
    
    // Handle negative and overflow
    while (totalMinutes < 0) totalMinutes += 24 * 60;
    totalMinutes = totalMinutes % (24 * 60);
    
    const resultH = Math.floor(totalMinutes / 60);
    const resultM = totalMinutes % 60;
    
    return `${String(resultH).padStart(2, '0')}:${String(resultM).padStart(2, '0')}`;
  };

  const result = calculate();

  return (
    <ToolLayout
      title="Time Calculator"
      description="Add or subtract time from a given time"
    >
      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="time">Starting Time</Label>
          <Input
            id="time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Operation</Label>
            <Select value={operation} onValueChange={setOperation}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="add">Add</SelectItem>
                <SelectItem value="subtract">Subtract</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="2"
            />
          </div>

          <div className="space-y-2">
            <Label>Unit</Label>
            <Select value={unit} onValueChange={setUnit}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hours">Hours</SelectItem>
                <SelectItem value="minutes">Minutes</SelectItem>
                <SelectItem value="days">Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Card className="p-6 bg-primary/10 text-center">
          <div className="text-sm text-muted-foreground mb-2">Result</div>
          <div className="text-5xl font-bold text-primary">{result}</div>
        </Card>
      </Card>
    </ToolLayout>
  );
}
