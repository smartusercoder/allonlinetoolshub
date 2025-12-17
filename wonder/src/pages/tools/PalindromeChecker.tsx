import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle } from "lucide-react";

const PalindromeChecker = () => {
  const [text, setText] = useState("");

  const isPalindrome = (str: string): boolean => {
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleaned === cleaned.split('').reverse().join('');
  };

  const result = text.trim() ? isPalindrome(text) : null;

  return (
    <ToolLayout
      title="Palindrome Checker"
      description="Check if text is a palindrome"
    >
      <Card>
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-2">
            <Label>Text to Check</Label>
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter word or phrase"
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
                    <span className="font-semibold">✓ This is a palindrome!</span>
                  ) : (
                    <span className="font-semibold">✗ This is not a palindrome</span>
                  )}
                </AlertDescription>
              </div>
            </Alert>
          )}

          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">What is a palindrome?</p>
            <p className="text-sm">
              A palindrome is a word, phrase, number, or sequence of characters that reads the same backward as forward (ignoring spaces, punctuation, and capitalization).
            </p>
            <p className="text-sm mt-2 font-mono text-xs">
              Examples: "racecar", "A man a plan a canal Panama", "12321"
            </p>
          </div>
        </CardContent>
      </Card>
    </ToolLayout>
  );
};

export default PalindromeChecker;
