import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { getPosts } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { PostCard } from "@/components/blog/post-card";

interface BlogPageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Blog" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale as Locale);

  const t = await getTranslations("Blog");
  const posts = await getPosts(locale as Locale);

  return (
    <Container className="flex max-w-[var(--container-max)] flex-col gap-10 py-[var(--space-section)]">
      <SectionHeading level={1} eyebrow={t("title")} title={t("title")} subtitle={t("subtitle")} />
      <div className="flex flex-col">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} body={post.body} />
        ))}
      </div>
    </Container>
  );
}
