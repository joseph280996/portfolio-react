import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { getSection, getProjects, getPosts } from "@/lib/content";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { ProjectsPreview } from "@/components/sections/projects-preview";
import { BlogPreview } from "@/components/sections/blog-preview";
import { Contact } from "@/components/sections/contact";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale as Locale);

  const t = await getTranslations("Nav");
  const tp = await getTranslations("Projects");
  const tb = await getTranslations("Blog");
  const tc = await getTranslations("Contact");

  const [hero, about, experience, contact, projects, posts] = await Promise.all([
    getSection(locale as Locale, "hero"),
    getSection(locale as Locale, "about"),
    getSection(locale as Locale, "experience"),
    getSection(locale as Locale, "contact"),
    getProjects(locale as Locale),
    getPosts(locale as Locale),
  ]);

  return (
    <>
      <Hero content={hero.frontmatter} />
      <About
        content={about.frontmatter}
        body={about.body}
        eyebrow={t("about")}
      />
      <Experience content={experience.frontmatter} eyebrow={t("experience")} />
      <ProjectsPreview
        projects={projects.slice(0, 3)}
        eyebrow={t("projects")}
        title={tp("title")}
        subtitle={tp("subtitle")}
        allLabel={tp("allProjects")}
      />
      <BlogPreview
        posts={posts.slice(0, 3)}
        eyebrow={t("blog")}
        title={tb("title")}
        subtitle={tb("subtitle")}
        allLabel={tb("allPosts")}
      />
      <Contact
        content={contact.frontmatter}
        eyebrow={t("contact")}
        emailLabel={tc("emailLabel")}
        phoneLabel={tc("phoneLabel")}
      />
    </>
  );
}
