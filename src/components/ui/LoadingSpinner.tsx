import { Loader2 } from "lucide-react";
import { cn } from "~/utils/cn";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  color?: string;
}

const sizeMap = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
};

export function LoadingSpinner({ 
  size = "md", 
  className,
  color = "text-blue-500"
}: LoadingSpinnerProps) {
  return (
    <Loader2 
      className={cn(
        "animate-spin",
        sizeMap[size],
        color,
        className
      )} 
    />
  );
} 