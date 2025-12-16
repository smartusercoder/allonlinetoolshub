import { useState } from "react";
import { validateFile, ValidationResult } from "@/utils/validation";
import { toast } from "@/hooks/use-toast";

interface UseFileUploadOptions {
  maxSize?: number;
  allowedTypes?: string[];
  required?: boolean;
  onValidate?: (file: File) => ValidationResult;
}

export function useFileUpload(options: UseFileUploadOptions = {}) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [isValidating, setIsValidating] = useState(false);

  const handleFileSelect = async (selectedFile: File | null) => {
    setError("");
    
    if (!selectedFile) {
      setFile(null);
      return;
    }

    setIsValidating(true);

    // Default validation
    const defaultResult = validateFile(selectedFile, {
      maxSize: options.maxSize,
      allowedTypes: options.allowedTypes,
      required: options.required,
    });

    if (!defaultResult.isValid) {
      setError(defaultResult.error || "Invalid file");
      setFile(null);
      toast({
        title: "File Validation Error",
        description: defaultResult.error,
        variant: "destructive",
      });
      setIsValidating(false);
      return;
    }

    // Custom validation
    if (options.onValidate) {
      const customResult = options.onValidate(selectedFile);
      if (!customResult.isValid) {
        setError(customResult.error || "Invalid file");
        setFile(null);
        toast({
          title: "File Validation Error",
          description: customResult.error,
          variant: "destructive",
        });
        setIsValidating(false);
        return;
      }
    }

    setFile(selectedFile);
    setIsValidating(false);
  };

  const reset = () => {
    setFile(null);
    setError("");
    setIsValidating(false);
  };

  return {
    file,
    error,
    isValidating,
    handleFileSelect,
    reset,
    isValid: file !== null && !error,
  };
}
