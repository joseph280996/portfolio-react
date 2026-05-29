/**
 * Canonical site origin. Vercel injects `VERCEL_PROJECT_PRODUCTION_URL` at
 * build/runtime; we prefer an explicit `NEXT_PUBLIC_SITE_URL` when set so
 * preview/custom domains can override it. Falls back to localhost in dev.
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3000";
}
