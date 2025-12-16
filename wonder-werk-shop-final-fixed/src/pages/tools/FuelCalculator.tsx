import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { UsageGuide } from "@/components/UsageGuide";

export default function FuelCalculator() {
  const [distance, setDistance] = useState("100");
  const [fuel, setFuel] = useState("50");
  const [price, setPrice] = useState("1.5");

  const consumption = (parseFloat(fuel) / parseFloat(distance)) * 100;
  const cost = parseFloat(fuel) * parseFloat(price);
  const costPer100 = consumption * parseFloat(price);

  return (
    <ToolLayout title="Fuel Calculator" description="Calculate fuel consumption and costs">
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Enter the distance traveled in kilometers",
            "Enter how much fuel you used in liters",
            "Enter the price per liter of fuel",
            "View L/100km, total cost, and cost per 100km"
          ]}
          tips={[
            "Track fuel efficiency over time to spot issues",
            "Lower L/100km = better fuel economy",
            "Great for comparing different vehicles",
            "Use for budgeting road trips and commutes"
          ]}
          example="100km trip, 5L used at $1.50/L = 5 L/100km, $7.50 total"
        />
      </div>
      <div className="space-y-4 mt-6">
        <Input type="number" value={distance} onChange={e => setDistance(e.target.value)} placeholder="Distance (km)" />
        <Input type="number" value={fuel} onChange={e => setFuel(e.target.value)} placeholder="Fuel Used (L)" />
        <Input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="Price per Liter" />
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold">{consumption.toFixed(2)}</div>
            <div className="text-xs">L/100km</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold">${cost.toFixed(2)}</div>
            <div className="text-xs">Total Cost</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold">${costPer100.toFixed(2)}</div>
            <div className="text-xs">Cost/100km</div>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
