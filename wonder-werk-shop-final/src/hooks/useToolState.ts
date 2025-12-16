import { useState, useCallback } from "react";
import { toast } from "sonner";

export interface UseToolStateOptions {
  onSuccess?: (message: string) => void;
  onError?: (error: Error) => void;
  successMessage?: string;
  errorMessage?: string;
}

export function useToolState(options: UseToolStateOptions = {}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const executeWithErrorHandling = useCallback(
    async <T,>(
      fn: () => Promise<T>,
      customOptions?: {
        successMessage?: string;
        errorMessage?: string;
        loadingMessage?: string;
      }
    ): Promise<T | null> => {
      setIsProcessing(true);
      setError(null);

      const loadingToast = customOptions?.loadingMessage
        ? toast.loading(customOptions.loadingMessage)
        : null;

      try {
        const result = await fn();

        if (loadingToast) {
          toast.dismiss(loadingToast);
        }

        const successMsg = customOptions?.successMessage || options.successMessage;
        if (successMsg) {
          toast.success(successMsg);
        }

        if (options.onSuccess) {
          options.onSuccess(successMsg || "Operation completed successfully");
        }

        return result;
      } catch (err) {
        if (loadingToast) {
          toast.dismiss(loadingToast);
        }

        const error = err instanceof Error ? err : new Error("An unexpected error occurred");
        setError(error);

        const errorMsg = customOptions?.errorMessage || options.errorMessage || error.message;
        toast.error(errorMsg);

        if (options.onError) {
          options.onError(error);
        }

        console.error("Tool operation failed:", error);
        return null;
      } finally {
        setIsProcessing(false);
      }
    },
    [options]
  );

  const reset = useCallback(() => {
    setIsProcessing(false);
    setError(null);
  }, []);

  return {
    isProcessing,
    error,
    executeWithErrorHandling,
    reset,
  };
}

// File validation helpers
export const validateFileType = (
  file: File,
  acceptedTypes: string[],
  customMessage?: string
): boolean => {
  const isValid = acceptedTypes.some((type) => {
    if (type.endsWith("/*")) {
      return file.type.startsWith(type.replace("/*", ""));
    }
    return file.type === type;
  });

  if (!isValid) {
    toast.error(
      customMessage || `Invalid file type. Expected: ${acceptedTypes.join(", ")}`
    );
  }

  return isValid;
};

export const validateFileSize = (
  file: File,
  maxSizeMB: number,
  customMessage?: string
): boolean => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  const isValid = file.size <= maxSizeBytes;

  if (!isValid) {
    toast.error(
      customMessage || `File is too large. Maximum size is ${maxSizeMB}MB`
    );
  }

  return isValid;
};

export const validateFile = (
  file: File,
  options: {
    acceptedTypes?: string[];
    maxSizeMB?: number;
    typeErrorMessage?: string;
    sizeErrorMessage?: string;
  }
): boolean => {
  if (options.acceptedTypes) {
    if (!validateFileType(file, options.acceptedTypes, options.typeErrorMessage)) {
      return false;
    }
  }

  if (options.maxSizeMB) {
    if (!validateFileSize(file, options.maxSizeMB, options.sizeErrorMessage)) {
      return false;
    }
  }

  return true;
};
