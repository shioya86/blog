"use client";

import Giscus from "@giscus/react";

export function Comments() {
  return (
    <Giscus
      repo="shioya86/blog"
      repoId="R_kgDORTOKIw"
      category="Announcements"
      categoryId="DIC_kwDORTOKI84C2uP1"
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="preferred_color_scheme"
      lang="ja"
      loading="lazy"
    />
  );
}
