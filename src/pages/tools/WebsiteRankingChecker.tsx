import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ValidatedInput } from "@/components/form/ValidatedInput";
import { Search, TrendingUp, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function WebsiteRankingChecker() {
  const [url, setUrl] = useState("");
  const [keyword, setKeyword] = useState("");

  const checkRanking = () => {
    if (!url || !keyword) {
      toast.error("Please enter both URL and keyword");
      return;
    }
    toast.info("This tool requires API access to search engines", {
      description: "Use Google Search Console or SEO tools like Ahrefs, SEMrush for accurate ranking data"
    });
  };

  return (
    <ToolLayout
      title="Website Ranking Checker"
      description="Check your website's search engine ranking"
    >
      <Card className="p-6">
        <div className="space-y-6">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <p className="font-medium mb-1">API Required</p>
              <p className="text-sm">
                Checking real-time search engine rankings requires API access to search engines.
                For accurate data, use:
              </p>
              <ul className="list-disc list-inside mt-2 text-sm space-y-1">
                <li>Google Search Console - Free official tool</li>
                <li>Ahrefs - Professional SEO suite</li>
                <li>SEMrush - Comprehensive SEO platform</li>
                <li>Moz - SEO analytics and ranking tracker</li>
              </ul>
            </AlertDescription>
          </Alert>

          <ValidatedInput
            label="Website URL"
            value={url}
            onChange={setUrl}
            placeholder="https://example.com"
          />

          <ValidatedInput
            label="Target Keyword"
            value={keyword}
            onChange={setKeyword}
            placeholder="Enter keyword to check ranking for"
          />

          <Button onClick={checkRanking} className="w-full" disabled>
            <Search className="w-4 h-4 mr-2" />
            Check Ranking (Requires API)
          </Button>
        </div>
      </Card>
    </ToolLayout>
  );
}
