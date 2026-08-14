"use client";

import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

/** Một slide = một bảng đủ cột. Chiều cao theo đúng bảng đang xem. */
export function PackageCarousel({
  items,
  ariaLabel,
}: {
  items: ReactNode[];
  ariaLabel: string;
}) {
  const reduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [height, setHeight] = useState<number>();

  const measure = useCallback((slideIndex: number) => {
    const el = trackRef.current;
    if (!el) return;
    const slide = el.querySelectorAll<HTMLElement>("[data-carousel-slide]")[
      slideIndex
    ];
    if (!slide) return;
    setHeight(slide.scrollHeight);
  }, []);

  const syncIndex = useCallback(() => {
    const el = trackRef.current;
    if (!el || el.clientWidth === 0) return;
    const next = Math.round(el.scrollLeft / el.clientWidth);
    const clamped = Math.min(items.length - 1, Math.max(0, next));
    setIndex(clamped);
    measure(clamped);
  }, [items.length, measure]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    measure(index);
    const ro = new ResizeObserver(() => measure(index));
    el.querySelectorAll("[data-carousel-slide]").forEach((slide) => {
      ro.observe(slide);
    });
    window.addEventListener("resize", syncIndex);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", syncIndex);
    };
  }, [index, items.length, measure, syncIndex]);

  const go = (next: number) => {
    const el = trackRef.current;
    if (!el) return;
    const clamped = Math.min(items.length - 1, Math.max(0, next));
    el.scrollTo({ left: clamped * el.clientWidth, behavior: "smooth" });
    setIndex(clamped);
    measure(clamped);
  };

  if (items.length === 0) return null;

  return (
    <div>
      <div
        ref={trackRef}
        onScroll={syncIndex}
        role="region"
        aria-label={ariaLabel}
        aria-roledescription="carousel"
        style={{ height: height ? `${height}px` : undefined }}
        className={`flex items-start snap-x snap-mandatory overflow-x-auto overflow-y-hidden scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
          reduced ? "" : "transition-[height] duration-300 ease-out"
        }`}
      >
        {items.map((item, itemIndex) => (
          <div
            key={itemIndex}
            data-carousel-slide
            className="w-full min-w-full shrink-0 snap-start snap-always"
          >
            {item}
          </div>
        ))}
      </div>

      {items.length > 1 ? (
        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="text-xs font-bold text-ink-soft">
            {index + 1} / {items.length}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => go(index - 1)}
              disabled={index === 0}
              aria-label="Gói trước"
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-black/10 bg-white transition-colors hover:border-brand-500 hover:text-brand-600 disabled:cursor-default disabled:opacity-30 disabled:hover:border-black/10 disabled:hover:text-ink"
            >
              <CaretLeft size={18} weight="bold" />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              disabled={index >= items.length - 1}
              aria-label="Gói tiếp theo"
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-brand-500 text-white transition-colors hover:bg-brand-600 disabled:cursor-default disabled:bg-black/10 disabled:text-ink disabled:opacity-40"
            >
              <CaretRight size={18} weight="bold" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
