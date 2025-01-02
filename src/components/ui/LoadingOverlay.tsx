import { LoadingSpinner } from "./LoadingSpinner";
import { cn } from "~/utils/cn";

interface LoadingOverlayProps {
  isLoading: boolean;
  text?: string;
  className?: string;
  spinnerSize?: "sm" | "md" | "lg";
  spinnerColor?: string;
  blur?: boolean;
}

export function LoadingOverlay({
  isLoading,
  text,
  className,
  spinnerSize = "lg",
  spinnerColor = "text-blue-500",
  blur = true,
}: LoadingOverlayProps) {
  if (!isLoading) return null;

  return (
    <div
      className={cn(
        "absolute inset-0 flex items-center justify-center z-50",
        blur ? "backdrop-blur-sm" : "bg-white/80",
        className
      )}
    >
      <div className="flex flex-col items-center gap-3">
        <LoadingSpinner size={spinnerSize} color={spinnerColor} />
        {text && (
          <p className="text-sm text-gray-600 animate-pulse">
            {text}
          </p>
        )}
      </div>
    </div>
  );
} 