# Blog

個人技術ブログ。Next.js App Router + MDX によるファイルベースのブログシステム。

## 概要

- **著者**: 個人（1名のみ）
- **用途**: 技術記事の発信
- **コンテンツ管理**: MDX ファイルをリポジトリ内で管理
- **デプロイ**: Vercel

## 技術スタック

| 役割 | 技術 |
|------|------|
| フレームワーク | Next.js 16 / App Router |
| 言語 | TypeScript |
| コンテンツ | MDX + gray-matter |
| MDXレンダリング | next-mdx-remote/rsc |
| シンタックスハイライト | rehype-shiki |
| スタイリング | Tailwind CSS v4 |
| コメント | giscus（GitHub Discussions）※将来実装 |
| デプロイ | Vercel（Hobby プラン） |
| 認証 | なし |

## ページ構成

| パス | 内容 | 生成方式 |
|------|------|----------|
| `/` | 記事一覧 | SSG |
| `/posts/[slug]` | 記事詳細 | SSG |
| `/tags/[tag]` | タグ別一覧 | SSG |

## コンテンツ管理

記事は `src/content/posts/` に MDX ファイルとして配置する。

### Frontmatter スキーマ

```yaml
---
title: "記事タイトル"
date: "2026-02-19"
tags: ["Next.js", "TypeScript"]
description: "記事の概要"
---
```

### ファイル命名規則

```
src/content/posts/
└── YYYY-MM-DD-slug-name.mdx
```

## 下書き・公開フロー

下書きは feature ブランチで管理する。Vercel が自動でプレビュー URL を発行するため、認証不要でプレビュー可能。

```
feature/post-xxx → push → Vercel プレビュー URL（URL を知る人のみアクセス可）
                    ↓
               main merge → Vercel 本番ビルド → 公開
```

**プレビュー保護方針**: Vercel Hobby プランのランダムハッシュ URL による秘匿性で運用（URL を共有しない限り外部からアクセス不可）。

## ローカル開発

```bash
npm install
npm run dev
```

`http://localhost:3000` で確認。

## ビルド・デプロイ

```bash
npm run build   # 本番ビルド（全記事を SSG）
npm run start   # 本番サーバー起動
```

main ブランチへの push で Vercel が自動デプロイ。

## コメント機能（将来実装）

[giscus](https://giscus.app/) を使用して GitHub Discussions ベースのコメントを実装予定。

事前に対象リポジトリで以下を有効化しておく必要がある:
- GitHub Discussions の有効化
- giscus アプリのリポジトリへのインストール
