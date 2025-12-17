import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calculator } from "lucide-react";

const ConfidenceInterval = () => {
  const [sampleMean, setSampleMean] = useState("");
  const [sampleSize, setSampleSize] = useState("");
  const [stdDev, setStdDev] = useState("");
  const [confidenceLevel, setConfidenceLevel] = useState("95");
  const [result, setResult] = useState<{ lower: number; upper: number; margin: number } | null>(null);

  const calculate = () => {
    const mean = parseFloat(sampleMean);
    const n = parseFloat(sampleSize);
    const sd = parseFloat(stdDev);
    const confidence = parseFloat(confidenceLevel);

    if (isNaN(mean) || isNaN(n) || isNaN(sd) || n <= 0 || sd <= 0) {
      return;
    }

    // Z-scores for common confidence levels
    const zScores: Record<string, number> = {
      "90": 1.645,
      "95": 1.96,
      "99": 2.576
    };

    const z = zScores[confidence] || 1.96;
    const marginOfError = z * (sd / Math.sqrt(n));
    const lowerBound = mean - marginOfError;
    const upperBound = mean + marginOfError;

    setResult({
      lower: lowerBound,
      upper: upperBound,
      margin: marginOfError
    });
  };

  return (
    <ToolLayout
      title="Confidence Interval Calculator"
      description="Calculate statistical confidence intervals"
    >
      <div className="space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Sample Mean</label>
              <Input
                type="number"
                value={sampleMean}
                onChange={(e) => setSampleMean(e.target.value)}
                placeholder="e.g., 100"
                step="any"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Sample Size (n)</label>
              <Input
                type="number"
                value={sampleSize}
                onChange={(e) => setSampleSize(e.target.value)}
                placeholder="e.g., 30"
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Standard Deviation</label>
              <Input
                type="number"
                value={stdDev}
                onChange={(e) => setStdDev(e.target.value)}
                placeholder="e.g., 15"
                step="any"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Confidence Level</label>
              <select
                value={confidenceLevel}
                onChange={(e) => setConfidenceLevel(e.target.value)}
                className="w-full p-2 border rounded-md bg-background"
              >
                <option value="90">90%</option>
                <option value="95">95%</option>
                <option value="99">99%</option>
              </select>
            </div>

            <Button onClick={calculate} className="w-full">
              <Calculator className="w-4 h-4 mr-2" />
              Calculate Confidence Interval
            </Button>

            {result && (
              <div className="space-y-3 mt-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Confidence Interval</p>
                  <p className="text-xl font-bold">
                    [{result.lower.toFixed(4)}, {result.upper.toFixed(4)}]
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground">Margin of Error</p>
                    <p className="text-lg font-bold">±{result.margin.toFixed(4)}</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground">Confidence</p>
                    <p className="text-lg font-bold">{confidenceLevel}%</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6 bg-muted/50">
          <h3 className="font-semibold mb-3">About Confidence Intervals</h3>
          <p className="text-sm text-muted-foreground">
            A confidence interval is a range of values that likely contains an unknown population 
            parameter. The {confidenceLevel}% confidence level means that if we repeated this 
            study many times, {confidenceLevel}% of the intervals would contain the true population mean.
          </p>
        </Card>
      </div>
    </ToolLayout>
  );
};

export default ConfidenceInterval;
