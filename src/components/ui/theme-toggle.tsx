"use client";

import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "@/components/theme/theme-provider";
import { cn } from "@/lib/cn";

/**
 * Cycles light -> dark -> system. Shows sun/moon based on the resolved theme.
 * Renders a stable button on the server; the icon swaps after hydration.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const t = useTranslations("ThemeToggle");
  const { theme, resolvedTheme, setTheme } = useTheme();

  const next = theme === "light" ? "dark" : theme === "dark" ? "system" : "light";

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={t("label")}
      title={`${t("label")}: ${t(theme)}`}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius)] border border-border text-ink transition-colors duration-[var(--duration-fast)] hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2",
        className,
      )}
    >
      <Sun
        className={cn("h-4 w-4", resolvedTheme === "dark" && "hidden")}
        aria-hidden
      />
      <Moon
        className={cn("h-4 w-4", resolvedTheme === "light" && "hidden")}
        aria-hidden
      />
    </button>
  );
}
