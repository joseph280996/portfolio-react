import { describe, expect, it } from "vitest";
import {
  heroSchema,
  aboutSchema,
  projectSchema,
  postSchema,
  serviceSchema,
} from "./content-schema";

describe("content schemas", () => {
  it("accepts a valid hero", () => {
    const result = heroSchema.safeParse({
      title: "Hi",
      subtitle: "Engineer",
    });
    expect(result.success).toBe(true);
  });

  it("rejects a hero missing required fields", () => {
    const result = heroSchema.safeParse({ title: "Hi" });
    expect(result.success).toBe(false);
  });

  it("defaults service icon to code", () => {
    const result = serviceSchema.parse({ title: "T", body: "B" });
    expect(result.icon).toBe("code");
  });

  it("rejects an unknown service icon", () => {
    const result = serviceSchema.safeParse({
      icon: "rocket",
      title: "T",
      body: "B",
    });
    expect(result.success).toBe(false);
  });

  it("applies array/boolean defaults on projects", () => {
    const result = projectSchema.parse({ title: "P", summary: "S" });
    expect(result.tags).toEqual([]);
    expect(result.links).toEqual([]);
    expect(result.draft).toBe(false);
    expect(result.featured).toBe(false);
    expect(result.order).toBe(0);
  });

  it("rejects a project link with a non-URL", () => {
    const result = projectSchema.safeParse({
      title: "P",
      summary: "S",
      links: [{ label: "x", url: "not-a-url" }],
    });
    expect(result.success).toBe(false);
  });

  it("requires a post date and description", () => {
    expect(postSchema.safeParse({ title: "T" }).success).toBe(false);
    expect(
      postSchema.safeParse({ title: "T", description: "D", date: "2020-01-01" })
        .success,
    ).toBe(true);
  });

  it("defaults about services to empty array", () => {
    const result = aboutSchema.parse({ title: "About" });
    expect(result.services).toEqual([]);
  });
});
