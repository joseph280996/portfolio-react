import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/projects/project-card";
import { buttonClasses } from "@/components/ui/button";
import type { Doc } from "@/lib/content";
import type { ProjectFrontmatter } from "@/lib/content-schema";

interface ProjectsPreviewProps {
  projects: Doc<ProjectFrontmatter>[];
  eyebrow: string;
  title: string;
  subtitle: string;
  allLabel: string;
}

export function ProjectsPreview({
  projects,
  eyebrow,
  title,
  subtitle,
  allLabel,
}: ProjectsPreviewProps) {
  if (projects.length === 0) return null;

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="scroll-mt-20 py-[var(--space-section)]"
    >
      <Container className="flex flex-col gap-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            id="projects-heading"
            eyebrow={eyebrow}
            title={title}
            subtitle={subtitle}
          />
          <Link
            href="/projects"
            className={buttonClasses("outline", "sm", "shrink-0")}
          >
            {allLabel}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <li key={project.slug} className="h-full">
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
