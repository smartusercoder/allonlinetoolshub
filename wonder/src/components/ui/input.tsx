import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    const isFile = type === "file";
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          // Make native file input button look like our primary button
          isFile &&
            "cursor-pointer file:bg-primary file:text-primary-foreground file:hover:bg-primary/90 file:px-4 file:py-2 file:rounded-md file:border-0 file:shadow-sm file:transition-colors file:duration-200 file:mr-4",
          // Ensure consistent file text styles
          "file:text-sm file:font-medium",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
