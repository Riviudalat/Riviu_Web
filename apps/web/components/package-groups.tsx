"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import { packageGroups } from "../lib/package-tables";
import { TextReveal } from "./effects/text-reveal";
import { PackageCarousel } from "./package-carousel";
import { PackageDetailTable } from "./package-detail-table";

const ease = [0.21, 0.65, 0.36, 1] as const;

function GroupHeading({
  kicker,
  title,
  titleAccent,
  sub,
}: {
  kicker: string;
  title: string;
  titleAccent: string;
  sub: string;
}) {
  return (
    <div className="mb-10 max-w-2xl md:mb-12">
      <motion.p
        className="text-xs font-bold tracking-[0.25em] text-brand-600 uppercase"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease }}
      >
        {kicker}
      </motion.p>
      <h2 className="mt-4 text-4xl leading-[1.08] font-black tracking-tight text-balance md:text-6xl">
        <TextReveal text={title} inView />
        <TextReveal
          text={titleAccent}
          className="block text-brand-500"
          delay={0.16}
          inView
        />
      </h2>
      <motion.p
        className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, delay: 0.2, ease }}
      >
        {sub}
      </motion.p>
    </div>
  );
}

function PackageGroupSection({
  id,
  kicker,
  title,
  titleAccent,
  sub,
  tables,
  invert,
}: {
  id: string;
  kicker: string;
  title: string;
  titleAccent: string;
  sub: string;
  tables: ReturnType<typeof packageGroups>[number]["tables"];
  invert?: boolean;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const circleY = useTransform(scrollYProgress, [0, 1], [40, -70]);
  const ringY = useTransform(scrollYProgress, [0, 1], [-30, 80]);

  return (
    <section
      ref={sectionRef}
      id={id}
      data-section={id}
      className={`relative scroll-mt-24 overflow-hidden ${
        invert ? "bg-white" : "bg-brand-50"
      } py-16 md:py-24`}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          style={reduced ? undefined : { y: circleY }}
          className={`absolute -top-20 right-[-7rem] h-80 w-80 rounded-full ${
            invert ? "bg-brand-50" : "bg-white"
          }`}
        />
        <motion.div
          style={reduced ? undefined : { y: ringY }}
          className="absolute bottom-[-3rem] left-[-4rem] h-52 w-52 rounded-full border-[3px] border-brand-100"
        />
      </div>

      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <GroupHeading
          kicker={kicker}
          title={title}
          titleAccent={titleAccent}
          sub={sub}
        />
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.12, ease }}
        >
          <PackageCarousel
            ariaLabel={`${kicker}: ${title}`}
            items={tables.map((table) => (
              <PackageDetailTable key={table.id} table={table} />
            ))}
          />
        </motion.div>
      </div>
    </section>
  );
}

export function PackageGroups() {
  const groups = packageGroups();
  return (
    <>
      {groups.map((group, index) => (
        <PackageGroupSection
          key={group.id}
          {...group}
          invert={index % 2 === 1}
        />
      ))}
    </>
  );
}
