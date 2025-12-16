import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UsageGuide } from "@/components/UsageGuide";
import { toolFAQs } from "@/data/faqData";

const AgeCalculator = () => {
  const [birthdate, setBirthdate] = useState("");

  const calculateAge = () => {
    if (!birthdate) return null;

    const birth = new Date(birthdate);
    const today = new Date();
    
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;

    // Next birthday
    const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    const daysUntilBirthday = Math.floor((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    return {
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalMonths,
      totalHours,
      totalMinutes,
      daysUntilBirthday,
      nextAge: years + 1
    };
  };

  const age = calculateAge();

  return (
    <ToolLayout
      title="Age Calculator"
      description="Calculate your exact age in years, months, days, hours, and minutes. Free online age calculator with birthday countdown."
      keywords={[
        "age calculator", "calculate age", "how old am I", "exact age calculator",
        "birthday calculator", "age in days", "age from birthdate"
      ]}
      category="date-time"
      faqs={toolFAQs["age-calculator"]}
      howToSteps={[
        {
          name: "Enter Your Birth Date",
          text: "Use the date picker to select your birth date. You can type the date directly or use the calendar picker for easy selection."
        },
        {
          name: "View Your Exact Age",
          text: "Your age is calculated instantly and displayed in years, months, and days. The calculation accounts for leap years and varying month lengths."
        },
        {
          name: "Explore Time Breakdowns",
          text: "See your age expressed in different units: total months, weeks, days, hours, and even minutes since you were born."
        },
        {
          name: "Check Birthday Countdown",
          text: "Find out exactly how many days until your next birthday. Plan your celebrations with the countdown feature."
        }
      ]}
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Select your birth date using the date picker",
            "Your exact age appears instantly",
            "View breakdown in years, months, and days",
            "See totals in months, weeks, days, hours, minutes",
            "Find out days until your next birthday!"
          ]}
          tips={[
            "Great for precise age calculations",
            "Shows comprehensive time breakdowns",
            "Perfect for birthday countdowns",
            "Useful for age verification forms"
          ]}
        />
        <div className="space-y-2">
          <Label>Birth Date</Label>
          <Input
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
          />
        </div>

        {age && (
          <>
            <div className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl text-center border-2 border-primary/20">
              <div className="text-sm text-muted-foreground mb-2">Your Age</div>
              <div className="text-5xl font-bold text-primary mb-2">{age.years}</div>
              <div className="text-lg text-muted-foreground">
                {age.years} years, {age.months} months, {age.days} days
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted/30 rounded-lg text-center">
                <div className="text-2xl font-bold">{age.totalMonths}</div>
                <div className="text-sm text-muted-foreground">Total Months</div>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg text-center">
                <div className="text-2xl font-bold">{age.totalWeeks}</div>
                <div className="text-sm text-muted-foreground">Total Weeks</div>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg text-center">
                <div className="text-2xl font-bold">{age.totalDays}</div>
                <div className="text-sm text-muted-foreground">Total Days</div>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg text-center">
                <div className="text-2xl font-bold">{age.totalHours.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Hours</div>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg text-center">
                <div className="text-2xl font-bold">{age.totalMinutes.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Minutes</div>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg text-center">
                <div className="text-2xl font-bold">{age.daysUntilBirthday}</div>
                <div className="text-sm text-muted-foreground">Days to Birthday</div>
              </div>
            </div>

            <div className="p-4 bg-green-500/10 border-l-4 border-green-500 rounded">
              <div className="text-sm font-semibold">
                🎂 Next birthday in {age.daysUntilBirthday} days - You'll be {age.nextAge}!
              </div>
            </div>
          </>
        )}
      </div>
    </ToolLayout>
  );
};

export default AgeCalculator;