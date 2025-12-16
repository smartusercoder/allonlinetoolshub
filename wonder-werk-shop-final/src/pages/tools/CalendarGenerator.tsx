import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const CalendarGenerator = () => {
  const [month, setMonth] = useState(new Date().getMonth().toString());
  const [year, setYear] = useState(new Date().getFullYear().toString());

  const generateCalendar = () => {
    const m = parseInt(month);
    const y = parseInt(year);
    const firstDay = new Date(y, m, 1);
    const lastDay = new Date(y, m + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const calendar: (number | null)[] = [];
    
    // Add empty cells for days before the first day
    for (let i = 0; i < startingDayOfWeek; i++) {
      calendar.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      calendar.push(day);
    }

    return calendar;
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const calendar = generateCalendar();

  const printCalendar = () => {
    window.print();
  };

  return (
    <ToolLayout
      title="Calendar Generator"
      description="Generate and print monthly calendars"
    >
      <Card>
        <CardContent className="pt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Month</Label>
              <Select value={month} onValueChange={setMonth}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {monthNames.map((name, index) => (
                    <SelectItem key={index} value={index.toString()}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Year</Label>
              <Input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                min="1900"
                max="2100"
              />
            </div>
          </div>

          <Button onClick={printCalendar} className="w-full">
            Print Calendar
          </Button>

          <div className="border rounded-lg p-4 bg-background">
            <h2 className="text-2xl font-bold text-center mb-4">
              {monthNames[parseInt(month)]} {year}
            </h2>
            
            <div className="grid grid-cols-7 gap-2">
              {dayNames.map(day => (
                <div key={day} className="text-center font-semibold text-sm p-2 bg-muted rounded">
                  {day}
                </div>
              ))}
              
              {calendar.map((day, index) => (
                <div
                  key={index}
                  className={`text-center p-2 min-h-12 border rounded ${
                    day === null 
                      ? "bg-muted/30" 
                      : day === new Date().getDate() && 
                        parseInt(month) === new Date().getMonth() && 
                        parseInt(year) === new Date().getFullYear()
                      ? "bg-primary text-primary-foreground font-bold"
                      : "hover:bg-muted"
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </ToolLayout>
  );
};

export default CalendarGenerator;
