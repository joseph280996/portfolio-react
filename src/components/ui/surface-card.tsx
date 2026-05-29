import { cn } from "@/lib/cn";

interface SurfaceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
}

/**
 * Layered surface used for cards. When `interactive`, it lifts on hover
 * using transform/box-shadow only (compositor-friendly).
 */
export function SurfaceCard({
  interactive = false,
  className,
  ...props
}: SurfaceCardProps) {
  return (
    <div
      className={cn(
        "rounded-[calc(var(--radius)*1.5)] border border-border bg-surface shadow-[var(--shadow-sm)]",
        interactive &&
          "transition-[transform,box-shadow] duration-[var(--duration-normal)] ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:shadow-[var(--shadow-lg)]",
        className,
      )}
      {...props}
    />
  );
}
