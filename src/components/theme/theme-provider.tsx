"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";

export type Theme = "light" | "dark" | "system";
type Resolved = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: Resolved;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "theme";

function systemPrefersDark(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
}

// ── External theme store (localStorage + OS preference) ───────────────────────
// We read this mutable browser state with useSyncExternalStore so React stays in
// sync without calling setState inside an effect.

const listeners = new Set<() => void>();

function emit(): void {
  for (const listener of listeners) listener();
}

function subscribe(callback: () => void): () => void {
  listeners.add(callback);
  const mql = window.matchMedia("(prefers-color-scheme: dark)");
  mql.addEventListener("change", callback);
  window.addEventListener("storage", callback); // sync across tabs
  return () => {
    listeners.delete(callback);
    mql.removeEventListener("change", callback);
    window.removeEventListener("storage", callback);
  };
}

function getTheme(): Theme {
  if (typeof localStorage === "undefined") return "system";
  return (localStorage.getItem(STORAGE_KEY) as Theme | null) ?? "system";
}

function getResolvedTheme(): Resolved {
  const theme = getTheme();
  const dark = theme === "dark" || (theme === "system" && systemPrefersDark());
  return dark ? "dark" : "light";
}

// Stable server/hydration snapshots (the inline ThemeScript handles the real
// first paint before React hydrates).
const getThemeServerSnapshot = (): Theme => "system";
const getResolvedServerSnapshot = (): Resolved => "light";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getTheme, getThemeServerSnapshot);
  const resolvedTheme = useSyncExternalStore(
    subscribe,
    getResolvedTheme,
    getResolvedServerSnapshot,
  );

  // Sync the resolved theme to the <html> class (external-system sync).
  useEffect(() => {
    document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
  }, [resolvedTheme]);

  const setTheme = useCallback((next: Theme) => {
    localStorage.setItem(STORAGE_KEY, next);
    emit();
  }, []);

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}
