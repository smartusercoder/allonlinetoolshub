import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  className?: string;
}

export const LoadingSpinner = ({ 
  size = "md", 
  text,
  className 
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg"
  };

  return (
    <div className={cn("flex flex-col items-center justify-center gap-3", className)}>
      <Loader2 className={cn(sizeClasses[size], "animate-spin text-primary")} />
      {text && (
        <p className={cn(textSizeClasses[size], "text-muted-foreground animate-pulse")}>
          {text}
        </p>
      )}
    </div>
  );
};

export const LoadingCard = ({ text = "Loading..." }: { text?: string }) => {
  return (
    <div className="bg-card rounded-xl shadow-lg p-12 border">
      <LoadingSpinner size="lg" text={text} />
    </div>
  );
};

export const LoadingOverlay = ({ text = "Processing..." }: { text?: string }) => {
  return (
    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 rounded-xl">
      <LoadingSpinner size="lg" text={text} />
    </div>
  );
};
