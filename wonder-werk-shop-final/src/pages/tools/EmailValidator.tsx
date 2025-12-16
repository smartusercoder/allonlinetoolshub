import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle } from "lucide-react";
import { UsageGuide } from "@/components/UsageGuide";

const EmailValidator = () => {
  const [email, setEmail] = useState("");

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const result = email.trim() ? validateEmail(email) : null;

  return (
    <ToolLayout
      title="Email Validator"
      description="Validate email address format"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Type or paste an email address",
            "Validation happens automatically as you type",
            "Green checkmark means valid format",
            "Red X means invalid format with requirements shown"
          ]}
          tips={[
            "Checks format only, not if email exists",
            "Valid format: username@domain.extension",
            "Must have @ symbol and domain",
            "No spaces allowed",
            "Perfect for form validation"
          ]}
          example="user@example.com ✓"
        />
      </div>
      <Card>
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-2">
            <Label>Email Address</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
            />
          </div>

          {result !== null && (
            <Alert className={result ? "border-green-500 bg-green-50 dark:bg-green-950" : "border-red-500 bg-red-50 dark:bg-red-950"}>
              <div className="flex items-center gap-2">
                {result ? (
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                )}
                <AlertDescription className={result ? "text-green-900 dark:text-green-100" : "text-red-900 dark:text-red-100"}>
                  {result ? (
                    <span className="font-semibold">✓ Valid email format</span>
                  ) : (
                    <span className="font-semibold">✗ Invalid email format</span>
                  )}
                </AlertDescription>
              </div>
            </Alert>
          )}

          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Valid email format requirements:</p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Must contain @ symbol</li>
              <li>Must have text before and after @</li>
              <li>Must have domain extension (e.g., .com)</li>
              <li>No spaces allowed</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </ToolLayout>
  );
};

export default EmailValidator;
