import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calculator } from "lucide-react";

const YoutubeViewsRatio = () => {
  const [views, setViews] = useState("");
  const [subscribers, setSubscribers] = useState("");
  const [result, setResult] = useState<{ ratio: number; percentage: number; analysis: string } | null>(null);

  const calculate = () => {
    const viewCount = parseFloat(views);
    const subCount = parseFloat(subscribers);

    if (isNaN(viewCount) || isNaN(subCount) || subCount === 0) {
      return;
    }

    const ratio = viewCount / subCount;
    const percentage = (ratio * 100);
    
    let analysis = "";
    if (ratio >= 1) {
      analysis = "Excellent! Your views exceed your subscriber count.";
    } else if (ratio >= 0.5) {
      analysis = "Good engagement! About half your subscribers are watching.";
    } else if (ratio >= 0.2) {
      analysis = "Average engagement. Consider improving your content.";
    } else {
      analysis = "Low engagement. Focus on creating more engaging content.";
    }

    setResult({ ratio, percentage, analysis });
  };

  return (
    <ToolLayout
      title="YouTube Views Ratio Calculator"
      description="Calculate views to subscribers engagement ratio"
    >
      <div className="space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Video Views</label>
              <Input
                type="number"
                value={views}
                onChange={(e) => setViews(e.target.value)}
                placeholder="e.g., 50000"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Subscriber Count</label>
              <Input
                type="number"
                value={subscribers}
                onChange={(e) => setSubscribers(e.target.value)}
                placeholder="e.g., 100000"
                min="1"
              />
            </div>

            <Button onClick={calculate} className="w-full">
              <Calculator className="w-4 h-4 mr-2" />
              Calculate Ratio
            </Button>

            {result && (
              <div className="space-y-3 mt-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Views to Subscribers Ratio</p>
                  <p className="text-3xl font-bold">{result.ratio.toFixed(2)}:1</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Engagement Percentage</p>
                  <p className="text-3xl font-bold">{result.percentage.toFixed(1)}%</p>
                </div>
                <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <p className="text-sm font-medium">{result.analysis}</p>
                </div>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6 bg-muted/50">
          <h3 className="font-semibold mb-3">Understanding the Ratio</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>1.0+ ratio: Excellent - Views exceed subscribers</li>
            <li>0.5-1.0 ratio: Good - Strong subscriber engagement</li>
            <li>0.2-0.5 ratio: Average - Room for improvement</li>
            <li>Below 0.2: Low - Need better content strategy</li>
          </ul>
        </Card>
      </div>
    </ToolLayout>
  );
};

export default YoutubeViewsRatio;
