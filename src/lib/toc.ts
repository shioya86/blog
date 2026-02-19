import GithubSlugger from "github-slugger";

export type Heading = {
  id: string;
  text: string;
  level: 2 | 3;
};

/**
 * MDX の生テキストから H2・H3 見出しを抽出する。
 * rehype-slug と同じ github-slugger を使うことで、
 * レンダリングされた heading の id と必ず一致する。
 */
export function extractH2Headings(content: string): Heading[] {
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];

  for (const line of content.split("\n")) {
    const match = line.match(/^(#{2,3}) (.+)$/);
    if (!match) continue;

    const level = match[1].length as 2 | 3;
    const plain = match[2]
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // [text](url) → text
      .replace(/[`*_]/g, "")
      .trim();

    headings.push({ id: slugger.slug(plain), text: plain, level });
  }

  return headings;
}
