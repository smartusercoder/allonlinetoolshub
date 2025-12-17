import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertCircle, XCircle } from "lucide-react";

const TitleLength = () => {
  const [title, setTitle] = useState("");
  const minLength = 30;
  const maxLength = 60;

  const getStatus = () => {
    const length = title.length;
    if (length === 0) return { type: "neutral", message: "Enter a title to check" };
    if (length < minLength) return { type: "warning", message: "Title is too short" };
    if (length > maxLength) return { type: "error", message: "Title is too long" };
    return { type: "success", message: "Title length is optimal" };
  };

  const status = getStatus();
  const progress = Math.min((title.length / maxLength) * 100, 100);

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
      title="Title Tag Length Checker"
      description="Check if your meta title length is optimized for SEO"
    >
      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Page Title</Label>
          <Textarea
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your page title..."
            rows={3}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getStatusIcon()}
              <span className="font-medium">{status.message}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {title.length} / {maxLength} characters
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
              <li>Keep titles between 30-60 characters</li>
              <li>Include primary keyword near the beginning</li>
              <li>Make it compelling and click-worthy</li>
              <li>Each page should have a unique title</li>
            </ul>
          </div>
        </div>
      </Card>
    </ToolLayout>
  );
};

export default TitleLength;
