import type { Metadata } from "next";
import Image from "next/image";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { getProject, getProjectSlugs } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { Mdx } from "@/components/mdx/mdx";

interface ProjectDetailProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: ProjectDetailProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = await getProject(locale as Locale, slug);
  if (!project) return {};
  return {
    title: project.frontmatter.title,
    description: project.frontmatter.summary,
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailProps) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale as Locale);

  const project = await getProject(locale as Locale, slug);
  if (!project) notFound();

  const t = await getTranslations("Projects");
  const { frontmatter, body } = project;

  return (
    <article className="py-[var(--space-section)]">
      <Container className="flex flex-col gap-8">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          {t("back")}
        </Link>

        <header className="flex flex-col gap-4">
          {frontmatter.subtitle && (
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
              {frontmatter.subtitle}
            </span>
          )}
          <h1 className="text-ink" style={{ fontSize: "var(--text-3xl)" }}>
            {frontmatter.title}
          </h1>
          <p className="max-w-[var(--content-max)] text-muted" style={{ fontSize: "var(--text-lg)" }}>
            {frontmatter.summary}
          </p>
          {frontmatter.tags.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {frontmatter.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </header>

        {frontmatter.cover && (
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[calc(var(--radius)*1.5)] border border-border bg-surface-2">
            <Image
              src={frontmatter.cover}
              alt={frontmatter.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 72rem"
              className="object-cover"
            />
          </div>
        )}

        <Mdx source={body} />

        {frontmatter.links.length > 0 && (
          <section
            aria-label={t("links")}
            className="mt-4 flex flex-col gap-3 border-t border-border pt-6"
          >
            <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
              {t("links")}
            </h2>
            <ul className="flex flex-col gap-2">
              {frontmatter.links.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group inline-flex items-center gap-2 text-ink transition-colors hover:text-accent"
                  >
                    <ExternalLink className="h-4 w-4 text-accent" aria-hidden />
                    <span className="font-medium">{link.label}</span>
                    {link.description && (
                      <span className="text-sm text-muted">— {link.description}</span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </Container>
    </article>
  );
}
