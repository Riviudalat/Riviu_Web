"use client";

import { Quotes } from "@phosphor-icons/react";
import { DropZone } from "@puckeditor/core";
import { mediaUrl } from "../lib/api";

/**
 * Block cơ bản cho Puck editor — kéo thả tự do như WordPress.
 * Mỗi block tự bọc container max-w-6xl để đứng độc lập ở cấp trang.
 */

const WRAP = "mx-auto w-full max-w-6xl px-4 md:px-6";

const ALIGN: Record<string, string> = {
  left: "text-left",
  center: "text-center",
};

/* ---------- Heading ---------- */

export type HeadingBlockProps = {
  text?: string;
  level?: "h2" | "h3" | "h4";
  align?: "left" | "center";
  color?: "ink" | "brand" | "white";
};

export const headingBlockDefaults = {
  text: "Tiêu đề mới",
  level: "h2" as const,
  align: "left" as const,
  color: "ink" as const,
} satisfies Required<HeadingBlockProps>;

const HEADING_SIZE: Record<string, string> = {
  h2: "text-3xl md:text-5xl",
  h3: "text-2xl md:text-4xl",
  h4: "text-xl md:text-2xl",
};

const HEADING_COLOR: Record<string, string> = {
  ink: "text-ink",
  brand: "text-brand-500",
  white: "text-white",
};

export function HeadingBlock(props: HeadingBlockProps) {
  const d = { ...headingBlockDefaults, ...props };
  const Tag = d.level;
  return (
    <div className={`${WRAP} py-3`}>
      <Tag
        className={`font-black tracking-tight text-balance ${HEADING_SIZE[d.level]} ${HEADING_COLOR[d.color]} ${ALIGN[d.align]}`}
      >
        {d.text}
      </Tag>
    </div>
  );
}

/* ---------- Text ---------- */

export type TextBlockProps = {
  text?: string;
  align?: "left" | "center";
  size?: "sm" | "base" | "lg";
  color?: "ink" | "soft" | "white";
};

export const textBlockDefaults = {
  text: "Nhập nội dung của bạn tại đây. Có thể paste văn bản tiếng Việt thoải mái — xuống dòng được giữ nguyên.",
  align: "left" as const,
  size: "base" as const,
  color: "soft" as const,
} satisfies Required<TextBlockProps>;

const TEXT_SIZE: Record<string, string> = {
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
};

const TEXT_COLOR: Record<string, string> = {
  ink: "text-ink",
  soft: "text-ink-soft",
  white: "text-white/85",
};

export function TextBlock(props: TextBlockProps) {
  const d = { ...textBlockDefaults, ...props };
  return (
    <div className={`${WRAP} py-2`}>
      <p
        className={`max-w-3xl leading-relaxed whitespace-pre-line ${TEXT_SIZE[d.size]} ${TEXT_COLOR[d.color]} ${ALIGN[d.align]} ${d.align === "center" ? "mx-auto" : ""}`}
      >
        {d.text}
      </p>
    </div>
  );
}

/* ---------- Image ---------- */

export type ImageBlockProps = {
  src?: string;
  alt?: string;
  aspect?: "video" | "wide" | "square" | "auto";
  rounded?: "yes" | "no";
  caption?: string;
};

export const imageBlockDefaults = {
  src: "/photos/spread.jpg",
  alt: "Ảnh minh họa",
  aspect: "video" as const,
  rounded: "yes" as const,
  caption: "",
} satisfies Required<ImageBlockProps>;

const ASPECT: Record<string, string> = {
  video: "aspect-video",
  wide: "aspect-[21/9]",
  square: "aspect-square",
  auto: "",
};

export function ImageBlock(props: ImageBlockProps) {
  const d = { ...imageBlockDefaults, ...props };
  if (!d.src) return null;
  return (
    <figure className={`${WRAP} py-3`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- ảnh động từ CMS/upload, domain không cố định */}
      <img
        src={mediaUrl(d.src)}
        alt={d.alt}
        loading="lazy"
        className={`w-full object-cover ${ASPECT[d.aspect]} ${d.rounded === "yes" ? "rounded-3xl" : ""}`}
      />
      {d.caption ? (
        <figcaption className="mt-3 text-center text-sm text-ink-soft">
          {d.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

/* ---------- Button ---------- */

export type ButtonBlockProps = {
  label?: string;
  href?: string;
  style?: "primary" | "outline" | "dark";
  align?: "left" | "center";
};

export const buttonBlockDefaults = {
  label: "Liên hệ ngay",
  href: "#lien-he",
  style: "primary" as const,
  align: "left" as const,
} satisfies Required<ButtonBlockProps>;

const BUTTON_STYLE: Record<string, string> = {
  primary: "bg-brand-500 text-white hover:bg-brand-600",
  outline:
    "border-2 border-ink/15 text-ink hover:border-brand-500 hover:text-brand-600",
  dark: "bg-ink text-white hover:bg-brand-600",
};

export function ButtonBlock(props: ButtonBlockProps) {
  const d = { ...buttonBlockDefaults, ...props };
  return (
    <div
      className={`${WRAP} flex py-3 ${d.align === "center" ? "justify-center" : ""}`}
    >
      <a
        href={d.href}
        data-track="block-button"
        className={`inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-bold transition-colors duration-300 active:scale-[0.98] ${BUTTON_STYLE[d.style]}`}
      >
        {d.label}
      </a>
    </div>
  );
}

/* ---------- Quote ---------- */

export type QuoteBlockProps = {
  quote?: string;
  author?: string;
};

export const quoteBlockDefaults = {
  quote: "Một bài riviu chân thật đáng giá hơn nghìn lời quảng cáo.",
  author: "Đội ngũ Riviu",
} satisfies Required<QuoteBlockProps>;

export function QuoteBlock(props: QuoteBlockProps) {
  const d = { ...quoteBlockDefaults, ...props };
  return (
    <div className={`${WRAP} py-4`}>
      <blockquote className="rounded-3xl border-l-4 border-brand-500 bg-brand-50 p-7 md:p-9">
        <Quotes size={28} weight="duotone" className="text-brand-500" />
        <p className="mt-3 text-lg leading-relaxed font-semibold text-balance md:text-xl">
          {d.quote}
        </p>
        {d.author ? (
          <footer className="mt-4 text-sm font-bold text-brand-700">
            — {d.author}
          </footer>
        ) : null}
      </blockquote>
    </div>
  );
}

/* ---------- Spacer & Divider ---------- */

export type SpacerBlockProps = {
  size?: "s" | "m" | "l" | "xl";
};

export const spacerBlockDefaults = {
  size: "m" as const,
} satisfies Required<SpacerBlockProps>;

const SPACER_SIZE: Record<string, string> = {
  s: "h-6",
  m: "h-12",
  l: "h-20",
  xl: "h-32",
};

export function SpacerBlock(props: SpacerBlockProps) {
  const d = { ...spacerBlockDefaults, ...props };
  return <div aria-hidden className={SPACER_SIZE[d.size]} />;
}

export type DividerBlockProps = Record<string, never>;

export const dividerBlockDefaults = {} satisfies DividerBlockProps;

export function DividerBlock() {
  return (
    <div className={`${WRAP} py-4`}>
      <hr className="border-black/10" />
    </div>
  );
}

/* ---------- Video (YouTube) ---------- */

export type VideoBlockProps = {
  url?: string;
  caption?: string;
};

export const videoBlockDefaults = {
  url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  caption: "",
} satisfies Required<VideoBlockProps>;

function youtubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/,
  );
  return match?.[1] ?? null;
}

export function VideoBlock(props: VideoBlockProps) {
  const d = { ...videoBlockDefaults, ...props };
  const id = youtubeId(d.url);

  return (
    <figure className={`${WRAP} py-3`}>
      {id ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}`}
          title={d.caption || "Video YouTube"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          className="aspect-video w-full rounded-3xl border-0"
        />
      ) : (
        <div className="flex aspect-video w-full items-center justify-center rounded-3xl bg-neutral-100 text-sm font-semibold text-ink-soft">
          Dán link YouTube hợp lệ vào ô URL
        </div>
      )}
      {d.caption ? (
        <figcaption className="mt-3 text-center text-sm text-ink-soft">
          {d.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

/* ---------- Columns (bố cục lồng nhau) ---------- */

export type ColumnsBlockProps = {
  columns?: "2" | "3";
  gap?: "s" | "m" | "l";
};

export const columnsBlockDefaults = {
  columns: "2" as const,
  gap: "m" as const,
} satisfies Required<ColumnsBlockProps>;

const GAP: Record<string, string> = {
  s: "gap-4",
  m: "gap-8",
  l: "gap-14",
};

export function ColumnsBlock(props: ColumnsBlockProps) {
  const d = { ...columnsBlockDefaults, ...props };
  const count = d.columns === "3" ? 3 : 2;

  return (
    <div className={`${WRAP} py-3`}>
      <div
        className={`grid ${GAP[d.gap]} ${count === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}
      >
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="min-h-12 min-w-0">
            <DropZone zone={`cot-${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
