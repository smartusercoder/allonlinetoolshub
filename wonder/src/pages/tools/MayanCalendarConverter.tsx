import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const MayanCalendarConverter = () => {
  const [gregorianDate, setGregorianDate] = useState("");
  const [mayanDate, setMayanDate] = useState<{ longCount: string; tzolkin: string; haab: string } | null>(null);

  const tzolkinDays = ["Imix", "Ik", "Akbal", "Kan", "Chicchan", "Cimi", "Manik", "Lamat", "Muluk", "Ok", "Chuen", "Eb", "Ben", "Ix", "Men", "Kib", "Kaban", "Etznab", "Kawak", "Ajaw"];
  const haabMonths = ["Pop", "Wo", "Sip", "Sotz", "Sek", "Xul", "Yaxkin", "Mol", "Chen", "Yax", "Sak", "Keh", "Mak", "Kankin", "Muwan", "Pax", "Kayab", "Kumku", "Wayeb"];

  const convert = () => {
    if (!gregorianDate) return;
    
    const date = new Date(gregorianDate);
    // Julian Day Number calculation
    const jd = Math.floor((date.getTime() / 86400000) + 2440587.5);
    
    // Mayan Long Count (correlation constant: GMT 584283)
    const mayanDays = jd - 584283;
    
    const baktun = Math.floor(mayanDays / 144000);
    const remainder1 = mayanDays % 144000;
    const katun = Math.floor(remainder1 / 7200);
    const remainder2 = remainder1 % 7200;
    const tun = Math.floor(remainder2 / 360);
    const remainder3 = remainder2 % 360;
    const uinal = Math.floor(remainder3 / 20);
    const kin = remainder3 % 20;
    
    // Tzolkin
    const tzolkinNum = ((mayanDays + 4) % 13) + 1;
    const tzolkinDay = tzolkinDays[(mayanDays + 19) % 20];
    
    // Haab
    const haabDay = ((mayanDays + 348) % 365) % 20;
    const haabMonth = haabMonths[Math.floor(((mayanDays + 348) % 365) / 20)];
    
    setMayanDate({
      longCount: `${baktun}.${katun}.${tun}.${uinal}.${kin}`,
      tzolkin: `${tzolkinNum} ${tzolkinDay}`,
      haab: `${haabDay} ${haabMonth}`
    });
  };

  return (
    <ToolLayout title="Mayan Calendar Converter" description="Convert dates to Mayan calendar systems">
      <Card className="p-6">
        <div className="space-y-4 max-w-md mx-auto">
          <div>
            <Label>Gregorian Date</Label>
            <Input type="date" value={gregorianDate} onChange={(e) => setGregorianDate(e.target.value)} />
          </div>
          <Button onClick={convert} className="w-full">Convert to Mayan Calendar</Button>
          {mayanDate && (
            <div className="space-y-3 mt-4">
              <div className="p-4 bg-amber-500/10 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Long Count</p>
                <p className="text-2xl font-bold text-amber-700">{mayanDate.longCount}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Tzolkin (Sacred)</p>
                  <p className="text-lg font-bold">{mayanDate.tzolkin}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Haab (Civil)</p>
                  <p className="text-lg font-bold">{mayanDate.haab}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
};

export default MayanCalendarConverter;
