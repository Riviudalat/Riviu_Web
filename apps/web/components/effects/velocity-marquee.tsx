"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { useRef, type ReactNode } from "react";

function wrap(min: number, max: number, value: number): number {
  const range = max - min;
  return min + ((((value - min) % range) + range) % range);
}

/**
 * Dải chạy vô hạn phản ứng theo vận tốc cuộn: cuộn nhanh chạy nhanh,
 * cuộn ngược đổi chiều, kèm skew nhẹ tạo cảm giác quán tính.
 * children phải được nhân đôi (2 bản copy) để wrap -50%..0% liền mạch.
 */
export function VelocityMarquee({
  children,
  baseVelocity = 2.2,
  className,
}: {
  children: ReactNode;
  baseVelocity?: number;
  className?: string;
}) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], {
    clamp: false,
  });
  const skewX = useTransform(smoothVelocity, [-1200, 1200], [-3, 3]);
  const directionFactor = useRef(baseVelocity < 0 ? -1 : 1);
  const reduced = useReducedMotion();

  const x = useTransform(baseX, (value) => `${wrap(-50, 0, value)}%`);

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    let moveBy =
      directionFactor.current * Math.abs(baseVelocity) * (delta / 1000);

    const factor = velocityFactor.get();
    if (factor < 0) {
      directionFactor.current = baseVelocity < 0 ? 1 : -1;
    } else if (factor > 0) {
      directionFactor.current = baseVelocity < 0 ? -1 : 1;
    }

    moveBy += directionFactor.current * Math.abs(moveBy) * Math.abs(factor);
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div
      className={`overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] ${className ?? ""}`}
    >
      <motion.div
        className="flex w-max gap-4 pr-4"
        style={reduced ? undefined : { x, skewX }}
      >
        {children}
      </motion.div>
    </div>
  );
}
