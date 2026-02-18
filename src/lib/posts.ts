import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { cache } from "react";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "src/content/posts");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  updatedAt: string | null;
  tags: string[];
  description: string;
};

export type Post = PostMeta & {
  content: string;
};

/**
 * ファイルの最終コミット日を git log から取得する。
 * git 環境がない場合（CI の shallow clone など）は null を返す。
 */
function getLastModified(filePath: string): string | null {
  try {
    const iso = execSync(`git log -1 --format=%cI -- "${filePath}"`, {
      encoding: "utf8",
      stdio: ["pipe", "pipe", "pipe"],
    }).trim();
    return iso ? iso.slice(0, 10) : null;
  } catch {
    return null;
  }
}

export const getAllPosts = cache((): PostMeta[] => {
  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((name) => name.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);
      const date = data.date as string;
      const lastModified = getLastModified(fullPath);
      // 作成日と同じ日なら「更新なし」とみなして null にする
      const updatedAt = lastModified && lastModified !== date ? lastModified : null;
      return {
        slug,
        title: data.title as string,
        date,
        updatedAt,
        tags: (data.tags as string[]) ?? [],
        description: (data.description as string) ?? "",
      };
    });
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
});

export function getPostBySlug(slug: string): Post {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const date = data.date as string;
  const lastModified = getLastModified(fullPath);
  const updatedAt = lastModified && lastModified !== date ? lastModified : null;
  return {
    slug,
    title: data.title as string,
    date,
    updatedAt,
    tags: (data.tags as string[]) ?? [],
    description: (data.description as string) ?? "",
    content,
  };
}

export const getAllTags = cache((): string[] => {
  const posts = getAllPosts();
  const tags = new Set<string>();
  posts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
  return Array.from(tags).sort();
});

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPosts().filter((post) => post.tags.includes(tag));
}
