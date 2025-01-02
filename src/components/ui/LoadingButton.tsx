import { ButtonHTMLAttributes } from "react";
import { Button } from "./button";
import { LoadingSpinner } from "./LoadingSpinner";
import { cn } from "~/utils/cn";

interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  spinnerSize?: "sm" | "md" | "lg";
  spinnerColor?: string;
}

export function LoadingButton({
  children,
  className,
  disabled,
  isLoading,
  loadingText,
  variant = "default",
  size = "default",
  spinnerSize = "sm",
  spinnerColor,
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      className={cn(
        "relative flex items-center justify-center gap-2",
        isLoading && "cursor-not-allowed",
        className
      )}
      disabled={disabled ?? isLoading}
      variant={variant}
      size={size}
      {...props}
    >
      {isLoading ? (
        <>
          <LoadingSpinner 
            size={spinnerSize} 
            color={spinnerColor ?? (variant === "default" ? "text-white" : "text-blue-500")}
          />
          {loadingText && <span>{loadingText}</span>}
        </>
      ) : (
        children
      )}
    </Button>
  );
} 