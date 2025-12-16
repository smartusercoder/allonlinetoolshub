import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Network } from "lucide-react";

export default function BacklinkChecker() {
  return (
    <ToolLayout title="Backlink Checker" description="Check website backlinks">
      <Card className="p-6">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription className="space-y-3">
            <div className="flex items-start gap-2">
              <Network className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
              <div>
                <p className="font-medium mb-2">External API Required</p>
                <p className="text-sm text-muted-foreground">
                  Backlink checking requires access to external SEO databases and APIs which cannot be provided in a client-side tool.
                </p>
              </div>
            </div>
            <div className="text-sm">
              <p className="font-medium mb-1">Recommended tools:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
                <li>Ahrefs - Comprehensive backlink analysis</li>
                <li>SEMrush - Full SEO toolkit with backlink checker</li>
                <li>Moz Link Explorer - Free limited backlink data</li>
                <li>Google Search Console - Free backlinks to your own site</li>
              </ul>
            </div>
          </AlertDescription>
        </Alert>
      </Card>
    </ToolLayout>
  );
}
