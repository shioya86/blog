import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeShiki from "@shikijs/rehype";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { extractH2Headings } from "@/lib/toc";
import { TableOfContents } from "@/components/TableOfContents";
import { TocDrawer } from "@/components/TocDrawer";
import { Comments } from "@/components/Comments";
import { Author } from "@/components/Author";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = getPostBySlug(slug);
    return {
      title: post.title,
      description: post.description,
    };
  } catch {
    return {};
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;

  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  const headings = extractH2Headings(post.content);

  return (
    <>
      <article className="py-6">
        <header className="mb-6">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-zinc-500">
            <time dateTime={post.date}>公開: {post.date}</time>
            {post.updatedAt && (
              <time dateTime={post.updatedAt}>更新: {post.updatedAt}</time>
            )}
          </div>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">{post.title}</h1>
          <Author />
          {post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${encodeURIComponent(tag)}`}
                  className="text-xs px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </header>

        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <MDXRemote
            source={post.content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                  rehypeSlug,
                  [rehypeAutolinkHeadings, { behavior: "wrap" }],
                  [rehypeShiki, {
                    theme: "github-dark",
                    transformers: [
                      {
                        pre(node: import("hast").Element) {
                          const lang = (this as unknown as { options: { lang: string } }).options?.lang;
                          if (lang) node.properties["data-language"] = lang;
                        },
                      },
                    ],
                  }],
                ],
              },
            }}
          />
        </div>

        <section className="mt-10 pt-6 border-t border-zinc-100 dark:border-zinc-800">
          <Comments />
        </section>

        <footer className="mt-8">
          <Link
            href="/"
            className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            ← 記事一覧へ
          </Link>
        </footer>
      </article>

      {/* xl 未満：右端のアイコンボタン → スライドインパネル */}
      <TocDrawer headings={headings} />

      {/* xl 以上：コンテンツ右の空白に固定サイドバー */}
      <aside
        className="hidden xl:block fixed top-1/3 w-52 max-h-[calc(100vh/3*2)] overflow-y-auto"
        style={{ left: "calc(50% + 23rem)" }}
      >
        <TableOfContents headings={headings} />
      </aside>
    </>
  );
}
