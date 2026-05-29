"use client";

import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/cn";

/**
 * Switches locale while preserving the current route. Uses next-intl's
 * locale-aware navigation so `/en/projects` <-> `/vi/projects` map correctly.
 */
export function LocaleSwitcher({ className }: { className?: string }) {
  const t = useTranslations("LocaleSwitcher");
  const activeLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  function onSelect(nextLocale: string) {
    if (nextLocale === activeLocale) return;
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- params shape is route-dependent; pass-through is safe.
        { pathname, params },
        { locale: nextLocale },
      );
    });
  }

  return (
    <div
      className={cn("flex items-center gap-1", className)}
      role="group"
      aria-label={t("label")}
    >
      {routing.locales.map((loc) => {
        const isActive = loc === activeLocale;
        return (
          <button
            key={loc}
            type="button"
            onClick={() => onSelect(loc)}
            disabled={isPending}
            aria-current={isActive ? "true" : undefined}
            className={cn(
              "rounded-[var(--radius)] px-2 py-1 text-sm font-medium uppercase tracking-wide transition-colors duration-[var(--duration-fast)] focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2",
              isActive
                ? "text-accent"
                : "text-muted hover:text-ink disabled:opacity-50",
            )}
          >
            {loc}
          </button>
        );
      })}
    </div>
  );
}
