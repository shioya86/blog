import type { Heading } from "@/lib/toc";

/** xl 以上の固定サイドバー用 */
export function TableOfContents({ headings }: { headings: Heading[] }) {
  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="目次"
      className="rounded-lg border border-zinc-200 dark:border-zinc-700 px-5 py-4"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
        目次
      </p>
      <ol className="mt-3 space-y-2.5">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className="block text-sm leading-snug text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
