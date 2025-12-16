import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle, CheckCircle } from "lucide-react";

const YoutubeTitleLength = () => {
  const [title, setTitle] = useState("");
  const MAX_LENGTH = 100;
  const OPTIMAL_MIN = 60;

  const getStatus = () => {
    const length = title.length;
    if (length === 0) return null;
    if (length > MAX_LENGTH) return { type: "error", message: "Title too long! YouTube will truncate it." };
    if (length < OPTIMAL_MIN) return { type: "warning", message: "Title could be longer for better SEO." };
    return { type: "success", message: "Title length is optimal!" };
  };

  const status = getStatus();

  return (
    <ToolLayout
      title="YouTube Title Length Checker"
      description="Check if your YouTube title length is optimal"
    >
      <div className="space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">YouTube Video Title</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your YouTube video title..."
                className="w-full"
              />
            </div>

            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                Character Count: <span className="font-bold">{title.length}</span> / {MAX_LENGTH}
              </p>
              <div className="h-2 flex-1 mx-4 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    title.length > MAX_LENGTH ? 'bg-destructive' :
                    title.length >= OPTIMAL_MIN ? 'bg-green-500' : 'bg-yellow-500'
                  }`}
                  style={{ width: `${Math.min((title.length / MAX_LENGTH) * 100, 100)}%` }}
                />
              </div>
            </div>

            {status && (
              <div className={`flex items-center gap-2 p-3 rounded-lg ${
                status.type === 'success' ? 'bg-green-500/10 text-green-600' :
                status.type === 'warning' ? 'bg-yellow-500/10 text-yellow-600' :
                'bg-destructive/10 text-destructive'
              }`}>
                {status.type === 'success' ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <AlertCircle className="w-5 h-5" />
                )}
                <p className="text-sm font-medium">{status.message}</p>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6 bg-muted/50">
          <h3 className="font-semibold mb-3">YouTube Title Best Practices</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>Optimal length: 60-100 characters</li>
            <li>Keep most important keywords at the beginning</li>
            <li>Make it compelling and clickable</li>
            <li>Avoid ALL CAPS or excessive punctuation</li>
            <li>Include relevant keywords naturally</li>
          </ul>
        </Card>
      </div>
    </ToolLayout>
  );
};

export default YoutubeTitleLength;
