import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calculator } from "lucide-react";

const YoutubeMoneyCalculator = () => {
  const [views, setViews] = useState("");
  const [earnings, setEarnings] = useState<{ min: number; max: number } | null>(null);

  const calculateEarnings = () => {
    const viewCount = parseFloat(views);
    if (!viewCount || viewCount <= 0) return;

    // YouTube CPM typically ranges from $0.25 to $4.00 per 1000 views
    const minCPM = 0.25;
    const maxCPM = 4.00;

    const min = (viewCount / 1000) * minCPM;
    const max = (viewCount / 1000) * maxCPM;

    setEarnings({ min, max });
  };

  return (
    <ToolLayout
      title="YouTube Money Calculator"
      description="Estimate YouTube earnings from video views"
    >
      <div className="space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Number of Views</label>
              <Input
                type="number"
                value={views}
                onChange={(e) => setViews(e.target.value)}
                placeholder="Enter view count"
                className="w-full"
              />
            </div>

            <Button onClick={calculateEarnings} className="w-full">
              <Calculator className="w-4 h-4 mr-2" />
              Calculate Earnings
            </Button>

            {earnings && (
              <div className="space-y-3">
                <h3 className="font-semibold">Estimated Earnings</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Minimum</p>
                    <p className="text-2xl font-bold text-green-600">
                      ${earnings.min.toFixed(2)}
                    </p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Maximum</p>
                    <p className="text-2xl font-bold text-green-600">
                      ${earnings.max.toFixed(2)}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  * Estimates based on average CPM of $0.25 - $4.00 per 1000 views
                </p>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6 bg-muted/50">
          <h3 className="font-semibold mb-3">Factors Affecting Earnings</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>Video niche and content type</li>
            <li>Audience location and demographics</li>
            <li>Ad engagement rate</li>
            <li>Video length and watch time</li>
            <li>Season and advertising demand</li>
          </ul>
        </Card>
      </div>
    </ToolLayout>
  );
};

export default YoutubeMoneyCalculator;
