import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface ValidationErrorProps {
  message: string;
  className?: string;
}

export const ValidationError = ({ message, className }: ValidationErrorProps) => {
  return (
    <Alert variant="destructive" className={className}>
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

interface FieldErrorProps {
  error?: string;
  show?: boolean;
}

export const FieldError = ({ error, show = true }: FieldErrorProps) => {
  if (!error || !show) return null;
  
  return (
    <p className="text-sm text-destructive mt-1 flex items-center gap-1">
      <AlertCircle className="h-3 w-3" />
      {error}
    </p>
  );
};
