"use client";

import { useState } from "react";
import type { Heading } from "@/lib/toc";

export function TocDrawer({ headings }: { headings: Heading[] }) {
  const [isOpen, setIsOpen] = useState(false);

  if (headings.length === 0) return null;

  return (
    <>
      {/* 右端固定のトグルボタン */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "目次を閉じる" : "目次を開く"}
        aria-expanded={isOpen}
        className="xl:hidden fixed right-0 top-1/2 -translate-y-1/2 z-50
          flex items-center justify-center w-8 h-14
          bg-zinc-800 dark:bg-zinc-600 text-white
          rounded-l-lg shadow-lg
          hover:bg-zinc-700 dark:hover:bg-zinc-500
          transition-colors"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden={true}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h10M4 18h13" />
        </svg>
      </button>

      {/* 背景オーバーレイ（クリックで閉じる） */}
      <div
        className={`xl:hidden fixed inset-0 z-40 transition-opacity duration-300
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsOpen(false)}
        aria-hidden={true}
      />

      {/*
        サイドバーと同じデザインのボックスが右からスライドイン。
        closed: translate-x-[calc(100%+2.5rem)] で画面右外へ退避
        open:   translate-x-0 で right-10 の位置に収まる
      */}
      <nav
        aria-label="目次"
        className={`xl:hidden fixed top-1/3 right-10 z-50 w-64
          rounded-lg border border-zinc-200 dark:border-zinc-700
          bg-white dark:bg-zinc-900
          px-5 py-4 shadow-lg
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-[calc(100%+2.5rem)]"}`}
      >
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          目次
        </p>
        <ol className="mt-3 space-y-2.5 max-h-[50vh] overflow-y-auto">
          {headings.map((h) => (
            <li key={h.id} className={h.level === 3 ? "pl-3" : ""}>
              <a
                href={`#${h.id}`}
                onClick={() => setIsOpen(false)}
                className="block text-sm leading-snug text-zinc-500 dark:text-zinc-400
                  hover:text-zinc-900 dark:hover:text-zinc-100
                  transition-colors"
              >
                {h.text}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
