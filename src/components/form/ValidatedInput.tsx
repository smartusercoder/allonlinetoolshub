import { forwardRef, InputHTMLAttributes } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldError } from "@/components/ValidationError";
import { ValidationResult } from "@/utils/validation";
import { cn } from "@/lib/utils";

export interface ValidatedInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  error?: string;
  helperText?: string;
  validate?: (value: string) => ValidationResult;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  showError?: boolean;
  containerClassName?: string;
  required?: boolean;
}

export const ValidatedInput = forwardRef<HTMLInputElement, ValidatedInputProps>(
  (
    {
      label,
      error,
      helperText,
      validate,
      onChange,
      onBlur,
      showError = true,
      containerClassName,
      className,
      required,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${label?.replace(/\s+/g, '-').toLowerCase()}`;
    const hasError = !!error && showError;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      onChange?.(value);
    };

    return (
      <div className={cn("space-y-2", containerClassName)}>
        {label && (
          <Label htmlFor={inputId} className="flex items-center gap-1">
            {label}
            {required && <span className="text-destructive">*</span>}
          </Label>
        )}
        
        <Input
          ref={ref}
          id={inputId}
          onChange={handleChange}
          onBlur={onBlur}
          className={cn(
            hasError && "border-destructive focus-visible:ring-destructive",
            className
          )}
          aria-invalid={hasError}
          aria-describedby={
            hasError ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
          }
          {...props}
        />

        {hasError && <FieldError error={error} />}
        
        {!hasError && helperText && (
          <p id={`${inputId}-helper`} className="text-sm text-muted-foreground">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

ValidatedInput.displayName = "ValidatedInput";
