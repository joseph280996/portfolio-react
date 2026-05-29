import type { Metadata } from "next";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { setRequestLocale, getTranslations, getFormatter } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { getPost, getPostSlugs, readingTime } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { Mdx } from "@/components/mdx/mdx";

interface PostDetailProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: PostDetailProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPost(locale as Locale, slug);
  if (!post) return {};
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
  };
}

export default async function PostDetailPage({ params }: PostDetailProps) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale as Locale);

  const post = await getPost(locale as Locale, slug);
  if (!post) notFound();

  const t = await getTranslations("Blog");
  const format = await getFormatter();
  const { frontmatter, body } = post;
  const minutes = readingTime(body);

  return (
    <article className="py-[var(--space-section)]">
      <Container className="flex max-w-[var(--container-max)] flex-col gap-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          {t("back")}
        </Link>

        <header className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.15em] text-muted">
            <time dateTime={frontmatter.date}>
              {format.dateTime(new Date(frontmatter.date), {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span aria-hidden>·</span>
            <span>{t("readingTime", { minutes })}</span>
          </div>
          <h1 className="text-ink" style={{ fontSize: "var(--text-3xl)" }}>
            {frontmatter.title}
          </h1>
          <p className="max-w-[var(--content-max)] text-muted" style={{ fontSize: "var(--text-lg)" }}>
            {frontmatter.description}
          </p>
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
      </Container>
    </article>
  );
}
