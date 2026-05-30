import { Code2, GraduationCap, Wrench, Cpu, ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SurfaceCard } from "@/components/ui/surface-card";
import { SocialLinks } from "@/components/ui/social-links";
import { Mdx } from "@/components/mdx/mdx";
import type { AboutContent, ServiceIcon } from "@/lib/content-schema";

interface AboutProps {
  content: AboutContent;
  body: string;
  eyebrow: string;
}

const ICONS: Record<ServiceIcon, LucideIcon> = {
  code: Code2,
  education: GraduationCap,
  gear: Wrench,
  cpu: Cpu,
};

export function About({ content, body, eyebrow }: AboutProps) {
  const { title, subtitle, services, reading } = content;
  const t = useTranslations("About");

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-20 py-[var(--space-section)]"
    >
      <Container className="flex flex-col gap-10">
        <SectionHeading
          id="about-heading"
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
        />

        {body.trim() && (
          <Mdx source={body} className="text-[length:var(--text-lg)]" />
        )}

        {services.length > 0 && (
          <ul className="grid gap-5 sm:grid-cols-2">
            {services.map((service) => {
              const Icon = ICONS[service.icon];
              return (
                <li key={service.title}>
                  <SurfaceCard interactive className="flex h-full flex-col gap-3 p-6">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius)] bg-accent/10 text-accent">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <h3 className="text-ink" style={{ fontSize: "var(--text-lg)" }}>
                      {service.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted">
                      {service.body}
                    </p>
                  </SurfaceCard>
                </li>
              );
            })}
          </ul>
        )}

        {reading && reading.books.length > 0 && (
          <div className="flex max-w-[var(--content-max)] flex-col gap-5">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.15em] text-accent">
              {t("currentlyReading")}
            </p>
            <ul>
              {reading.books.map((book) => (
                <li
                  key={book.title}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-border py-[0.85rem] last:border-b"
                >
                  <span className="flex-auto font-display font-semibold text-ink">
                    {book.title}
                  </span>
                  <span className="shrink-0 whitespace-nowrap font-mono text-xs text-muted">
                    {book.author}
                  </span>
                </li>
              ))}
            </ul>
            {reading.fableUrl && (
              <a
                href={reading.fableUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 self-start text-sm font-medium text-accent transition-[gap] duration-[var(--duration-fast)] hover:gap-2.5"
              >
                {t("fableLabel")}
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            )}
          </div>
        )}

        <div className="flex flex-col items-start gap-3.5">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.15em] text-accent">
            {t("findMeOnline")}
          </p>
          <SocialLinks />
        </div>
      </Container>
    </section>
  );
}
