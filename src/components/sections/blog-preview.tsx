import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { PostPreviewCard } from "@/components/blog/post-preview-card";
import { buttonClasses } from "@/components/ui/button";
import type { Doc } from "@/lib/content";
import type { PostFrontmatter } from "@/lib/content-schema";

interface BlogPreviewProps {
  posts: Doc<PostFrontmatter>[];
  eyebrow: string;
  title: string;
  subtitle: string;
  allLabel: string;
}

export function BlogPreview({
  posts,
  eyebrow,
  title,
  subtitle,
  allLabel,
}: BlogPreviewProps) {
  if (posts.length === 0) return null;

  return (
    <section
      id="blog"
      aria-labelledby="blog-heading"
      className="scroll-mt-20 bg-surface-2/40 py-[var(--space-section)]"
    >
      <Container className="flex flex-col gap-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            id="blog-heading"
            eyebrow={eyebrow}
            title={title}
            subtitle={subtitle}
          />
          <Link
            href="/blog"
            className={buttonClasses("outline", "sm", "shrink-0")}
          >
            {allLabel}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug} className="h-full">
              <PostPreviewCard post={post} body={post.body} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
