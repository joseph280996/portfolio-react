import { useFormatter } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Doc } from "@/lib/content";
import { readingTime } from "@/lib/content";
import type { PostFrontmatter } from "@/lib/content-schema";

interface PostCardProps {
  post: Doc<PostFrontmatter>;
  body: string;
}

export function PostCard({ post, body }: PostCardProps) {
  const { slug, frontmatter } = post;
  const format = useFormatter();
  const minutes = readingTime(body);

  return (
    <article className="group border-b border-border py-8 first:pt-0 last:border-0">
      <Link
        href={`/blog/${slug}`}
        className="flex flex-col gap-3 focus-visible:outline-none"
      >
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.15em] text-muted">
          <time dateTime={frontmatter.date}>
            {format.dateTime(new Date(frontmatter.date), {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <span aria-hidden>·</span>
          <span>{minutes} min</span>
        </div>
        <h3
          className="text-ink transition-colors group-hover:text-accent"
          style={{ fontSize: "var(--text-xl)" }}
        >
          {frontmatter.title}
        </h3>
        <p className="max-w-[var(--content-max)] text-muted">
          {frontmatter.description}
        </p>
        {frontmatter.tags.length > 0 && (
          <ul className="mt-1 flex flex-wrap gap-2">
            {frontmatter.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-border px-2.5 py-0.5 font-mono text-xs text-muted"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </Link>
    </article>
  );
}
