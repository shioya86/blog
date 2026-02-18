import type { Metadata } from "next";
import Link from "next/link";
import { getAllTags, getPostsByTag } from "@/lib/posts";

type Props = {
  params: Promise<{ tag: string }>;
};

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({ tag: encodeURIComponent(tag) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  return {
    title: `#${decoded}`,
    description: `"${decoded}" タグの記事一覧`,
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const posts = getPostsByTag(decoded);

  return (
    <div className="py-4">
      <header className="mb-8">
        <p className="text-sm text-zinc-500">タグ</p>
        <h1 className="mt-1 text-2xl font-bold">#{decoded}</h1>
        <p className="mt-1 text-sm text-zinc-500">{posts.length} 件</p>
      </header>

      <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
        {posts.map((post) => (
          <li key={post.slug} className="py-6">
            <article>
              <time className="text-sm text-zinc-500">{post.date}</time>
              <h2 className="mt-1 text-lg font-semibold">
                <Link
                  href={`/posts/${post.slug}`}
                  className="hover:opacity-70 transition-opacity"
                >
                  {post.title}
                </Link>
              </h2>
              {post.description && (
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {post.description}
                </p>
              )}
            </article>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <Link
          href="/"
          className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          ← 記事一覧へ
        </Link>
      </div>
    </div>
  );
}
