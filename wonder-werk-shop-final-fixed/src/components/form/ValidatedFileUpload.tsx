import { useState, useRef, DragEvent } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FieldError } from "@/components/ValidationError";
import { Upload, X, File as FileIcon, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatBytes } from "@/utils/validation";

export interface ValidatedFileUploadProps {
  label?: string;
  error?: string;
  helperText?: string;
  onFileSelect: (file: File | null) => void;
  accept?: string;
  maxSize?: number;
  showError?: boolean;
  containerClassName?: string;
  required?: boolean;
  multiple?: boolean;
  onMultipleFilesSelect?: (files: File[]) => void;
  value?: File | File[] | null;
  showPreview?: boolean;
  disabled?: boolean;
}

export const ValidatedFileUpload = ({
  label,
  error,
  helperText,
  onFileSelect,
  accept,
  maxSize,
  showError = true,
  containerClassName,
  required,
  multiple = false,
  onMultipleFilesSelect,
  value,
  showPreview = true,
  disabled = false,
}: ValidatedFileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const hasError = !!error && showError;
  const files = multiple && Array.isArray(value) ? value : value ? [value as File] : [];
  const singleFile = !multiple && value && !Array.isArray(value) ? value as File : null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    if (multiple && onMultipleFilesSelect) {
      onMultipleFilesSelect(Array.from(selectedFiles));
    } else {
      const file = selectedFiles[0];
      onFileSelect(file);
      
      // Generate preview for images
      if (showPreview && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = e.dataTransfer.files;
    if (!droppedFiles || droppedFiles.length === 0) return;

    if (multiple && onMultipleFilesSelect) {
      onMultipleFilesSelect(Array.from(droppedFiles));
    } else {
      const file = droppedFiles[0];
      onFileSelect(file);

      if (showPreview && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleRemove = () => {
    onFileSelect(null);
    setPreview(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleRemoveMultiple = (index: number) => {
    if (!onMultipleFilesSelect || !Array.isArray(value)) return;
    const newFiles = files.filter((_, i) => i !== index);
    onMultipleFilesSelect(newFiles);
  };

  const isImage = singleFile?.type.startsWith('image/');

  return (
    <div className={cn("space-y-2", containerClassName)}>
      {label && (
        <Label className="flex items-center gap-1">
          {label}
          {required && <span className="text-destructive">*</span>}
        </Label>
      )}

      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center transition-colors",
          isDragging && "border-primary bg-primary/5",
          hasError && "border-destructive",
          !hasError && !isDragging && "border-border hover:border-primary/50",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          onChange={handleFileChange}
          accept={accept}
          multiple={multiple}
          className="hidden"
          id="file-upload"
          disabled={disabled}
        />

        {!singleFile && files.length === 0 ? (
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="rounded-full bg-primary/10 p-3">
                <Upload className="h-6 w-6 text-primary" />
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium">
                Drag and drop your file{multiple ? 's' : ''} here, or
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => inputRef.current?.click()}
                disabled={disabled}
              >
                Browse Files
              </Button>
            </div>

            {(accept || maxSize) && (
              <div className="text-xs text-muted-foreground space-y-1">
                {accept && <p>Accepted formats: {accept}</p>}
                {maxSize && <p>Maximum size: {formatBytes(maxSize)}</p>}
              </div>
            )}
          </div>
        ) : multiple && files.length > 0 ? (
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-muted rounded-lg p-3 text-left"
                >
                  <FileIcon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatBytes(file.size)}
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveMultiple(index)}
                    disabled={disabled}
                    className="h-6 w-6 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => inputRef.current?.click()}
              disabled={disabled}
            >
              Add More Files
            </Button>
          </div>
        ) : singleFile ? (
          <div className="space-y-3">
            {showPreview && preview && isImage ? (
              <div className="relative inline-block">
                <img
                  src={preview}
                  alt="Preview"
                  className="max-h-48 rounded-lg border"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={handleRemove}
                  disabled={disabled}
                  className="absolute top-2 right-2"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3 bg-muted rounded-lg p-4">
                {isImage ? (
                  <ImageIcon className="h-8 w-8 text-muted-foreground flex-shrink-0" />
                ) : (
                  <FileIcon className="h-8 w-8 text-muted-foreground flex-shrink-0" />
                )}
                <div className="flex-1 text-left min-w-0">
                  <p className="font-medium truncate">{singleFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatBytes(singleFile.size)}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleRemove}
                  disabled={disabled}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        ) : null}
      </div>

      {hasError && <FieldError error={error} />}
      
      {!hasError && helperText && (
        <p className="text-sm text-muted-foreground">{helperText}</p>
      )}
    </div>
  );
};
