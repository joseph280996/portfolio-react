import { Mail, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/lib/site-config";
import type { ContactContent } from "@/lib/content-schema";

interface ContactProps {
  content: ContactContent;
  eyebrow: string;
  emailLabel: string;
  phoneLabel: string;
}

export function Contact({
  content,
  eyebrow,
  emailLabel,
  phoneLabel,
}: ContactProps) {
  const { title, subtitle } = content;

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-20 py-[var(--space-section)]"
    >
      <Container className="flex flex-col items-center gap-8 text-center">
        <SectionHeading
          id="contact-heading"
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
          align="center"
        />

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
          <a
            href={`mailto:${siteConfig.email}`}
            className="group inline-flex items-center gap-2 text-ink transition-colors hover:text-accent"
          >
            <Mail className="h-5 w-5 text-accent" aria-hidden />
            <span className="sr-only">{emailLabel}: </span>
            {siteConfig.email}
          </a>
          <a
            href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
            className="group inline-flex items-center gap-2 text-ink transition-colors hover:text-accent"
          >
            <Phone className="h-5 w-5 text-accent" aria-hidden />
            <span className="sr-only">{phoneLabel}: </span>
            {siteConfig.phone}
          </a>
        </div>
      </Container>
    </section>
  );
}
