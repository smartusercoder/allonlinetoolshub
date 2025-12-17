import { Info, Lightbulb, AlertCircle, BookOpen } from "lucide-react";

interface UsageGuideProps {
  steps?: string[];
  tips?: string[];
  note?: string;
  example?: string;
}

export const UsageGuide = ({ steps, tips, note, example }: UsageGuideProps) => {
  if (!steps && !tips && !note && !example) return null;

  return (
    <div className="space-y-4 mb-6">
      {/* Quick Start Steps */}
      {steps && steps.length > 0 && (
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <h3 className="font-semibold text-sm flex items-center gap-2 mb-4 text-foreground">
            <Info className="h-4 w-4 text-primary" />
            Quick Start Guide
          </h3>
          <div className="space-y-3">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 text-xs font-semibold">
                  {index + 1}
                </span>
                <p className="text-sm text-muted-foreground leading-relaxed pt-0.5">{step}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pro Tips */}
      {tips && tips.length > 0 && (
        <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-5">
          <h3 className="font-semibold text-sm flex items-center gap-2 mb-3 text-foreground">
            <Lightbulb className="h-4 w-4 text-yellow-600" />
            Pro Tips
          </h3>
          <ul className="space-y-2">
            {tips.map((tip, index) => (
              <li key={index} className="flex gap-2 text-sm text-muted-foreground">
                <span className="text-yellow-600">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Important Note */}
      {note && (
        <div className="flex gap-3 rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
          <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
          <p className="text-sm text-muted-foreground">{note}</p>
        </div>
      )}

      {/* Example */}
      {example && (
        <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-5">
          <h3 className="font-semibold text-sm flex items-center gap-2 mb-3 text-foreground">
            <BookOpen className="h-4 w-4 text-green-600" />
            Example
          </h3>
          <div className="bg-background/80 rounded-lg p-4 border">
            <code className="text-sm text-muted-foreground font-mono whitespace-pre-wrap">
              {example}
            </code>
          </div>
        </div>
      )}
    </div>
  );
};
