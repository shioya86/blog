import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="py-4">
      <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
        {posts.map((post) => (
          <li key={post.slug} className="relative py-5">
            <article>
              <time className="text-sm text-zinc-500">{post.date}</time>
              <h2 className="mt-1 text-xl font-semibold">
                {/* after:absolute after:inset-0 でカード全体をクリック領域に */}
                <Link
                  href={`/posts/${post.slug}`}
                  className="hover:opacity-70 transition-opacity after:absolute after:inset-0"
                >
                  {post.title}
                </Link>
              </h2>
              {post.description && (
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {post.description}
                </p>
              )}
              {post.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
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
