import { useState, useEffect } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const cities = [
  { name: "New York", offset: -5 },
  { name: "London", offset: 0 },
  { name: "Tokyo", offset: 9 },
  { name: "Sydney", offset: 11 },
  { name: "Dubai", offset: 4 },
  { name: "Los Angeles", offset: -8 },
  { name: "Singapore", offset: 8 },
  { name: "Paris", offset: 1 },
  { name: "Hong Kong", offset: 8 },
  { name: "Mumbai", offset: 5.5 },
];

export default function WorldClock() {
  const [selectedCities, setSelectedCities] = useState(["New York", "London", "Tokyo"]);
  const [times, setTimes] = useState<Record<string, string>>({});

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      
      const newTimes: Record<string, string> = {};
      selectedCities.forEach(cityName => {
        const city = cities.find(c => c.name === cityName);
        if (city) {
          const cityTime = new Date(utc + (3600000 * city.offset));
          newTimes[cityName] = cityTime.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit' 
          });
        }
      });
      setTimes(newTimes);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, [selectedCities]);

  return (
    <ToolLayout
      title="World Clock"
      description="View time in different cities around the world"
    >
      <Card className="p-6">
        <div className="space-y-6">
          {selectedCities.map((cityName, index) => (
            <div key={index}>
              <div className="flex items-center gap-4">
                <Select 
                  value={cityName} 
                  onValueChange={(val) => {
                    const newCities = [...selectedCities];
                    newCities[index] = val;
                    setSelectedCities(newCities);
                  }}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map(city => (
                      <SelectItem key={city.name} value={city.name}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="flex-1 p-4 bg-primary/10 rounded-lg">
                  <div className="text-3xl font-bold font-mono text-primary">
                    {times[cityName] || "00:00:00"}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </ToolLayout>
  );
}
