import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

export default function DateToWords() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const dateToWords = (date: Date) => {
    const day = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'long' });
    const year = date.getFullYear();
    
    const getOrdinal = (n: number) => {
      const s = ["th", "st", "nd", "rd"];
      const v = n % 100;
      return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };
    
    return `${getOrdinal(day)} of ${month}, ${year}`;
  };

  const selectedDate = new Date(date);
  const wordsResult = dateToWords(selectedDate);

  return (
    <>
      <Helmet>
        <title>Date to Words Converter - Convert Date to Written Format | Free Tool</title>
        <meta name="description" content="Convert dates to words and written format. Transform numeric dates into spelled out text format. Free date to words converter." />
        <meta name="keywords" content="date to words, convert date, written date, spell out date, date converter" />
        <meta property="og:title" content="Date to Words Converter - Convert Dates to Text" />
        <meta property="og:description" content="Convert dates to words and written format easily." />
      </Helmet>
      <ToolLayout
        title="Date to Words Converter"
        description="Convert dates to written word format"
      >
        <Card className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date">Select Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <Card className="p-6 bg-primary/10">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <div className="text-sm text-muted-foreground mb-2">Date in Words</div>
                <div className="text-2xl font-semibold text-primary">{wordsResult}</div>
              </div>
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(wordsResult);
                  toast.success("Copied!");
                }}
                size="icon"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </Card>

          <Card className="p-4">
            <div className="text-sm text-muted-foreground mb-2">Alternative Formats</div>
            <div className="space-y-2 text-sm">
              <div>{selectedDate.toLocaleDateString('en-US', { dateStyle: 'full' })}</div>
              <div>{selectedDate.toLocaleDateString('en-US', { dateStyle: 'long' })}</div>
              <div>{selectedDate.toLocaleDateString('en-US', { dateStyle: 'medium' })}</div>
            </div>
          </Card>
        </Card>
      </ToolLayout>
    </>
  );
}
