import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MilitaryTimeConverter = () => {
  const [standardTime, setStandardTime] = useState("");
  const [militaryTime, setMilitaryTime] = useState("");
  const [standardResult, setStandardResult] = useState("");
  const [militaryResult, setMilitaryResult] = useState("");

  const toMilitary = () => {
    const match = standardTime.match(/^(\d{1,2}):(\d{2})\s*(AM|PM|am|pm)?$/);
    if (!match) {
      setMilitaryResult("Invalid format. Use HH:MM AM/PM");
      return;
    }
    
    let hours = parseInt(match[1]);
    const minutes = match[2];
    const period = match[3]?.toUpperCase();
    
    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
    
    setMilitaryResult(`${hours.toString().padStart(2, "0")}${minutes}`);
  };

  const toStandard = () => {
    const match = militaryTime.match(/^(\d{2})(\d{2})$/);
    if (!match) {
      setStandardResult("Invalid format. Use HHMM (e.g., 1430)");
      return;
    }
    
    let hours = parseInt(match[1]);
    const minutes = match[2];
    
    if (hours > 23 || parseInt(minutes) > 59) {
      setStandardResult("Invalid time");
      return;
    }
    
    const period = hours >= 12 ? "PM" : "AM";
    if (hours === 0) hours = 12;
    else if (hours > 12) hours -= 12;
    
    setStandardResult(`${hours}:${minutes} ${period}`);
  };

  return (
    <ToolLayout
      title="Military Time Converter"
      description="Convert between standard 12-hour and military 24-hour time formats"
    >
      <Card className="p-6">
        <Tabs defaultValue="toMilitary">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="toMilitary">To Military</TabsTrigger>
            <TabsTrigger value="toStandard">To Standard</TabsTrigger>
          </TabsList>
          
          <TabsContent value="toMilitary" className="space-y-4 mt-4">
            <div>
              <Label htmlFor="standardTime">Standard Time (12-hour)</Label>
              <Input
                id="standardTime"
                placeholder="e.g., 2:30 PM"
                value={standardTime}
                onChange={(e) => setStandardTime(e.target.value)}
              />
            </div>
            <Button onClick={toMilitary} className="w-full">Convert to Military</Button>
            {militaryResult && (
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-3xl font-mono font-bold text-primary">{militaryResult}</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="toStandard" className="space-y-4 mt-4">
            <div>
              <Label htmlFor="militaryTime">Military Time (24-hour)</Label>
              <Input
                id="militaryTime"
                placeholder="e.g., 1430"
                value={militaryTime}
                onChange={(e) => setMilitaryTime(e.target.value)}
              />
            </div>
            <Button onClick={toStandard} className="w-full">Convert to Standard</Button>
            {standardResult && (
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-3xl font-bold text-primary">{standardResult}</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <div className="mt-8">
          <h3 className="font-semibold mb-3">Quick Reference</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 text-xs">
            {Array.from({ length: 24 }, (_, i) => {
              const hour = i;
              const period = hour >= 12 ? "PM" : "AM";
              const standard = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
              return (
                <div key={i} className="p-2 bg-muted/50 rounded text-center">
                  <p className="font-mono font-bold">{hour.toString().padStart(2, "0")}00</p>
                  <p className="text-muted-foreground">{standard}:00 {period}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Card>
    </ToolLayout>
  );
};

export default MilitaryTimeConverter;
