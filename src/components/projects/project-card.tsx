import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SurfaceCard } from "@/components/ui/surface-card";
import type { Doc } from "@/lib/content";
import type { ProjectFrontmatter } from "@/lib/content-schema";

interface ProjectCardProps {
  project: Doc<ProjectFrontmatter>;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { slug, frontmatter } = project;
  const cover = frontmatter.coverThumb ?? frontmatter.cover;

  return (
    <SurfaceCard interactive className="group flex h-full flex-col overflow-hidden">
      <Link
        href={`/projects/${slug}`}
        className="flex h-full flex-col focus-visible:outline-none"
      >
        {cover && (
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-2">
            <Image
              src={cover}
              alt=""
              fill
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
              className="object-cover transition-transform duration-[var(--duration-slow)] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
            />
          </div>
        )}
        <div className="flex flex-1 flex-col gap-3 p-6">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-ink" style={{ fontSize: "var(--text-lg)" }}>
              {frontmatter.title}
            </h3>
            <ArrowUpRight
              className="h-5 w-5 shrink-0 text-muted transition-colors group-hover:text-accent"
              aria-hidden
            />
          </div>
          <p className="flex-1 text-sm leading-relaxed text-muted">
            {frontmatter.summary}
          </p>
          {frontmatter.tags.length > 0 && (
            <ul className="mt-1 flex flex-wrap gap-2">
              {frontmatter.tags.slice(0, 4).map((tag) => (
                <li
                  key={tag}
                  className="whitespace-nowrap rounded-full border border-border px-2.5 py-0.5 font-mono text-xs text-muted"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </div>
      </Link>
    </SurfaceCard>
  );
}
