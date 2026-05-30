import { z } from "zod";

/**
 * Frontmatter schemas. Content files are untrusted external input, so we
 * validate at the loader boundary — a malformed file fails the build, not
 * the live site.
 */

export const linkSchema = z.object({
  label: z.string(),
  description: z.string().optional(),
  url: z.string().url(),
});

export const heroSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  ctaLabel: z.string().optional(),
  ctaHref: z.string().optional(),
  image: z.string().optional(),
});

export const serviceSchema = z.object({
  icon: z.enum(["code", "education", "gear", "cpu"]).default("code"),
  title: z.string(),
  body: z.string(),
});

export const bookSchema = z.object({
  title: z.string(),
  author: z.string(),
});

export const readingSchema = z.object({
  fableUrl: z.string().url().optional(),
  books: z.array(bookSchema).default([]),
});

export const aboutSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  services: z.array(serviceSchema).default([]),
  reading: readingSchema.optional(),
});

export const timelineEntrySchema = z.object({
  org: z.string(),
  role: z.string(),
  period: z.string(),
  logo: z.string().optional(),
});

export const experienceSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  timeline: z.array(timelineEntrySchema).default([]),
});

export const contactSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
});

export const projectSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  summary: z.string(),
  date: z.string().optional(),
  cover: z.string().optional(),
  coverThumb: z.string().optional(),
  tags: z.array(z.string()).default([]),
  links: z.array(linkSchema).default([]),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
  order: z.number().default(0),
});

export const postSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  tags: z.array(z.string()).default([]),
  cover: z.string().optional(),
  draft: z.boolean().default(false),
});

export type HeroContent = z.infer<typeof heroSchema>;
export type AboutContent = z.infer<typeof aboutSchema>;
export type ExperienceContent = z.infer<typeof experienceSchema>;
export type ContactContent = z.infer<typeof contactSchema>;
export type ProjectFrontmatter = z.infer<typeof projectSchema>;
export type PostFrontmatter = z.infer<typeof postSchema>;
export type ServiceIcon = z.infer<typeof serviceSchema>["icon"];
