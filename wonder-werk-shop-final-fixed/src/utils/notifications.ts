import { toast as sonnerToast } from "sonner";
import { useToast as useShadcnToast } from "@/hooks/use-toast";

/**
 * Unified toast notification system
 * Provides a consistent API for showing toast notifications
 * Uses Sonner for simple toasts and shadcn for complex toasts
 */

type ToastType = "success" | "error" | "warning" | "info";

interface ToastOptions {
  title?: string;
  description: string;
  duration?: number;
  type?: ToastType;
}

/**
 * Simple toast using Sonner (recommended for most cases)
 * @param message - The message to display
 * @param type - The type of toast
 */
export function showToast(message: string, type: ToastType = "info") {
  switch (type) {
    case "success":
      sonnerToast.success(message);
      break;
    case "error":
      sonnerToast.error(message);
      break;
    case "warning":
      sonnerToast.warning(message);
      break;
    case "info":
    default:
      sonnerToast.info(message);
      break;
  }
}

/**
 * Hook for complex toasts with title and description
 * Uses shadcn toast system
 */
export function useNotification() {
  const { toast } = useShadcnToast();

  const notify = ({ title, description, type = "info", duration = 5000 }: ToastOptions) => {
    toast({
      title,
      description,
      duration,
      variant: type === "error" ? "destructive" : "default",
    });
  };

  return { notify };
}

/**
 * Success notification
 */
export function showSuccess(message: string) {
  showToast(message, "success");
}

/**
 * Error notification
 */
export function showError(message: string) {
  showToast(message, "error");
}

/**
 * Warning notification
 */
export function showWarning(message: string) {
  showToast(message, "warning");
}

/**
 * Info notification
 */
export function showInfo(message: string) {
  showToast(message, "info");
}
