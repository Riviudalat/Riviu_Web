"use client";

import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  KOL_CHANNELS,
  KOL_FOLLOWERS,
  NETWORK_AUDIENCE,
  POSTS_IMPRESSIONS,
} from "../lib/network-data";
import { sectionPad, type SectionPadding } from "../lib/section-utils";
import { SECTION_ICONS, type SectionIconKey } from "./icons";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [value, setValue] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(to * eased));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setDone(true);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, to]);

  return (
    <motion.span
      ref={ref}
      className="inline-block"
      animate={done ? { scale: [1, 1.14, 1] } : undefined}
      transition={{ duration: 0.45, ease: [0.21, 0.65, 0.36, 1] }}
    >
      {value.toLocaleString("vi-VN")}
      {suffix}
    </motion.span>
  );
}

export type StatsProps = {
  background?: "white" | "cream";
  paddingY?: SectionPadding;
  kicker?: string;
  title?: string;
  sub?: string;
  pillars?: { icon: SectionIconKey; title: string; text: string }[];
  stats?: { value: number; suffix: string; label: string; note: string }[];
};

export const statsDefaults = {
  background: "white" as const,
  paddingY: "normal" as SectionPadding,
  kicker: "Về Riviu",
  title: "Hệ sinh thái nội dung đang vận hành bằng số liệu thật",
  sub: "Ra đời từ năm 2019 và được cấp phép mạng xã hội từ năm 2020. Các con số bên dưới lấy từ 6 fanpage/group và Facebook Insights trong hồ sơ năng lực Riviu Đà Lạt.",
  pillars: [
    {
      icon: "users" as SectionIconKey,
      title: "Cộng đồng thật",
      text: "Mỗi bài riviu gắn với người dùng thật, trải nghiệm thật — được cộng đồng phản biện công khai.",
    },
    {
      icon: "shield" as SectionIconKey,
      title: "Nội dung tin cậy",
      text: "Mạng xã hội được Bộ TT&TT cấp phép, quy trình kiểm duyệt rõ ràng, nói không với review ảo.",
    },
    {
      icon: "map" as SectionIconKey,
      title: "Phủ khắp Việt Nam",
      text: "Từ quán vỉa hè tới nhà hàng fine-dining, dữ liệu địa điểm trải rộng 63 tỉnh thành.",
    },
  ],
  stats: [
    {
      value: NETWORK_AUDIENCE,
      suffix: "+",
      label: "Follower & thành viên",
      note: "",
    },
    {
      value: POSTS_IMPRESSIONS,
      suffix: "",
      label: "Lượt hiển thị",
      note: "",
    },
    {
      value: KOL_FOLLOWERS,
      suffix: "",
      label: "Follower TikTok",
      note: "",
    },
    {
      value: KOL_CHANNELS,
      suffix: "",
      label: "Kênh KOL TikTok",
      note: "",
    },
  ],
} satisfies Required<StatsProps>;

export function Stats(props: StatsProps) {
  const d = { ...statsDefaults, ...props };

  return (
    <section
      id="ve-riviu"
      data-section="ve-riviu"
      className={`scroll-mt-24 ${d.background === "cream" ? "bg-brand-50" : "bg-white"} ${sectionPad(d.paddingY)}`}
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading kicker={d.kicker} title={d.title} sub={d.sub} />

        <div className="grid gap-5 md:grid-cols-3">
          {d.pillars.map((pillar, index) => {
            const Icon = SECTION_ICONS[pillar.icon] ?? SECTION_ICONS.users;
            return (
              <Reveal key={index} delay={index * 0.1}>
                <div className="h-full rounded-2xl border border-black/10 bg-white p-7 transition-colors duration-300 hover:border-brand-500">
                  <span className="inline-flex rounded-xl bg-brand-50 p-3">
                    <Icon
                      size={36}
                      weight="duotone"
                      className="text-brand-500"
                    />
                  </span>
                  <h3 className="mt-4 text-lg font-black">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {pillar.text}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-5 md:grid-cols-4">
          {d.stats.map((stat, index) => (
            <Reveal key={index} delay={index * 0.08}>
              <div className="rounded-2xl border border-black/10 bg-white p-5 text-center transition-colors duration-300 hover:border-brand-500 md:p-6">
                <p className="text-2xl font-black tracking-tight whitespace-nowrap text-brand-500 sm:text-3xl md:text-4xl">
                  <CountUp to={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-3 text-sm font-bold md:text-base">
                  {stat.label}
                </p>
                {stat.note ? (
                  <p className="mt-1 text-xs text-ink-soft md:text-sm">
                    {stat.note}
                  </p>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
