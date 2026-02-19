import { AUTHOR_GITHUB } from "@/lib/config";

export function Author() {
  return (
    <a
      href={`https://github.com/${AUTHOR_GITHUB}`}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-3 inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://github.com/${AUTHOR_GITHUB}.png?size=40`}
        alt={AUTHOR_GITHUB}
        width={20}
        height={20}
        className="rounded-full"
      />
      <span>written by @{AUTHOR_GITHUB}</span>
    </a>
  );
}
