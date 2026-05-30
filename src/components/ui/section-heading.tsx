import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  id?: string;
  /** Heading level. Use 1 for standalone pages, 2 for in-page sections. */
  level?: 1 | 2;
}

/**
 * Editorial section header: a small uppercase eyebrow, a large serif title,
 * and an optional muted subtitle. Hierarchy comes from scale contrast.
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
  id,
  level = 2,
}: SectionHeadingProps) {
  const Heading = level === 1 ? "h1" : "h2";
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <span className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent">
          {eyebrow}
        </span>
      )}
      <Heading
        id={id}
        className="text-[length:var(--text-2xl)] text-ink"
        style={{ fontSize: "var(--text-2xl)" }}
      >
        {title}
      </Heading>
      {subtitle && (
        <p className="max-w-[var(--content-max)] text-[length:var(--text-lg)] text-muted">
          {subtitle}
        </p>
      )}
    </div>
  );
}
