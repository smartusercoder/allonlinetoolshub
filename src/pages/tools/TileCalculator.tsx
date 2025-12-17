import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function TileCalculator() {
  const [roomLength, setRoomLength] = useState("10");
  const [roomWidth, setRoomWidth] = useState("8");
  const [tileLength, setTileLength] = useState("30");
  const [tileWidth, setTileWidth] = useState("30");
  const [wastage, setWastage] = useState("10");

  const calculate = () => {
    const rl = parseFloat(roomLength) * 100; // convert to cm
    const rw = parseFloat(roomWidth) * 100;
    const tl = parseFloat(tileLength);
    const tw = parseFloat(tileWidth);
    const w = parseFloat(wastage);

    const roomArea = (rl * rw) / 10000; // m²
    const tileArea = (tl * tw) / 10000; // m²
    const tilesNeeded = Math.ceil(roomArea / tileArea);
    const tilesWithWastage = Math.ceil(tilesNeeded * (1 + w / 100));
    
    // Assuming tiles come in boxes of 10
    const boxes = Math.ceil(tilesWithWastage / 10);

    return {
      roomArea: roomArea.toFixed(2),
      tilesNeeded,
      tilesWithWastage,
      boxes,
      wastageAmount: tilesWithWastage - tilesNeeded
    };
  };

  const result = calculate();

  return (
    <ToolLayout title="Tile Calculator" description="Calculate tiles needed for your project">
      <div className="space-y-4">
        <Card className="p-6 space-y-4">
          <div className="space-y-2">
            <Label className="text-base font-semibold">Room Dimensions</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="roomLength">Length (meters)</Label>
                <Input id="roomLength" type="number" step="0.1" value={roomLength} onChange={(e) => setRoomLength(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="roomWidth">Width (meters)</Label>
                <Input id="roomWidth" type="number" step="0.1" value={roomWidth} onChange={(e) => setRoomWidth(e.target.value)} />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-base font-semibold">Tile Size</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tileLength">Length (cm)</Label>
                <Input id="tileLength" type="number" value={tileLength} onChange={(e) => setTileLength(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tileWidth">Width (cm)</Label>
                <Input id="tileWidth" type="number" value={tileWidth} onChange={(e) => setTileWidth(e.target.value)} />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="wastage">Wastage Percentage: {wastage}%</Label>
            <Input
              id="wastage"
              type="range"
              min="5"
              max="20"
              value={wastage}
              onChange={(e) => setWastage(e.target.value)}
            />
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Room Area</div>
            <div className="text-2xl font-bold">{result.roomArea} m²</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Tiles Needed</div>
            <div className="text-2xl font-bold">{result.tilesNeeded}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">With Wastage</div>
            <div className="text-2xl font-bold">{result.tilesWithWastage}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Boxes (10/box)</div>
            <div className="text-2xl font-bold">{result.boxes}</div>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
