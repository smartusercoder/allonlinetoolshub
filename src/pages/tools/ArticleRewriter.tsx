import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, RefreshCw } from "lucide-react";

export default function ArticleRewriter() {
  return (
    <ToolLayout
      title="Article Rewriter"
      description="Rewrite articles with different wording"
    >
      <Card className="p-6">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription className="space-y-3">
            <div className="flex items-start gap-2">
              <RefreshCw className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
              <div>
                <p className="font-medium mb-2">AI Rewriting Not Available</p>
                <p className="text-sm text-muted-foreground">
                  Automatic article rewriting requires advanced AI language models and natural language processing that's not suitable for client-side processing.
                </p>
              </div>
            </div>
            <div className="text-sm">
              <p className="font-medium mb-1">Recommended AI writing tools:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
                <li>ChatGPT - OpenAI's language model for rewriting</li>
                <li>Claude - Anthropic's AI assistant for content</li>
                <li>Quillbot - Paraphrasing and rewriting tool</li>
                <li>Grammarly - Writing assistant with rewriting features</li>
                <li>Jasper AI - AI content creation and rewriting</li>
              </ul>
            </div>
          </AlertDescription>
        </Alert>
      </Card>
    </ToolLayout>
  );
}
