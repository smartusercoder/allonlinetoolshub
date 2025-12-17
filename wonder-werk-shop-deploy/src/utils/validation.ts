import { toast } from "@/hooks/use-toast";

// File size constants (in bytes)
export const FILE_SIZE_LIMITS = {
  IMAGE: 10 * 1024 * 1024, // 10MB
  PDF: 50 * 1024 * 1024, // 50MB
  VIDEO: 100 * 1024 * 1024, // 100MB
  AUDIO: 20 * 1024 * 1024, // 20MB
  DOCUMENT: 10 * 1024 * 1024, // 10MB
  GENERAL: 20 * 1024 * 1024, // 20MB
} as const;

// File type constants
export const ALLOWED_FILE_TYPES = {
  IMAGES: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'],
  PDF: ['application/pdf'],
  VIDEO: ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'],
  AUDIO: ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg'],
  DOCUMENTS: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  SPREADSHEETS: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'],
} as const;

// Text validation constants
export const TEXT_LIMITS = {
  MIN_LENGTH: 1,
  MAX_LENGTH: 1000000, // 1M characters
  MAX_LINES: 100000,
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 128,
} as const;

// Error messages
export const ERROR_MESSAGES = {
  FILE_TOO_LARGE: (maxSize: number) => `File is too large. Maximum size is ${formatBytes(maxSize)}.`,
  FILE_TYPE_NOT_ALLOWED: (allowedTypes: string[]) => `Invalid file type. Allowed types: ${allowedTypes.join(', ')}.`,
  FILE_REQUIRED: "Please select a file.",
  TEXT_REQUIRED: "Please enter some text.",
  TEXT_TOO_SHORT: (min: number) => `Text must be at least ${min} characters long.`,
  TEXT_TOO_LONG: (max: number) => `Text must not exceed ${max} characters.`,
  INVALID_EMAIL: "Please enter a valid email address.",
  INVALID_URL: "Please enter a valid URL.",
  INVALID_NUMBER: "Please enter a valid number.",
  INVALID_JSON: "Invalid JSON format.",
  INVALID_HEX_COLOR: "Invalid hex color format. Use #RRGGBB or #RGB.",
  INVALID_BASE64: "Invalid Base64 format.",
  EMPTY_INPUT: "Input cannot be empty.",
  PROCESSING_ERROR: "An error occurred while processing your request.",
} as const;

// Format bytes to human-readable size
export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Validation result type
export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

// File validation functions
export function validateFileSize(file: File, maxSize: number): ValidationResult {
  if (file.size > maxSize) {
    return {
      isValid: false,
      error: ERROR_MESSAGES.FILE_TOO_LARGE(maxSize),
    };
  }
  return { isValid: true };
}

export function validateFileType(file: File, allowedTypes: string[]): ValidationResult {
  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: ERROR_MESSAGES.FILE_TYPE_NOT_ALLOWED(allowedTypes),
    };
  }
  return { isValid: true };
}

export function validateFile(
  file: File | null | undefined,
  options: {
    required?: boolean;
    maxSize?: number;
    allowedTypes?: string[];
  } = {}
): ValidationResult {
  const { required = true, maxSize, allowedTypes } = options;

  if (!file) {
    if (required) {
      return { isValid: false, error: ERROR_MESSAGES.FILE_REQUIRED };
    }
    return { isValid: true };
  }

  if (maxSize) {
    const sizeResult = validateFileSize(file, maxSize);
    if (!sizeResult.isValid) return sizeResult;
  }

  if (allowedTypes) {
    const typeResult = validateFileType(file, allowedTypes);
    if (!typeResult.isValid) return typeResult;
  }

  return { isValid: true };
}

// Text validation functions
export function validateText(
  text: string | null | undefined,
  options: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    trim?: boolean;
  } = {}
): ValidationResult {
  const { required = true, minLength, maxLength, trim = true } = options;

  const processedText = trim && text ? text.trim() : text;

  if (!processedText || processedText.length === 0) {
    if (required) {
      return { isValid: false, error: ERROR_MESSAGES.TEXT_REQUIRED };
    }
    return { isValid: true };
  }

  if (minLength && processedText.length < minLength) {
    return { isValid: false, error: ERROR_MESSAGES.TEXT_TOO_SHORT(minLength) };
  }

  if (maxLength && processedText.length > maxLength) {
    return { isValid: false, error: ERROR_MESSAGES.TEXT_TOO_LONG(maxLength) };
  }

  return { isValid: true };
}

export function validateEmail(email: string): ValidationResult {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: ERROR_MESSAGES.INVALID_EMAIL };
  }
  return { isValid: true };
}

export function validateUrl(url: string): ValidationResult {
  try {
    new URL(url);
    return { isValid: true };
  } catch {
    return { isValid: false, error: ERROR_MESSAGES.INVALID_URL };
  }
}

export function validateNumber(
  value: string | number,
  options: {
    min?: number;
    max?: number;
    integer?: boolean;
  } = {}
): ValidationResult {
  const { min, max, integer = false } = options;
  const num = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(num)) {
    return { isValid: false, error: ERROR_MESSAGES.INVALID_NUMBER };
  }

  if (integer && !Number.isInteger(num)) {
    return { isValid: false, error: "Value must be an integer." };
  }

  if (min !== undefined && num < min) {
    return { isValid: false, error: `Value must be at least ${min}.` };
  }

  if (max !== undefined && num > max) {
    return { isValid: false, error: `Value must not exceed ${max}.` };
  }

  return { isValid: true };
}

export function validateJSON(jsonString: string): ValidationResult {
  try {
    JSON.parse(jsonString);
    return { isValid: true };
  } catch {
    return { isValid: false, error: ERROR_MESSAGES.INVALID_JSON };
  }
}

export function validateHexColor(color: string): ValidationResult {
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  if (!hexRegex.test(color)) {
    return { isValid: false, error: ERROR_MESSAGES.INVALID_HEX_COLOR };
  }
  return { isValid: true };
}

export function validateBase64(base64: string): ValidationResult {
  try {
    const base64Regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
    if (!base64Regex.test(base64.trim())) {
      return { isValid: false, error: ERROR_MESSAGES.INVALID_BASE64 };
    }
    return { isValid: true };
  } catch {
    return { isValid: false, error: ERROR_MESSAGES.INVALID_BASE64 };
  }
}

// Helper function to show validation errors as toasts
export function showValidationError(error: string) {
  toast({
    title: "Validation Error",
    description: error,
    variant: "destructive",
  });
}

// Helper function to validate and show errors
export function validateAndShowError(result: ValidationResult): boolean {
  if (!result.isValid && result.error) {
    showValidationError(result.error);
    return false;
  }
  return true;
}

// Image-specific validation
export function validateImageFile(file: File): ValidationResult {
  return validateFile(file, {
    maxSize: FILE_SIZE_LIMITS.IMAGE,
    allowedTypes: [...ALLOWED_FILE_TYPES.IMAGES],
  });
}

// PDF-specific validation
export function validatePdfFile(file: File): ValidationResult {
  return validateFile(file, {
    maxSize: FILE_SIZE_LIMITS.PDF,
    allowedTypes: [...ALLOWED_FILE_TYPES.PDF],
  });
}

// Video-specific validation
export function validateVideoFile(file: File): ValidationResult {
  return validateFile(file, {
    maxSize: FILE_SIZE_LIMITS.VIDEO,
    allowedTypes: [...ALLOWED_FILE_TYPES.VIDEO],
  });
}

// Audio-specific validation
export function validateAudioFile(file: File): ValidationResult {
  return validateFile(file, {
    maxSize: FILE_SIZE_LIMITS.AUDIO,
    allowedTypes: [...ALLOWED_FILE_TYPES.AUDIO],
  });
}

// Multiple files validation
export function validateMultipleFiles(
  files: File[],
  options: {
    maxFiles?: number;
    maxTotalSize?: number;
    allowedTypes?: string[];
    maxSizePerFile?: number;
  } = {}
): ValidationResult {
  const { maxFiles, maxTotalSize, allowedTypes, maxSizePerFile } = options;

  if (maxFiles && files.length > maxFiles) {
    return { isValid: false, error: `Maximum ${maxFiles} files allowed.` };
  }

  if (maxTotalSize) {
    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    if (totalSize > maxTotalSize) {
      return {
        isValid: false,
        error: `Total file size exceeds ${formatBytes(maxTotalSize)}.`,
      };
    }
  }

  for (const file of files) {
    const fileResult = validateFile(file, {
      maxSize: maxSizePerFile,
      allowedTypes,
    });
    if (!fileResult.isValid) {
      return fileResult;
    }
  }

  return { isValid: true };
}

// Password validation
export function validatePassword(password: string): ValidationResult {
  if (password.length < TEXT_LIMITS.MIN_PASSWORD_LENGTH) {
    return {
      isValid: false,
      error: `Password must be at least ${TEXT_LIMITS.MIN_PASSWORD_LENGTH} characters long.`,
    };
  }

  if (password.length > TEXT_LIMITS.MAX_PASSWORD_LENGTH) {
    return {
      isValid: false,
      error: `Password must not exceed ${TEXT_LIMITS.MAX_PASSWORD_LENGTH} characters.`,
    };
  }

  return { isValid: true };
}

// Sanitize filename
export function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-z0-9._-]/gi, '_')
    .replace(/_{2,}/g, '_')
    .toLowerCase();
}

// Check if string is empty or whitespace
export function isEmpty(value: string | null | undefined): boolean {
  return !value || value.trim().length === 0;
}
