import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CsvValidator = () => {
  const [csv, setCsv] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const { toast } = useToast();

  const validateCsv = () => {
    const lines = csv.trim().split('\n');
    const newErrors: string[] = [];

    if (lines.length === 0) {
      newErrors.push("CSV is empty");
      setIsValid(false);
      setErrors(newErrors);
      return;
    }

    const headerCount = lines[0].split(',').length;

    lines.forEach((line, index) => {
      const cols = line.split(',');
      if (cols.length !== headerCount) {
        newErrors.push(`Line ${index + 1}: Expected ${headerCount} columns, found ${cols.length}`);
      }
    });

    setIsValid(newErrors.length === 0);
    setErrors(newErrors);
    
    toast({
      title: newErrors.length === 0 ? "Valid CSV" : "Invalid CSV",
      description: newErrors.length === 0 
        ? "CSV structure is valid" 
        : `Found ${newErrors.length} errors`,
      variant: newErrors.length === 0 ? "default" : "destructive",
    });
  };

  return (
    <ToolLayout
      title="CSV Validator"
      description="Validate CSV file structure"
    >
      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="csv">CSV Content</Label>
          <Textarea
            id="csv"
            value={csv}
            onChange={(e) => setCsv(e.target.value)}
            placeholder="name,email,age&#10;John,john@example.com,30&#10;Jane,jane@example.com,25"
            rows={10}
          />
        </div>

        <Button onClick={validateCsv}>
          Validate CSV
        </Button>

        {isValid !== null && (
          <div className="space-y-3 pt-4 border-t">
            <div className="flex items-center gap-2">
              {isValid ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              <h3 className="font-semibold text-lg">
                {isValid ? "Valid CSV" : "Invalid CSV"}
              </h3>
            </div>

            {errors.length > 0 && (
              <div className="space-y-2">
                <Label>Errors:</Label>
                <div className="space-y-1">
                  {errors.map((error, index) => (
                    <div key={index} className="text-sm p-2 bg-destructive/10 rounded">
                      {error}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Card>
    </ToolLayout>
  );
};

export default CsvValidator;
