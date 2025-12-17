import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SunriseSunsetCalculator = () => {
  const [date, setDate] = useState("");
  const [latitude, setLatitude] = useState("40.7128");
  const [longitude, setLongitude] = useState("-74.0060");
  const [result, setResult] = useState<{ sunrise: string; sunset: string; dayLength: string } | null>(null);

  const calculate = () => {
    if (!date || !latitude || !longitude) return;
    
    const d = new Date(date);
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    
    // Day of year
    const start = new Date(d.getFullYear(), 0, 0);
    const diff = d.getTime() - start.getTime();
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    // Solar calculations (simplified)
    const zenith = 90.833;
    const D2R = Math.PI / 180;
    const R2D = 180 / Math.PI;
    
    // Approximate equation of time
    const B = (360 / 365) * (dayOfYear - 81) * D2R;
    const EoT = 9.87 * Math.sin(2 * B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B);
    
    // Solar declination
    const decl = 23.45 * Math.sin((360 / 365) * (dayOfYear - 81) * D2R);
    
    // Hour angle
    const cosHa = (Math.cos(zenith * D2R) - Math.sin(lat * D2R) * Math.sin(decl * D2R)) /
                  (Math.cos(lat * D2R) * Math.cos(decl * D2R));
    
    if (cosHa > 1 || cosHa < -1) {
      setResult({ sunrise: "N/A", sunset: "N/A", dayLength: "Polar day/night" });
      return;
    }
    
    const ha = Math.acos(cosHa) * R2D;
    
    // Calculate times
    const solarNoon = 12 - (lng / 15) - (EoT / 60);
    const sunriseTime = solarNoon - (ha / 15);
    const sunsetTime = solarNoon + (ha / 15);
    
    const formatTime = (hours: number) => {
      const h = Math.floor(hours);
      const m = Math.round((hours - h) * 60);
      return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
    };
    
    const dayLengthHours = (ha * 2) / 15;
    const dlH = Math.floor(dayLengthHours);
    const dlM = Math.round((dayLengthHours - dlH) * 60);
    
    setResult({
      sunrise: formatTime(sunriseTime),
      sunset: formatTime(sunsetTime),
      dayLength: `${dlH}h ${dlM}m`
    });
  };

  return (
    <ToolLayout title="Sunrise Sunset Calculator" description="Calculate sunrise and sunset times for any location">
      <Card className="p-6">
        <div className="space-y-4 max-w-md mx-auto">
          <div>
            <Label>Date</Label>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Latitude</Label>
              <Input type="number" step="0.0001" value={latitude} onChange={(e) => setLatitude(e.target.value)} placeholder="e.g., 40.7128" />
            </div>
            <div>
              <Label>Longitude</Label>
              <Input type="number" step="0.0001" value={longitude} onChange={(e) => setLongitude(e.target.value)} placeholder="e.g., -74.0060" />
            </div>
          </div>
          <Button onClick={calculate} className="w-full">Calculate Sun Times</Button>
          {result && (
            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="p-4 bg-orange-500/10 rounded-lg text-center">
                <p className="text-2xl">🌅</p>
                <p className="text-lg font-bold text-orange-600">{result.sunrise}</p>
                <p className="text-sm text-muted-foreground">Sunrise</p>
              </div>
              <div className="p-4 bg-blue-500/10 rounded-lg text-center">
                <p className="text-2xl">⏱️</p>
                <p className="text-lg font-bold text-blue-600">{result.dayLength}</p>
                <p className="text-sm text-muted-foreground">Day Length</p>
              </div>
              <div className="p-4 bg-purple-500/10 rounded-lg text-center">
                <p className="text-2xl">🌇</p>
                <p className="text-lg font-bold text-purple-600">{result.sunset}</p>
                <p className="text-sm text-muted-foreground">Sunset</p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
};

export default SunriseSunsetCalculator;
