import { forwardRef, TextareaHTMLAttributes } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FieldError } from "@/components/ValidationError";
import { ValidationResult } from "@/utils/validation";
import { cn } from "@/lib/utils";

export interface ValidatedTextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  label?: string;
  error?: string;
  helperText?: string;
  validate?: (value: string) => ValidationResult;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  showError?: boolean;
  containerClassName?: string;
  required?: boolean;
  showCharCount?: boolean;
  maxLength?: number;
}

export const ValidatedTextarea = forwardRef<HTMLTextAreaElement, ValidatedTextareaProps>(
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
      value,
      showCharCount = false,
      maxLength,
      ...props
    },
    ref
  ) => {
    const inputId = id || `textarea-${label?.replace(/\s+/g, '-').toLowerCase()}`;
    const hasError = !!error && showError;
    const charCount = typeof value === 'string' ? value.length : 0;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      onChange?.(newValue);
    };

    return (
      <div className={cn("space-y-2", containerClassName)}>
        {label && (
          <div className="flex items-center justify-between">
            <Label htmlFor={inputId} className="flex items-center gap-1">
              {label}
              {required && <span className="text-destructive">*</span>}
            </Label>
            {showCharCount && (
              <span className="text-xs text-muted-foreground">
                {charCount}{maxLength ? ` / ${maxLength}` : ''}
              </span>
            )}
          </div>
        )}
        
        <Textarea
          ref={ref}
          id={inputId}
          value={value}
          onChange={handleChange}
          onBlur={onBlur}
          maxLength={maxLength}
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

ValidatedTextarea.displayName = "ValidatedTextarea";
