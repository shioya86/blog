# CLAUDE.md

Claude が本プロジェクトで作業する際の技術的コンテキスト。

## プロジェクト概要

個人技術ブログ。認証なし・DB なし・ファイルベースのシンプル構成。

## コマンド

```bash
yarn dev        # 開発サーバー (http://localhost:3000)
yarn build      # 本番ビルド（全記事 SSG）
yarn lint       # ESLint
```

## パッケージマネージャー

yarn を使用する（npm は使わない）。`yarn.lock` で管理。

## ディレクトリ構成

```
src/
├── app/
│   ├── page.tsx                  # 記事一覧 (SSG)
│   ├── posts/[slug]/
│   │   └── page.tsx              # 記事詳細 (SSG)
│   ├── tags/[tag]/
│   │   └── page.tsx              # タグ別一覧 (SSG)
│   └── layout.tsx
├── content/
│   └── posts/
│       └── *.mdx                 # 記事ファイル（main にあるものが全公開）
├── lib/
│   ├── posts.ts                  # MDX 読み込み・パース・一覧取得
│   └── mdx.ts                    # MDX レンダリング設定
└── components/
    ├── Comments.tsx              # giscus（Client Component）将来実装
    └── ...
```

## 技術スタック

| 役割 | 技術 | バージョン |
|------|------|------------|
| フレームワーク | Next.js | 16.1.6 |
| ランタイム | React | 19.2.3 |
| 言語 | TypeScript | ^5 |
| スタイリング | Tailwind CSS | v4 |
| コンテンツ | MDX | - |
| Frontmatter パース | gray-matter | - |
| MDX レンダリング | next-mdx-remote/rsc | - |
| シンタックスハイライト | rehype-shiki | - |
| コメント | giscus / @giscus/react | 将来実装 |
| デプロイ | Vercel（Hobby プラン） | - |

## コンテンツ仕様

### Frontmatter スキーマ

```yaml
---
title: "記事タイトル"        # 必須
date: "2026-02-19"           # 必須 (YYYY-MM-DD)
tags: ["Next.js", "TypeScript"]  # 任意
description: "記事の概要"    # 任意（OGP などに使用）
---
```

### ファイル命名規則

```
src/content/posts/YYYY-MM-DD-slug-name.mdx
```

slug は URL に使用されるため、英数字・ハイフンのみ使用する。

## レンダリング方針

- **全ページ SSG**（`generateStaticParams` + `cache`）
- ISR は現時点で不使用（ファイルベースのため deploy 時再ビルドで十分）
- `"use client"` は最小限に留める（giscus など外部連携コンポーネントのみ）

## 下書き・公開フロー

- **下書き**: feature ブランチで管理（`main` にマージされていないものは本番に出ない）
- **プレビュー**: Vercel がブランチ push 時に自動でプレビュー URL を発行
- **公開**: `main` へ merge → Vercel 自動デプロイ
- **認証**: 不要（Vercel プレビュー URL のランダムハッシュによる秘匿性で運用）

## アーキテクチャ上の制約・決定事項

- DB は持たない（コスト削減）
- 認証システム（NextAuth.js 等）は導入しない（必要になった時点で追加検討）
- middleware.ts は現時点で不要
- 管理画面は不要
- 著者は 1 名のみ

## 将来実装予定（現時点では手を付けない）

- giscus コメント機能（GitHub Discussions ベース）
  - 実装前に GitHub リポジトリで Discussions を有効化し、giscus アプリをインストールする必要あり
