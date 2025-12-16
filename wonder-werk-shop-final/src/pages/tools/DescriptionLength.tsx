import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertCircle, XCircle } from "lucide-react";

const DescriptionLength = () => {
  const [description, setDescription] = useState("");
  const minLength = 120;
  const maxLength = 160;

  const getStatus = () => {
    const length = description.length;
    if (length === 0) return { type: "neutral", message: "Enter a description to check" };
    if (length < minLength) return { type: "warning", message: "Description is too short" };
    if (length > maxLength) return { type: "error", message: "Description is too long" };
    return { type: "success", message: "Description length is optimal" };
  };

  const status = getStatus();
  const progress = Math.min((description.length / maxLength) * 100, 100);

  const getStatusIcon = () => {
    switch (status.type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <ToolLayout
      title="Meta Description Checker"
      description="Check if your meta description length is optimized for SEO"
    >
      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="description">Meta Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your meta description..."
            rows={4}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getStatusIcon()}
              <span className="font-medium">{status.message}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {description.length} / {maxLength} characters
            </span>
          </div>

          <Progress value={progress} />

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-3 bg-muted rounded-md">
              <p className="text-sm text-muted-foreground">Minimum Length</p>
              <p className="text-lg font-semibold">{minLength} characters</p>
            </div>
            <div className="p-3 bg-muted rounded-md">
              <p className="text-sm text-muted-foreground">Maximum Length</p>
              <p className="text-lg font-semibold">{maxLength} characters</p>
            </div>
          </div>

          <div className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
            <p className="font-medium mb-1">Best Practices:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Keep descriptions between 120-160 characters</li>
              <li>Include target keywords naturally</li>
              <li>Write compelling copy that encourages clicks</li>
              <li>Accurately describe page content</li>
              <li>Make each description unique</li>
            </ul>
          </div>
        </div>
      </Card>
    </ToolLayout>
  );
};

export default DescriptionLength;
