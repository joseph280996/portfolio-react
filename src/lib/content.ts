import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import { routing, type Locale } from "@/i18n/routing";
import {
  aboutSchema,
  contactSchema,
  experienceSchema,
  heroSchema,
  postSchema,
  projectSchema,
  type AboutContent,
  type ContactContent,
  type ExperienceContent,
  type HeroContent,
  type PostFrontmatter,
  type ProjectFrontmatter,
} from "./content-schema";

const CONTENT_ROOT = path.join(process.cwd(), "content");

export interface Doc<T> {
  slug: string;
  locale: Locale;
  frontmatter: T;
  body: string;
}

export interface Section<T> {
  locale: Locale;
  frontmatter: T;
  body: string;
}

async function readRaw(filePath: string): Promise<string | null> {
  try {
    return await fs.readFile(filePath, "utf8");
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      (error as NodeJS.ErrnoException).code === "ENOENT"
    ) {
      return null;
    }
    throw error;
  }
}

/** Read a file for `locale`, falling back to the default locale if missing. */
async function readWithFallback(
  locale: Locale,
  relativePath: string,
): Promise<{ raw: string; locale: Locale } | null> {
  const primary = await readRaw(
    path.join(CONTENT_ROOT, locale, relativePath),
  );
  if (primary !== null) return { raw: primary, locale };

  if (locale !== routing.defaultLocale) {
    const fallback = await readRaw(
      path.join(CONTENT_ROOT, routing.defaultLocale, relativePath),
    );
    if (fallback !== null)
      return { raw: fallback, locale: routing.defaultLocale };
  }
  return null;
}

function parse<T>(
  raw: string,
  schema: z.ZodType<T>,
  context: string,
): { frontmatter: T; body: string } {
  const { data, content } = matter(raw);
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new Error(
      `Invalid frontmatter in ${context}: ${result.error.message}`,
    );
  }
  return { frontmatter: result.data, body: content };
}

// ── Sections ────────────────────────────────────────────────────────────────

const SECTION_SCHEMAS = {
  hero: heroSchema,
  about: aboutSchema,
  experience: experienceSchema,
  contact: contactSchema,
} as const;

type SectionName = keyof typeof SECTION_SCHEMAS;
type SectionType = {
  hero: HeroContent;
  about: AboutContent;
  experience: ExperienceContent;
  contact: ContactContent;
};

export async function getSection<N extends SectionName>(
  locale: Locale,
  name: N,
): Promise<Section<SectionType[N]>> {
  const rel = path.join("sections", `${name}.mdx`);
  const file = await readWithFallback(locale, rel);
  if (!file) {
    throw new Error(`Missing section content: ${rel} (locale: ${locale})`);
  }
  const { frontmatter, body } = parse(
    file.raw,
    SECTION_SCHEMAS[name] as unknown as z.ZodType<SectionType[N]>,
    rel,
  );
  return { locale: file.locale, frontmatter, body };
}

// ── Collections (projects, blog) ──────────────────────────────────────────────

async function listSlugs(type: "projects" | "blog"): Promise<string[]> {
  // Union of slugs across all locales so nothing is dropped.
  const slugs = new Set<string>();
  for (const locale of routing.locales) {
    const dir = path.join(CONTENT_ROOT, locale, type);
    try {
      const entries = await fs.readdir(dir);
      for (const entry of entries) {
        if (entry.endsWith(".mdx")) slugs.add(entry.replace(/\.mdx$/, ""));
      }
    } catch {
      // Locale directory may not exist yet; ignore.
    }
  }
  return [...slugs];
}

export async function getProject(
  locale: Locale,
  slug: string,
): Promise<Doc<ProjectFrontmatter> | null> {
  const rel = path.join("projects", `${slug}.mdx`);
  const file = await readWithFallback(locale, rel);
  if (!file) return null;
  const { frontmatter, body } = parse(file.raw, projectSchema, rel);
  return { slug, locale: file.locale, frontmatter, body };
}

export async function getProjects(
  locale: Locale,
): Promise<Doc<ProjectFrontmatter>[]> {
  const slugs = await listSlugs("projects");
  const docs = await Promise.all(slugs.map((slug) => getProject(locale, slug)));
  return docs
    .filter((d): d is Doc<ProjectFrontmatter> => d !== null && !d.frontmatter.draft)
    .sort(
      (a, b) =>
        Number(b.frontmatter.featured) - Number(a.frontmatter.featured) ||
        a.frontmatter.order - b.frontmatter.order ||
        a.frontmatter.title.localeCompare(b.frontmatter.title),
    );
}

export async function getPost(
  locale: Locale,
  slug: string,
): Promise<Doc<PostFrontmatter> | null> {
  const rel = path.join("blog", `${slug}.mdx`);
  const file = await readWithFallback(locale, rel);
  if (!file) return null;
  const { frontmatter, body } = parse(file.raw, postSchema, rel);
  return { slug, locale: file.locale, frontmatter, body };
}

export async function getPosts(
  locale: Locale,
): Promise<Doc<PostFrontmatter>[]> {
  const slugs = await listSlugs("blog");
  const docs = await Promise.all(slugs.map((slug) => getPost(locale, slug)));
  return docs
    .filter((d): d is Doc<PostFrontmatter> => d !== null && !d.frontmatter.draft)
    .sort((a, b) => b.frontmatter.date.localeCompare(a.frontmatter.date));
}

export async function getProjectSlugs(): Promise<string[]> {
  return listSlugs("projects");
}

export async function getPostSlugs(): Promise<string[]> {
  return listSlugs("blog");
}

/** Estimated reading time in minutes from a markdown/MDX body. */
export function readingTime(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
