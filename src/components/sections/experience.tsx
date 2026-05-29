import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { ExperienceContent } from "@/lib/content-schema";

interface ExperienceProps {
  content: ExperienceContent;
  eyebrow: string;
}

/**
 * A vertical timeline. The accent rail + dots give the section rhythm and a
 * sense of progression without a heavy card grid.
 */
export function Experience({ content, eyebrow }: ExperienceProps) {
  const { title, subtitle, timeline } = content;

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="scroll-mt-20 bg-surface-2/40 py-[var(--space-section)]"
    >
      <Container className="flex flex-col gap-10">
        <SectionHeading
          id="experience-heading"
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
        />

        <ol className="relative flex flex-col gap-8 border-l border-border pl-6 sm:pl-8">
          {timeline.map((entry) => (
            <li key={`${entry.org}-${entry.period}`} className="relative">
              <span
                aria-hidden
                className="absolute -left-[1.6rem] top-1.5 h-3 w-3 rounded-full border-2 border-bg bg-accent sm:-left-[2.1rem]"
              />
              <div className="flex flex-wrap items-center gap-3">
                {entry.logo && (
                  <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-[var(--radius)] border border-border bg-surface">
                    <Image
                      src={entry.logo}
                      alt={entry.org}
                      fill
                      sizes="36px"
                      className="object-cover"
                    />
                  </span>
                )}
                <div className="flex flex-col">
                  <h3 className="text-ink" style={{ fontSize: "var(--text-lg)" }}>
                    {entry.role}
                  </h3>
                  <p className="text-sm text-muted">{entry.org}</p>
                </div>
              </div>
              <p className="mt-1 text-xs font-medium uppercase tracking-[0.15em] text-accent">
                {entry.period}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
