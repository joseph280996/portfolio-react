import { describe, expect, it } from "vitest";
import {
  getSection,
  getProjects,
  getProject,
  getPosts,
  getProjectSlugs,
  getPostSlugs,
  readingTime,
} from "./content";

describe("readingTime", () => {
  it("returns at least 1 minute for short text", () => {
    expect(readingTime("a few words here")).toBe(1);
  });

  it("scales with word count (~200 wpm)", () => {
    const body = Array.from({ length: 600 }, () => "word").join(" ");
    expect(readingTime(body)).toBe(3);
  });
});

describe("getSection", () => {
  it("loads the English hero with valid frontmatter", async () => {
    const hero = await getSection("en", "hero");
    expect(hero.locale).toBe("en");
    expect(hero.frontmatter.title).toBeTruthy();
    expect(hero.frontmatter.subtitle).toBeTruthy();
  });

  it("loads the Vietnamese about with translated services", async () => {
    const about = await getSection("vi", "about");
    expect(about.locale).toBe("vi");
    expect(about.frontmatter.services.length).toBeGreaterThan(0);
  });
});

describe("getProjects", () => {
  it("returns published projects sorted, excluding drafts", async () => {
    const projects = await getProjects("en");
    expect(projects.length).toBeGreaterThan(0);
    expect(projects.every((p) => !p.frontmatter.draft)).toBe(true);
  });

  it("falls back to English content for an untranslated locale", async () => {
    const slugs = await getProjectSlugs();
    expect(slugs.length).toBeGreaterThan(0);
    const project = await getProject("vi", slugs[0]);
    expect(project).not.toBeNull();
    // No vi project files exist yet, so the loader should serve English.
    expect(project?.locale).toBe("en");
  });

  it("returns null for an unknown slug", async () => {
    const project = await getProject("en", "does-not-exist");
    expect(project).toBeNull();
  });
});

describe("getPosts", () => {
  it("returns posts sorted by date descending", async () => {
    const posts = await getPosts("en");
    expect(posts.length).toBeGreaterThan(0);
    const dates = posts.map((p) => p.frontmatter.date);
    const sorted = [...dates].sort((a, b) => b.localeCompare(a));
    expect(dates).toEqual(sorted);
  });

  it("exposes post slugs across locales", async () => {
    const slugs = await getPostSlugs();
    expect(slugs).toContain("building-a-dactyl-manuform");
  });
});
