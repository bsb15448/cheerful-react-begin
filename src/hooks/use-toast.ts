
import { toast as sonnerToast } from "sonner";

type ToastType = "success" | "error" | "info" | "warning";

export interface ToastOptions {
  variant?: "default" | "destructive";
  title?: string;
  description?: string;
  type?: ToastType;
  duration?: number;
  className?: string;
  // Add other properties from sonner that we need
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center";
  onDismiss?: () => void;
  onAutoClose?: () => void;
  closeButton?: boolean;
  id?: string | number;
}

export function toast(options: ToastOptions) {
  const { title, description, variant, type, ...props } = options;

  if (type === "success") {
    return sonnerToast.success(title, {
      description,
      ...props,
    });
  }

  if (type === "error" || variant === "destructive") {
    return sonnerToast.error(title, {
      description,
      ...props,
    });
  }

  if (type === "warning") {
    return sonnerToast.warning(title, {
      description,
      ...props,
    });
  }

  if (type === "info") {
    return sonnerToast.info(title, {
      description,
      ...props,
    });
  }

  return sonnerToast(title || "", {
    description,
    ...props,
  });
}

export const useToast = () => {
  return {
    toast,
  };
};
