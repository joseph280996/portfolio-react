import { MDXRemote } from "next-mdx-remote/rsc";
import type { MDXComponents } from "mdx/types";
import { cn } from "@/lib/cn";

/**
 * Element styling for compiled MDX. We map each markdown element to our design
 * tokens rather than pulling in a global typography plugin, so prose inherits
 * the same scale/spacing/color system as the rest of the site.
 */
const components: MDXComponents = {
  h2: (props) => (
    <h2
      className="mt-12 mb-4 text-ink"
      style={{ fontSize: "var(--text-xl)" }}
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mt-8 mb-3 text-ink"
      style={{ fontSize: "var(--text-lg)" }}
      {...props}
    />
  ),
  p: (props) => (
    <p
      className="my-4 leading-relaxed text-muted [&_strong]:text-ink"
      {...props}
    />
  ),
  ul: (props) => (
    <ul className="my-4 flex list-disc flex-col gap-2 pl-5 text-muted" {...props} />
  ),
  ol: (props) => (
    <ol
      className="my-4 flex list-decimal flex-col gap-2 pl-5 text-muted"
      {...props}
    />
  ),
  li: (props) => <li className="leading-relaxed [&_strong]:text-ink" {...props} />,
  a: ({ href = "#", ...props }) => {
    const external = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        className="font-medium text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
        {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
        {...props}
      />
    );
  },
  blockquote: (props) => (
    <blockquote
      className="my-6 border-l-2 border-accent pl-4 text-muted italic"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[0.9em] text-ink"
      {...props}
    />
  ),
  hr: (props) => <hr className="my-10 border-border" {...props} />,
};

interface MdxProps {
  source: string;
  className?: string;
}

export function Mdx({ source, className }: MdxProps) {
  return (
    <div className={cn("max-w-[var(--content-max)]", className)}>
      <MDXRemote source={source} components={components} />
    </div>
  );
}
