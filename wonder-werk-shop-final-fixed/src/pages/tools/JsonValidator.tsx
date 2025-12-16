import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle } from "lucide-react";

const JsonValidator = () => {
  const [json, setJson] = useState("");
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const validateJson = (value: string) => {
    setJson(value);
    if (!value.trim()) {
      setIsValid(null);
      setError("");
      return;
    }

    try {
      JSON.parse(value);
      setIsValid(true);
      setError("");
    } catch (e: any) {
      setIsValid(false);
      setError(e.message);
    }
  };

  return (
    <ToolLayout
      title="JSON Validator"
      description="Validate JSON syntax and structure"
    >
      <Card>
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-2">
            <Label>JSON Input</Label>
            <Textarea
              value={json}
              onChange={(e) => validateJson(e.target.value)}
              placeholder='{"name": "value"}'
              rows={15}
              className="font-mono text-sm"
            />
          </div>

          {isValid !== null && (
            <Alert className={isValid ? "border-green-500 bg-green-50 dark:bg-green-950" : "border-red-500 bg-red-50 dark:bg-red-950"}>
              <div className="flex items-start gap-2">
                {isValid ? (
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
                )}
                <AlertDescription className={isValid ? "text-green-900 dark:text-green-100" : "text-red-900 dark:text-red-100"}>
                  {isValid ? (
                    <span className="font-semibold">✓ Valid JSON</span>
                  ) : (
                    <div>
                      <p className="font-semibold mb-1">✗ Invalid JSON</p>
                      <p className="text-sm font-mono">{error}</p>
                    </div>
                  )}
                </AlertDescription>
              </div>
            </Alert>
          )}
        </CardContent>
      </Card>
    </ToolLayout>
  );
};

export default JsonValidator;
