import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { buttonClasses } from "@/components/ui/button";
import type { HeroContent } from "@/lib/content-schema";

interface HeroProps {
  content: HeroContent;
}

/**
 * Editorial hero: oversized serif headline on the left, a tall portrait image
 * bleeding off the grid on the right. Asymmetry + scale contrast carry the
 * hierarchy instead of a centered template layout.
 */
export function Hero({ content }: HeroProps) {
  const { title, subtitle, ctaLabel, ctaHref, image } = content;

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pt-[clamp(3rem,2rem+6vw,6rem)] pb-[var(--space-section)]"
    >
      <Container className="grid items-center gap-10 md:grid-cols-[1.15fr_0.85fr] md:gap-14">
        <div className="flex flex-col gap-6">
          <h1
            id="hero-heading"
            className="text-balance text-ink"
            style={{ fontSize: "var(--text-hero)" }}
          >
            {title}
          </h1>
          <p className="max-w-[34rem] text-pretty text-muted" style={{ fontSize: "var(--text-lg)" }}>
            {subtitle}
          </p>
          {ctaLabel && ctaHref && (
            <div className="mt-2">
              <Link href={ctaHref} className={buttonClasses("primary", "md")}>
                {ctaLabel}
              </Link>
            </div>
          )}
        </div>

        {image && (
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm md:mx-0">
            <div
              aria-hidden
              className="absolute -inset-3 -z-10 rounded-[calc(var(--radius)*2)] bg-accent/10"
            />
            <Image
              src={image}
              alt=""
              fill
              priority
              sizes="(max-width: 768px) 90vw, 40vw"
              className="rounded-[calc(var(--radius)*2)] object-cover shadow-[var(--shadow-lg)]"
            />
          </div>
        )}
      </Container>
    </section>
  );
}
