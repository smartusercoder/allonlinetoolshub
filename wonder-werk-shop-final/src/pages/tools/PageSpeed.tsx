import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Gauge } from "lucide-react";

export default function PageSpeed() {
  return (
    <ToolLayout title="Page Speed Test" description="Test website loading speed">
      <Card className="p-6">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription className="space-y-3">
            <div className="flex items-start gap-2">
              <Gauge className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
              <div>
                <p className="font-medium mb-2">External Service Required</p>
                <p className="text-sm text-muted-foreground">
                  Accurate page speed testing requires server infrastructure to load pages from different locations and analyze performance metrics.
                </p>
              </div>
            </div>
            <div className="text-sm">
              <p className="font-medium mb-1">Recommended tools:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
                <li>Google PageSpeed Insights - Free, official Google tool</li>
                <li>GTmetrix - Detailed performance analysis</li>
                <li>WebPageTest - Advanced testing with multiple locations</li>
                <li>Lighthouse (Chrome DevTools) - Built into Chrome browser</li>
              </ul>
            </div>
          </AlertDescription>
        </Alert>
      </Card>
    </ToolLayout>
  );
}
