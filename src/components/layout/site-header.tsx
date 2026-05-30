"use client";

import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { LocaleSwitcher } from "@/components/ui/locale-switcher";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/cn";

interface NavItem {
  key: "about" | "experience" | "projects" | "blog" | "contact";
  href: string;
}

// Every nav item scrolls to its section on the home page; the dedicated
// /projects and /blog index pages are reached via the "All …" buttons.
const NAV_ITEMS: NavItem[] = [
  { key: "about", href: "/#about" },
  { key: "experience", href: "/#experience" },
  { key: "projects", href: "/#projects" },
  { key: "blog", href: "/#blog" },
  { key: "contact", href: "/#contact" },
];

export function SiteHeader() {
  const t = useTranslations("Nav");
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-bg/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="inline-flex items-center"
          aria-label={t("brand")}
          onClick={() => setOpen(false)}
        >
          <Image
            src="/images/signature-trim.png"
            alt={t("brand")}
            width={1366}
            height={530}
            priority
            className="h-[1.85rem] w-auto"
          />
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-7 md:flex"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="text-sm text-muted transition-colors duration-[var(--duration-fast)] hover:text-ink"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitcher className="hidden sm:flex" />
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius)] border border-border text-ink md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t("closeMenu") : t("menu")}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <X className="h-4 w-4" aria-hidden />
            ) : (
              <Menu className="h-4 w-4" aria-hidden />
            )}
          </button>
        </div>
      </Container>

      <div
        id="mobile-nav"
        className={cn(
          "overflow-hidden border-t border-border bg-bg md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <Container as="nav" className="flex flex-col gap-1 py-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-[var(--radius)] px-2 py-2 text-base text-ink hover:bg-surface-2"
            >
              {t(item.key)}
            </Link>
          ))}
          <div className="mt-2 px-2">
            <LocaleSwitcher />
          </div>
        </Container>
      </div>
    </header>
  );
}
