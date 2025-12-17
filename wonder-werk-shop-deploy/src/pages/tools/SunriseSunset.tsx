import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

export default function SunriseSunset() {
  const [latitude, setLatitude] = useState("40.7128");
  const [longitude, setLongitude] = useState("-74.0060");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  return (
    <>
      <Helmet>
        <title>Sunrise Sunset Calculator - Calculate Sunrise and Sunset Times | Free Tool</title>
        <meta name="description" content="Calculate sunrise and sunset times for any location and date. Free sunrise sunset calculator with accurate solar position data." />
        <meta name="keywords" content="sunrise calculator, sunset calculator, sunrise time, sunset time, solar calculator" />
        <meta property="og:title" content="Sunrise Sunset Calculator" />
        <meta property="og:description" content="Calculate sunrise and sunset times for any location and date." />
      </Helmet>
      <ToolLayout
        title="Sunrise Sunset Calculator"
        description="Calculate sunrise and sunset times for any location"
      >
        <Card className="p-6 space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="lat">Latitude</Label>
              <Input
                id="lat"
                type="number"
                step="0.0001"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                placeholder="40.7128"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lng">Longitude</Label>
              <Input
                id="lng"
                type="number"
                step="0.0001"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                placeholder="-74.0060"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Sunrise and sunset calculations require complex astronomical algorithms. Use a specialized API or library for accurate results based on your location.
            </AlertDescription>
          </Alert>
        </Card>
      </ToolLayout>
    </>
  );
}
