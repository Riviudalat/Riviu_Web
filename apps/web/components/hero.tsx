"use client";

import {
  ArrowRight,
  Eye,
  TiktokLogo,
  UsersThree,
} from "@phosphor-icons/react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import Link from "next/link";
import { useRef, type ReactNode } from "react";
import {
  formatCompact,
  KOL_CHANNELS,
  NETWORK_AUDIENCE,
  POSTS_IMPRESSIONS,
} from "../lib/network-data";
import { Magnetic } from "./effects/magnetic";
import { TextReveal } from "./effects/text-reveal";
import { Tilt } from "./effects/tilt";

const ease = [0.21, 0.65, 0.36, 1] as const;

function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export type HeroProps = {
  layout?: "split" | "center";
  showCard?: "yes" | "no";
  kicker?: string;
  titleLine?: string;
  titleAccent?: string;
  description?: string;
  primaryCta?: string;
  secondaryCta?: string;
  badges?: { text: string }[];
};

export const heroDefaults = {
  layout: "split" as const,
  showCard: "yes" as const,
  kicker: "Công ty truyền thông Riviu Đà Lạt",
  titleLine: "Ăn khắp nơi,",
  titleAccent: "chơi khắp chốn.",
  description:
    "Riviu là công ty truyền thông F&B — giúp thương hiệu chạm đúng thực khách qua hệ sinh thái fanpage, group và KOL đang vận hành.",
  primaryCta: "Liên hệ hợp tác",
  secondaryCta: "Xem bảng giá",
  badges: [
    { text: "6 fanpage & group" },
    { text: "17 kênh KOL TikTok" },
    { text: "Số liệu từ Facebook Insights" },
  ],
} satisfies Required<HeroProps>;

const PROOF_METRICS = [
  {
    icon: UsersThree,
    value: `${formatCompact(NETWORK_AUDIENCE)}+`,
    label: "người theo dõi & thành viên",
  },
  {
    icon: Eye,
    value: formatCompact(POSTS_IMPRESSIONS),
    label: "lượt hiển thị từ 7 bài thật",
  },
  {
    icon: TiktokLogo,
    value: `${KOL_CHANNELS} kênh`,
    label: "KOL TikTok tại Đà Lạt",
  },
];

function NetworkProof() {
  return (
    <div className="relative hidden lg:block">
      <div
        aria-hidden
        className="absolute -top-6 -right-6 h-full w-full rounded-3xl bg-brand-50"
      />
      <div className="relative rounded-3xl border border-black/10 bg-white p-7 shadow-sm">
        <p className="text-xs font-bold tracking-[0.2em] text-brand-600 uppercase">
          Hệ sinh thái Riviu Đà Lạt
        </p>
        <h2 className="mt-2 text-2xl leading-tight font-black">
          Số liệu thật, đo được từ các kênh đang vận hành
        </h2>
        <div className="mt-6 space-y-3">
          {PROOF_METRICS.map((metric) => (
            <div
              key={metric.label}
              className="flex items-center gap-4 rounded-2xl border border-black/5 bg-neutral-50 p-4"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <metric.icon size={24} weight="duotone" />
              </span>
              <div>
                <p className="text-xl font-black tracking-tight">
                  {metric.value}
                </p>
                <p className="text-xs text-ink-soft">{metric.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Hero(props: HeroProps) {
  const d = { ...heroDefaults, ...props };
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const centered = d.layout === "center";
  const withCard = !centered && d.showCard !== "no";

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const cardY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const circleY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const ringY = useTransform(scrollYProgress, [0, 1], [0, 130]);

  return (
    <section
      ref={sectionRef}
      id="top"
      data-section="hero"
      className="relative overflow-hidden pt-32 pb-16 md:pt-44 md:pb-24"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          style={reduced ? undefined : { y: circleY }}
          className="absolute -top-24 right-[-8rem] h-96 w-96 rounded-full bg-brand-50"
        />
        <motion.div
          style={reduced ? undefined : { y: ringY }}
          className="absolute bottom-[-4rem] left-[-5rem] h-64 w-64 rounded-full border-[3px] border-brand-100"
        />
      </div>

      <div
        className={`mx-auto max-w-6xl px-4 md:px-6 ${
          withCard
            ? "grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]"
            : ""
        }`}
      >
        <div className={centered ? "mx-auto max-w-3xl text-center" : ""}>
          <FadeUp>
            <p className="text-xs font-bold tracking-[0.25em] text-brand-600 uppercase">
              {d.kicker}
            </p>
          </FadeUp>

          <h1 className="mt-5 text-5xl leading-[1.04] font-black tracking-tight text-balance md:text-7xl">
            <TextReveal text={d.titleLine} />
            <TextReveal
              text={d.titleAccent}
              className="block text-brand-500"
              delay={0.18}
            />
          </h1>

          <FadeUp delay={0.3}>
            <p
              className={`mt-6 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg ${centered ? "mx-auto" : ""}`}
            >
              {d.description}
            </p>
          </FadeUp>

          <FadeUp delay={0.42}>
            <div
              className={`mt-9 flex flex-col gap-4 sm:flex-row ${centered ? "justify-center" : ""}`}
            >
              <Magnetic className="w-full sm:w-auto">
                <a
                  href="#lien-he"
                  data-track="hero-contact"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-500 px-8 py-4 text-base font-bold text-white transition-colors duration-300 hover:bg-brand-600 active:scale-[0.98] sm:w-auto"
                >
                  {d.primaryCta}
                  <ArrowRight
                    size={18}
                    weight="bold"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </a>
              </Magnetic>
              <Magnetic className="w-full sm:w-auto" strength={0.18}>
                <Link
                  href="/bang-gia"
                  data-track="hero-pricing"
                  className="inline-flex w-full items-center justify-center rounded-full border-2 border-ink/15 px-8 py-4 text-base font-bold transition-colors duration-300 hover:border-brand-500 hover:text-brand-600 active:scale-[0.98] sm:w-auto"
                >
                  {d.secondaryCta}
                </Link>
              </Magnetic>
            </div>
          </FadeUp>

        </div>

        {withCard ? (
          <motion.div style={reduced ? undefined : { y: cardY }}>
            <FadeUp delay={0.3}>
              <Tilt max={7}>
                <NetworkProof />
              </Tilt>
            </FadeUp>
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
