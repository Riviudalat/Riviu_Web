"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Chữ hiện từng từ bằng mask overflow-hidden.
 * Nội dung vẫn nằm nguyên trong HTML SSR nên SEO không bị ảnh hưởng.
 */
export function TextReveal({
  text,
  className,
  delay = 0,
  stagger = 0.055,
  inView = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  /** Hiện khi cuộn tới — dùng cho section dưới fold. */
  inView?: boolean;
}) {
  const reduced = useReducedMotion();
  if (reduced) {
    return <span className={className}>{text}</span>;
  }

  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((word, index) => (
        <span
          key={index}
          aria-hidden
          className="-mt-[0.26em] -mb-[0.22em] inline-block overflow-hidden pt-[0.26em] pb-[0.22em] align-top"
        >
          <motion.span
            className="inline-block"
            initial={{ y: "160%" }}
            animate={inView ? undefined : { y: 0 }}
            whileInView={inView ? { y: 0 } : undefined}
            viewport={inView ? { once: true, amount: 0.7 } : undefined}
            transition={{
              duration: 0.55,
              delay: delay + index * stagger,
              ease: [0.22, 0.65, 0.3, 1],
            }}
          >
            {word}
            {index < words.length - 1 ? "\u00A0" : null}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
