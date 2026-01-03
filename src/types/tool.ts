export interface ToolProps {
  title: string;
  description?: string;
  category?: string;
}

export interface GeneratorOptions {
  length?: number;
  count?: number;
  prefix?: string;
  suffix?: string;
  separator?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors?: string[];
  warnings?: string[];
}

export type ProcessingStatus = 'idle' | 'processing' | 'success' | 'error';

export interface ToolState {
  input: string;
  output: string;
  status: ProcessingStatus;
  error?: string;
}
