import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { UsageGuide } from "@/components/UsageGuide";

export default function PasswordStrength() {
  const [password, setPassword] = useState("");

  const analyzePassword = () => {
    if (!password) return null;

    let score = 0;
    let feedback: string[] = [];

    if (password.length >= 8) score += 20;
    else feedback.push("Use at least 8 characters");

    if (password.length >= 12) score += 10;
    if (password.length >= 16) score += 10;

    if (/[a-z]/.test(password)) score += 15;
    else feedback.push("Add lowercase letters");

    if (/[A-Z]/.test(password)) score += 15;
    else feedback.push("Add uppercase letters");

    if (/[0-9]/.test(password)) score += 15;
    else feedback.push("Add numbers");

    if (/[^a-zA-Z0-9]/.test(password)) score += 15;
    else feedback.push("Add special characters");

    const strength = score >= 80 ? "Very Strong" 
      : score >= 60 ? "Strong"
      : score >= 40 ? "Medium"
      : "Weak";

    return { score, strength, feedback };
  };

  const result = analyzePassword();

  return (
    <ToolLayout
      title="Password Strength Checker"
      description="Check password strength and get suggestions"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Type or paste a password to analyze",
            "View the strength score (0-100) and rating",
            "Read suggestions to improve weak passwords",
            "Check the detailed breakdown of password components"
          ]}
          tips={[
            "Aim for 80+ score for very strong passwords",
            "Mix uppercase, lowercase, numbers, and symbols",
            "Longer passwords (16+) are significantly stronger",
            "Avoid common words and predictable patterns"
          ]}
          note="This tool analyzes passwords locally in your browser - they are never sent to any server."
        />
        <div className="space-y-6">
          <div>
            <Label>Password</Label>
            <Input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password to test..."
            />
          </div>

          {result && (
            <div className="space-y-4">
              <Card className="p-6 bg-primary/10">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-2">Strength Score</div>
                  <div className="text-5xl font-bold text-primary">{result.score}/100</div>
                  <div className="text-lg mt-2">{result.strength}</div>
                </div>
              </Card>

              {result.feedback.length > 0 && (
                <Card className="p-4">
                  <h3 className="font-semibold mb-2">Suggestions</h3>
                  <ul className="space-y-1">
                    {result.feedback.map((item, i) => (
                      <li key={i} className="text-sm">• {item}</li>
                    ))}
                  </ul>
                </Card>
              )}

              <Card className="p-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Length:</span>
                    <span className="font-semibold">{password.length} characters</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Lowercase:</span>
                    <span>{/[a-z]/.test(password) ? "✓" : "✗"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Uppercase:</span>
                    <span>{/[A-Z]/.test(password) ? "✓" : "✗"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Numbers:</span>
                    <span>{/[0-9]/.test(password) ? "✓" : "✗"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Special chars:</span>
                    <span>{/[^a-zA-Z0-9]/.test(password) ? "✓" : "✗"}</span>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}
