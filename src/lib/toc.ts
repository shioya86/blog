import GithubSlugger from "github-slugger";

export type Heading = {
  id: string;
  text: string;
};

/**
 * MDX の生テキストから H2 見出しを抽出する。
 * rehype-slug と同じ github-slugger を使うことで、
 * レンダリングされた heading の id と必ず一致する。
 */
export function extractH2Headings(content: string): Heading[] {
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];
  const lines = content.split("\n");

  for (const line of lines) {
    const match = line.match(/^## (.+)$/);
    if (!match) continue;

    // Markdown 記法を除去してプレーンテキストにする
    const plain = match[1]
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // [text](url) → text
      .replace(/[`*_]/g, "")
      .trim();

    headings.push({ id: slugger.slug(plain), text: plain });
  }

  return headings;
}
