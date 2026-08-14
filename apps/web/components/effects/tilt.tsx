"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useRef, type ReactNode } from "react";

/** Nghiêng 3D theo con trỏ chuột (desktop only). */
export function Tilt({
  children,
  max = 9,
  className,
}: {
  children: ReactNode;
  max?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 160, damping: 18 });
  const springRotateY = useSpring(rotateY, { stiffness: 160, damping: 18 });
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div style={{ perspective: 1000 }} className={className}>
      <motion.div
        ref={ref}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
        onPointerMove={(event) => {
          if (event.pointerType !== "mouse") return;
          const rect = ref.current?.getBoundingClientRect();
          if (!rect) return;
          const px = (event.clientX - rect.left) / rect.width - 0.5;
          const py = (event.clientY - rect.top) / rect.height - 0.5;
          rotateX.set(-py * max);
          rotateY.set(px * max);
        }}
        onPointerLeave={() => {
          rotateX.set(0);
          rotateY.set(0);
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
