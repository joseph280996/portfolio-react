import { Code2, GraduationCap, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SurfaceCard } from "@/components/ui/surface-card";
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
};

export function About({ content, body, eyebrow }: AboutProps) {
  const { title, subtitle, services } = content;

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
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
      </Container>
    </section>
  );
}
