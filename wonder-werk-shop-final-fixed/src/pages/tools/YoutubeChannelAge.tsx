import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";

const YoutubeChannelAge = () => {
  const [creationDate, setCreationDate] = useState("");
  const [age, setAge] = useState<{ years: number; months: number; days: number; totalDays: number } | null>(null);

  const calculateAge = () => {
    if (!creationDate) return;

    const created = new Date(creationDate);
    const now = new Date();
    
    if (created > now) return;

    const diffTime = Math.abs(now.getTime() - created.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    const years = Math.floor(diffDays / 365);
    const remainingDays = diffDays % 365;
    const months = Math.floor(remainingDays / 30);
    const days = remainingDays % 30;

    setAge({ years, months, days, totalDays: diffDays });
  };

  return (
    <ToolLayout
      title="YouTube Channel Age Checker"
      description="Calculate how old a YouTube channel is"
    >
      <div className="space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Channel Creation Date</label>
              <Input
                type="date"
                value={creationDate}
                onChange={(e) => setCreationDate(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
                className="w-full"
              />
            </div>

            <Button onClick={calculateAge} className="w-full">
              <Calendar className="w-4 h-4 mr-2" />
              Calculate Channel Age
            </Button>

            {age && (
              <div className="space-y-3 mt-4">
                <div className="p-6 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Channel Age</p>
                  <p className="text-3xl font-bold">
                    {age.years} {age.years === 1 ? 'year' : 'years'}
                    {age.months > 0 && `, ${age.months} ${age.months === 1 ? 'month' : 'months'}`}
                    {age.days > 0 && `, ${age.days} ${age.days === 1 ? 'day' : 'days'}`}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground">Total Days</p>
                    <p className="text-2xl font-bold">{age.totalDays.toLocaleString()}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground">Created On</p>
                    <p className="text-lg font-bold">
                      {new Date(creationDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6 bg-muted/50">
          <h3 className="font-semibold mb-3">How to Find Creation Date</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>Go to the YouTube channel's "About" page</li>
            <li>Look for "Joined" date in the channel details</li>
            <li>Enter that date in the field above</li>
          </ul>
        </Card>
      </div>
    </ToolLayout>
  );
};

export default YoutubeChannelAge;
