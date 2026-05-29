import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getProjectSlugs, getPostSlugs } from "@/lib/content";
import { getSiteUrl } from "@/lib/site-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const [projectSlugs, postSlugs] = await Promise.all([
    getProjectSlugs(),
    getPostSlugs(),
  ]);

  const paths = [
    "",
    "/projects",
    "/blog",
    ...projectSlugs.map((slug) => `/projects/${slug}`),
    ...postSlugs.map((slug) => `/blog/${slug}`),
  ];

  return routing.locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${base}/${locale}${path}`,
      lastModified: new Date(),
    })),
  );
}
