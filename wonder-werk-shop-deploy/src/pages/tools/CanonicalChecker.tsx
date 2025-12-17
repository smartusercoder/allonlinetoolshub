import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link2, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CanonicalChecker = () => {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();

  const checkCanonical = () => {
    if (!url.trim()) {
      toast({
        title: "Error",
        description: "Please enter a URL",
        variant: "destructive",
      });
      return;
    }

    // Simulated canonical check
    const mockResult = {
      hasCanonical: true,
      canonicalUrl: "https://example.com/page",
      matches: true,
      selfReferencing: true,
      protocol: "https",
    };

    setResult(mockResult);
  };

  return (
    <ToolLayout
      title="Canonical URL Checker"
      description="Check if a page has proper canonical tags"
    >
      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="url">URL</Label>
          <div className="flex gap-2">
            <Input
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/page"
            />
            <Button onClick={checkCanonical}>
              <Link2 className="mr-2 h-4 w-4" />
              Check
            </Button>
          </div>
        </div>

        {result && (
          <div className="space-y-3 pt-4 border-t">
            <div className="flex items-center gap-2">
              {result.hasCanonical ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              <h3 className="font-semibold text-lg">
                {result.hasCanonical ? "Canonical Tag Found" : "No Canonical Tag"}
              </h3>
            </div>

            {result.hasCanonical && (
              <div className="space-y-3">
                <div className="p-3 bg-muted rounded-md">
                  <p className="text-sm font-medium">Canonical URL</p>
                  <p className="text-sm text-muted-foreground break-all">
                    {result.canonicalUrl}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-muted rounded-md">
                    <p className="text-sm font-medium">Self-Referencing</p>
                    <p className="text-sm text-muted-foreground">
                      {result.selfReferencing ? "Yes ✓" : "No ✗"}
                    </p>
                  </div>
                  <div className="p-3 bg-muted rounded-md">
                    <p className="text-sm font-medium">Protocol</p>
                    <p className="text-sm text-muted-foreground">
                      {result.protocol.toUpperCase()}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
              Note: This is a simulated check. Real implementation requires backend to fetch and parse HTML.
            </div>
          </div>
        )}
      </Card>
    </ToolLayout>
  );
};

export default CanonicalChecker;
