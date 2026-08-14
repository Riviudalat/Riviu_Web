"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useEffect, useState } from "react";

const INTERACTIVE_SELECTOR =
  "a, button, [data-track], input, textarea, select, label, [role='button']";

/** Con trỏ tùy chỉnh kiểu agency — chỉ bật trên thiết bị có chuột. */
export function Cursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 26, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 260, damping: 26, mass: 0.6 });

  useEffect(() => {
    if (reduced) return;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer) return;

    setEnabled(true);
    document.documentElement.classList.add("cursor-custom");

    const onMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
    };
    const onOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      setHovering(Boolean(target?.closest?.(INTERACTIVE_SELECTOR)));
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      document.documentElement.classList.remove("cursor-custom");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [reduced, x, y]);

  if (!enabled) return null;

  /*
   * Không dùng mix-blend-difference: trên nền cam #FF6600 phép hiệu
   * cho ra xanh dương. Chấm và vòng đều màu cam thương hiệu, kèm hairline
   * trắng để vẫn thấy rõ khi nằm trên chính nền cam hoặc nền đen.
   */
  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[100] h-1.5 w-1.5 rounded-full bg-brand-500 shadow-[0_0_0_1.5px_rgba(255,255,255,0.9)]"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible && !hovering ? 1 : 0,
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[100] h-7 w-7 rounded-full border-2 border-brand-500 shadow-[0_0_0_1.5px_rgba(255,255,255,0.9),inset_0_0_0_1.5px_rgba(255,255,255,0.9)]"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          scale: hovering ? 1.55 : 1,
          opacity: visible ? (hovering ? 1 : 0.8) : 0,
          backgroundColor: hovering
            ? "rgba(255,102,0,0.16)"
            : "rgba(255,102,0,0)",
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
