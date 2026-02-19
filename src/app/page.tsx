import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="py-4">
      <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
        {posts.map((post) => (
          <li key={post.slug} className="relative py-3">
            <article>
              <div className="flex flex-wrap items-baseline gap-x-3">
                <h2 className="text-base font-semibold">
                  {/* after:absolute after:inset-0 でカード全体をクリック領域に */}
                  <Link
                    href={`/posts/${post.slug}`}
                    className="hover:opacity-70 transition-opacity after:absolute after:inset-0"
                  >
                    {post.title}
                  </Link>
                </h2>
                <time className="text-xs text-zinc-400 shrink-0">{post.date}</time>
              </div>
              {post.description && (
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400 leading-snug">
                  {post.description}
                </p>
              )}
              {post.tags.length > 0 && (
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    // relative z-10 でストレッチリンクより上に出してタグを独立クリック可能に
                    <Link
                      key={tag}
                      href={`/tags/${encodeURIComponent(tag)}`}
                      className="relative z-10 text-xs px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              )}
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
