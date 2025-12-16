import * as React from "react";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface FileButtonProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  onFileSelect?: (file: File | null) => void;
  buttonText?: string;
  buttonVariant?: "default" | "outline" | "secondary" | "ghost";
  showIcon?: boolean;
}

export const FileButton = React.forwardRef<HTMLInputElement, FileButtonProps>(
  ({ className, onFileSelect, buttonText = "Choose File", buttonVariant = "default", showIcon = true, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;
      onFileSelect?.(file);
      props.onChange?.(e);
    };

    const handleClick = () => {
      inputRef.current?.click();
    };

    return (
      <div className={cn("inline-flex", className)}>
        <input
          type="file"
          ref={inputRef}
          onChange={handleChange}
          className="hidden"
          {...props}
        />
        <Button
          type="button"
          variant={buttonVariant}
          onClick={handleClick}
          className="gap-2"
        >
          {showIcon && <Upload className="w-4 h-4" />}
          {buttonText}
        </Button>
      </div>
    );
  }
);

FileButton.displayName = "FileButton";
