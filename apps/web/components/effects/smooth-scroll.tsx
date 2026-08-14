"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/** Cuộn mượt kiểu agency. Tự tắt khi người dùng bật giảm chuyển động. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  if (reduced) return <>{children}</>;
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.1, anchors: true }}>
      {children}
    </ReactLenis>
  );
}
