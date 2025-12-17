import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, LinkIcon } from "lucide-react";

export default function BrokenLinkChecker() {
  return (
    <ToolLayout title="Broken Link Checker" description="Find broken links on websites">
      <Card className="p-6">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription className="space-y-3">
            <div className="flex items-start gap-2">
              <LinkIcon className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
              <div>
                <p className="font-medium mb-2">Server-Side Tool Required</p>
                <p className="text-sm text-muted-foreground">
                  Broken link checking requires crawling websites and making multiple HTTP requests, which is best done server-side due to CORS restrictions.
                </p>
              </div>
            </div>
            <div className="text-sm">
              <p className="font-medium mb-1">Recommended tools:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
                <li>Screaming Frog SEO Spider - Desktop crawler (free up to 500 URLs)</li>
                <li>Dead Link Checker - Online broken link checker</li>
                <li>W3C Link Checker - Free online tool</li>
                <li>Google Search Console - Reports broken links on your site</li>
              </ul>
            </div>
          </AlertDescription>
        </Alert>
      </Card>
    </ToolLayout>
  );
}
